"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityMowingController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController");
const InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController");
const ItemRewardController_1 = require("../../../ItemReward/ItemRewardController");
const ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityMowingData_1 = require("./ActivityMowingData");
const ActivityMowingSubView_1 = require("./ActivityMowingSubView");
class ActivityMowingController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.DSe = (e, t) => {
      var n;
      if (ActivityMowingController.CurrentActivityId !== 0 && (n = ActivityMowingController.GetMowingActivityData()) && n.LocalConfig?.PreShowGuideQuest.includes(e)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, n.Id);
      }
    };
    this.fSn = () => {
      if (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsMowingInstanceDungeon()) {
        ActivityMowingController.RequestExitDungeon();
      }
    };
    this.RequestGetLevelReward = (t, n, e) => {
      var o = Protocol_1.Aki.Protocol.P$n.create();
      o.w6n = t;
      o.r6n = n;
      Net_1.Net.Call(28971, o, e => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28024);
        } else {
          (e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(t)).SetLevelRewardStateToGot(n);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewRefreshCurrent, t);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t);
          if (UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView")) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, e.GetRewardViewData());
          }
        }
      });
    };
    this.d2e = e => {
      ModelManager_1.ModelManager.ActivityModel.GetActivityById(e.w6n).UpdatePointRewards(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewRefreshCurrent, e.w6n);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.w6n);
    };
    this.C2e = e => {
      ModelManager_1.ModelManager.ActivityModel.GetActivityById(e.w6n).UpdateLevelRewards(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewRefreshCurrent, e.w6n);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e.w6n);
    };
    this.g2e = e => {
      var t = e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs;
      if (t) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26158);
      }
      var n = {
        ButtonTextId: "ConfirmBox_133_ButtonText_0",
        DescriptionTextId: undefined,
        IsTimeDownCloseView: false,
        IsClickedCloseView: true,
        OnClickedCallback: function () {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
        }
      };
      var o = {
        ButtonTextId: "ConfirmBox_133_ButtonText_1",
        DescriptionTextId: "MowingHighestPoint",
        DescriptionArgs: [e.rMs.toString()],
        IsTimeDownCloseView: false,
        IsClickedCloseView: false,
        OnClickedCallback: function () {
          var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true);
          if (e.length !== 0) {
            var t = [];
            for (const n of e) {
              t.push(n.GetConfigId);
            }
            InstanceDungeonController_1.InstanceDungeonController.SingleInstReChallengeRequest(t);
          }
        }
      };
      var i = {
        TitleTextId: "MowingCurrentPoint",
        Record: e.iMs.toString(),
        IsNewRecord: e.iMs > e.rMs
      };
      ItemRewardController_1.ItemRewardController.OpenExploreRewardView(t ? ItemRewardDefine_1.MOWING_ERROR_RESULT : ItemRewardDefine_1.MOWING_RESULT, !t && e.tMs, undefined, t ? undefined : i, undefined, t ? [n] : [n, o], undefined, undefined, undefined);
    };
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(16828, this.d2e);
    Net_1.Net.Register(16919, this.C2e);
    Net_1.Net.Register(26158, this.g2e);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16828);
    Net_1.Net.UnRegister(16919);
    Net_1.Net.UnRegister(26158);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm, this.fSn);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeonConfirm, this.fSn);
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityMowing";
  }
  OnOpenView(e) {}
  OnCreateSubPageComponent(e) {
    return new ActivityMowingSubView_1.ActivityMowingSubView();
  }
  OnCreateActivityData(e) {
    ActivityMowingController.CurrentActivityId = e.s5n;
    return new ActivityMowingData_1.ActivityMowingData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  RequestGetPointReward(t, n) {
    var e = Protocol_1.Aki.Protocol.D$n.create();
    e.w6n = t;
    e.s5n = n;
    Net_1.Net.Call(22023, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15105);
      } else {
        (e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(t)).SetPointRewardState(n);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewRefreshCurrent, t);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t);
        if (UiManager_1.UiManager.IsViewOpen("ActivityRewardPopUpView")) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, e.GetRewardViewData());
        }
      }
    });
  }
  static RequestSetDifficultyAll(e, t) {
    if (ActivityMowingController.GetMowingActivityData()) {
      this.RequestSetDifficulty(e, t);
    }
  }
  static RequestExitDungeon() {
    var e = new Protocol_1.Aki.Protocol.q$n();
    Net_1.Net.Call(16045, e, e => {
      if (!e) {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
      }
    });
  }
  static GetMowingActivityData() {
    return ModelManager_1.ModelManager.ActivityModel?.GetActivityById(ActivityMowingController.CurrentActivityId);
  }
  GetActivityLevelUnlockState(e) {
    var t = ActivityMowingController.GetMowingActivityData();
    return !t || t.GetActivityLevelUnlockState(e);
  }
  static IsMowingInstanceDungeon(e) {
    return !!e && ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 19;
  }
}
(exports.ActivityMowingController = ActivityMowingController).CurrentActivityId = 0;
ActivityMowingController.RequestSetDifficulty = (n, o) => {
  var e = Protocol_1.Aki.Protocol.w$n.create();
  e.w6n = n;
  e.z6n = o;
  Net_1.Net.Call(21189, e, e => {
    var t;
    if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21575);
    }
    for ([, t] of ModelManager_1.ModelManager.ActivityModel.GetActivityById(n).MowingLevelInfoDict) {
      t.z6n = o;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshInstancedRecommendLevel);
  });
};
ActivityMowingController.GetRecommendLevel = (e, t) => {
  var n = ActivityMowingController.GetMowingActivityData();
  if (n) {
    return n.GetLevelDiffRecommendLevel(e);
  } else {
    return 0;
  }
};
ActivityMowingController.CheckIsActivityLevel = e => ActivityMowingController.IsMowingInstanceDungeon(e); //# sourceMappingURL=ActivityMowingController.js.map