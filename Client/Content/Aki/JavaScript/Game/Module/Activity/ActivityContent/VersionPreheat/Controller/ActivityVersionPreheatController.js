"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityVersionPreheatController = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../../ActivityControllerBase");
const ActivityManager_1 = require("../../../ActivityManager");
const VersionPreheatDefine_1 = require("../VersionPreheatDefine");
const ActivityVersionPreheatSubView_1 = require("../View/ActivityVersionPreheatSubView");
var Proto_PreheatSignRewardRequest = Protocol_1.Aki.Protocol.kf_;
var Proto_ErrorCode = Protocol_1.Aki.Protocol.Q4n;
var Proto_PreheatSignSurveyInfoRequest = Protocol_1.Aki.Protocol.Of_;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const LogReportController_1 = require("../../../../LogReport/LogReportController");
const LogReportDefine_1 = require("../../../../LogReport/LogReportDefine");
class ActivityVersionPreheatController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.OCl = undefined;
    this.HandleQuestDetailClickInReward = e => {
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) < Protocol_1.Aki.Protocol.hTs.a3_) {
        UiManager_1.UiManager.OpenView("QuestView", e);
      }
    };
    this.HandleVoteClickAsync = async (e, r) => {
      this.OCl = new CustomPromise_1.CustomPromise();
      await TimerSystem_1.GameplayTimerSystem.Wait(VersionPreheatDefine_1.VOTE_CLICK_DELAY);
      await this.RequestPreheatSignRewardRequest(e, r);
      await this.OCl.Promise;
      this.OCl = undefined;
      await this.OpenTargetViewAsyncById(e, false);
    };
    this.NCl = () => {
      this.OCl?.SetResult();
    };
  }
  static get Instance() {
    return ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_PreheatSign);
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityPreheatMain";
  }
  OnCreateSubPageComponent(e) {
    return new ActivityVersionPreheatSubView_1.ActivityVersionPreheatSubView();
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.VersionPreheatModel.ActivityData;
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnRegisterNetEvent() {}
  OnUnRegisterNetEvent() {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseRewardView, this.NCl);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseRewardView, this.NCl);
  }
  async RequestPreheatSignRewardRequest(e, r) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("VersionPreheat", 64, "RequestPreheatSignRewardRequest:" + e);
    }
    var t = Proto_PreheatSignRewardRequest.create();
    t.M_l = e;
    t.S_l = r;
    var r = await Net_1.Net.CallAsync(17551, t);
    if (r !== undefined) {
      if (r.fMs !== Proto_ErrorCode.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("VersionPreheat", 64, "预热作答失败：RequestPreheatSignRewardRequest---" + r.fMs);
        }
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(r.fMs, 21215);
      } else if (r.UM_ === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("VersionPreheat", 64, "预热作答response中没有SurveyInfo", ["TVersionPreheatId", e]);
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("VersionPreheat", 64, "RequestPreheatSignRewardResponse", ["response", r]);
        }
        (t = ModelManager_1.ModelManager.VersionPreheatModel).SyncPreheatSignSurveyInfo(e, r.UM_);
        t.SyncPreheatRewardedState(e);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VersionPreheatRewardResponse, e);
  }
  async RequestPreheatSignSurveyInfoRequest(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("VersionPreheat", 64, "RequestPreheatSignSurveyInfoRequest:" + e);
    }
    var r = Proto_PreheatSignSurveyInfoRequest.create();
    r.M_l = e;
    var r = await Net_1.Net.CallAsync(28043, r);
    if (r !== undefined) {
      if (r.fMs !== Proto_ErrorCode.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("VersionPreheat", 64, "预热作答失败：RequestPreheatSignRewardRequest---" + r.fMs);
        }
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(r.fMs, 21215);
      } else if (r.UM_ === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("VersionPreheat", 64, "预热问卷数据response中没有SurveyInfo", ["TVersionPreheatId", e]);
        }
      } else {
        ModelManager_1.ModelManager.VersionPreheatModel.SyncPreheatSignSurveyInfo(e, r.UM_);
      }
    }
  }
  SendDetailClickLogData(e) {
    var r = new LogReportDefine_1.ActivityPreheatLogData();
    var t = ModelManager_1.ModelManager.VersionPreheatModel.ActivityData;
    var o = TimeUtil_1.TimeUtil.GetServerTime();
    var o = Number(t.EndOpenTime) === 0 ? 0 : Number(t.EndOpenTime) - o;
    r.i_activity_id = t.Id;
    r.i_activity_type = t.Type;
    r.i_time_left = Math.round(o);
    r.i_type = e ?? 0;
    LogReportController_1.LogReportController.LogReport(r);
  }
  async OpenTargetViewAsyncById(e, r) {
    var t;
    var o = ModelManager_1.ModelManager.VersionPreheatModel;
    let i = undefined;
    if (e === undefined) {
      t = o.BuildBonusDetailData();
      return (i = await UiManager_1.UiManager.OpenViewAsync("VersionPreheatQuestDetailView", t)) !== undefined;
    } else {
      if (r && this.Cml(e)) {
        t = o.BuildVoteDataById(e);
        i = await UiManager_1.UiManager.OpenViewAsync("VersionPreheatVoteView", t);
      } else if (o.GetQuestStateById(e) >= 1) {
        r = o.BuildQuestDetailDataById(e);
        i = await UiManager_1.UiManager.OpenViewAsync("VersionPreheatQuestDetailView", r);
      }
      return i !== undefined;
    }
  }
  OpenShareView(e, r, t) {
    e = {
      ScreenShot: false,
      PrepareFullScreenShot: false,
      IsHiddenBattleView: false,
      VersionPreheat: {
        PhotoPath: e,
        NameTextId: r,
        ThemeTextId: t
      },
      RoleSkinData: undefined,
      HandBookPhotoData: undefined,
      GachaData: undefined,
      FragmentMemory: undefined
    };
    UiManager_1.UiManager.OpenView("PhotoSaveView", e);
  }
  IsQuestFinishedById(e) {
    e = ModelManager_1.ModelManager.VersionPreheatModel.GetQuestIdById(e);
    return ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e);
  }
  IsQuestAvailableButNotFinishedById(e) {
    e = ModelManager_1.ModelManager.VersionPreheatModel.GetQuestIdById(e);
    e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e);
    return e === 1 || e === 2;
  }
  Cml(e) {
    e = ModelManager_1.ModelManager.VersionPreheatModel.GetQuestIdById(e);
    return ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) === 2;
  }
  get SelfPlayerId() {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
  }
}
exports.ActivityVersionPreheatController = ActivityVersionPreheatController;
//# sourceMappingURL=ActivityVersionPreheatController.js.map