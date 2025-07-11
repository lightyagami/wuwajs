"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressController = undefined;
const UE = require("ue");
const LanguageSystem_1 = require("../../../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const SplashScreenController_1 = require("../../../SplashScreen/SplashScreenController");
const SplashScreenTask_1 = require("../../../SplashScreen/SplashScreenTask");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityRegressData_1 = require("./ActivityRegressData");
const ActivityRegressDefine_1 = require("./ActivityRegressDefine");
const ActivityHomePageRegressSubView_1 = require("./HomePage/ActivityHomePageRegressSubView");
class ActivityRegressController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Jca = new Map();
    this.nye = () => {
      this.Jca.set(ActivityRegressDefine_1.ERecallStartCondition.WorldDone, true);
      this.zca();
    };
    this.itt = () => {
      var e = ModelManager_1.ModelManager.ActivityRegressModel.IsActivityRecallReady;
      this.Jca.set(ActivityRegressDefine_1.ERecallStartCondition.RecallReady, e);
      var e = ModelManager_1.ModelManager.ActivityRegressModel.IsActivityRecallSplashFirstShow();
      this.Jca.set(ActivityRegressDefine_1.ERecallStartCondition.FirstShow, e);
      var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityRecallForbidStart;
      this.Jca.set(ActivityRegressDefine_1.ERecallStartCondition.UnForbidStart, !e);
      var e = ModelManager_1.ModelManager.ActivityRegressModel.IsActivityOpen;
      this.Jca.set(ActivityRegressDefine_1.ERecallStartCondition.IsOpen, e);
      this.zca();
    };
    this.TDa = e => {
      if (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData && ActivityRegressDefine_1.RECALL_SCORE_ITEM_ID === e) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ModelManager_1.ModelManager.ActivityRegressModel.ActivityId);
      }
    };
  }
  OnInit() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ActivityRecall", 63, "回流活动->初始化回流活动");
    }
    return true;
  }
  OnOpenView(e) {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.itt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.TDa);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.itt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.TDa);
  }
  OnClear() {
    this.Jca.clear();
    return true;
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityCircumfluenceMain";
  }
  OnCreateActivityData(e) {
    ModelManager_1.ModelManager.ActivityRegressModel.ActivityId = e.s5n;
    return new ActivityRegressData_1.ActivityRegressData();
  }
  OnCreateSubPageComponent(e) {
    return new ActivityHomePageRegressSubView_1.ActivityHomePageRegressSubView();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  RequestClaimSignReward(e) {
    this.Wl1(e, Protocol_1.Aki.Protocol.ol1.Proto_SignReward);
  }
  RequestClaimQuestionnaireReward(e) {
    e = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(e);
    this.Wl1(e.Id, Protocol_1.Aki.Protocol.ol1.rl1);
  }
  RequestClaimScoreReward(r) {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityId;
    var t = Protocol_1.Aki.Protocol.Xh1.create();
    t.BVn = r;
    t.w6n = e;
    Net_1.Net.Call(24377, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25749);
        } else {
          ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.SetRegressScoreRewardReached(r);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ModelManager_1.ModelManager.ActivityRegressModel.ActivityId);
        }
      }
    });
  }
  RequestClaimTaskReward(e) {
    this.Wl1(e, Protocol_1.Aki.Protocol.ol1.Proto_TaskReward);
  }
  Wl1(e, r) {
    var t = ModelManager_1.ModelManager.ActivityRegressModel.ActivityId;
    var i = Protocol_1.Aki.Protocol.zh1.create();
    i.w6n = t;
    i.k6n = r;
    i.gps = e;
    Net_1.Net.Call(15872, i, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17200);
      }
    });
  }
  async RequestGachaInfo() {
    var e = Protocol_1.Aki.Protocol.Xrs.create();
    e.r9n = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(LanguageSystem_1.LanguageSystem.PackageLanguage).LanguageType;
    var e = await Net_1.Net.CallAsync(26586, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23891);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Gacha", 63, "抽卡服务端数据:", ["Result", JSON.stringify(e)]);
        }
        ModelManager_1.ModelManager.GachaModel.InitGachaInfoMap(e.zUs);
        ModelManager_1.ModelManager.GachaModel.TodayResultCount = e.ZUs;
        ModelManager_1.ModelManager.GachaModel.RecordId = e.ews;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityRecall", 63, "回流活动->ActivityRegressController.RequestGachaInfo 请求抽卡数据失败");
    }
  }
  zca() {
    let e = true;
    let r = undefined;
    for (const o in ActivityRegressDefine_1.ERecallStartCondition) {
      var t = Number(o);
      if (!isNaN(t)) {
        if (!(this.Jca.get(t) ?? false)) {
          e = false;
          r = ActivityRegressDefine_1.ERecallStartCondition[t];
          break;
        }
      }
    }
    var i;
    if (e) {
      if (!ModelManager_1.ModelManager.ActivityRegressModel.AlreadyStartView) {
        i = new SplashScreenTask_1.SplashScreenTask(4, 0, () => {
          UiManager_1.UiManager.OpenView("ActivityRegressStartupView");
        });
        SplashScreenController_1.SplashScreenController.PushSplashScreenTask(i);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ActivityRecall", 63, "[回流活动]不播放回流开场领奖,ActivityRecallController.CheckIfStart->", ["未满足启动的条件", r]);
    }
  }
  OpenQuestionnaire(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("ActivityRecall", 63, "回流活动->打开调查问卷", ["type", e]);
    }
    var r = !ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk();
    var e = this.GetQuestionnaireUrl(e);
    if (r) {
      ModelManager_1.ModelManager.MailModel.OpenWebBrowser(e);
    } else {
      ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd("", e, true, false);
    }
  }
  RequestQuestionOpen(e) {
    const r = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(e);
    e = Protocol_1.Aki.Protocol.pI1.create();
    e.SI1 = r.Id;
    Net_1.Net.Call(22467, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23878);
        }
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.SetQuestionnaireReached(r.Id);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ModelManager_1.ModelManager.ActivityRegressModel.ActivityId);
      }
    });
  }
  GetQuestionnaireUrl(e) {
    var e = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(e);
    var r = ModelManager_1.ModelManager.LoginModel.GetServerId() ?? "";
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? "";
    var i = CommonParamById_1.configCommonParamById.GetStringConfig("mail_question_key");
    var i = "" + e.QuestionnaireId + t + ";" + r + i;
    return `${e.HyperLink}?sojumpparm=${t};${r}&parmsign=${UE.KuroStaticLibrary.HashStringWithSHA1(i)}&langv=${ConfigManager_1.ConfigManager.LanguageConfig.GetLanguageDefineByLanguageCode(LanguageSystem_1.LanguageSystem.PackageLanguage).QuestionnaireId}`;
  }
  RequestAllTaskScoreRewards() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.Grade;
    var r = [];
    for (const i of ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBonusRewardConfigList(e)) {
      var t = i.Id;
      if (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskScoreRewardState(i) === 1) {
        r.push(t);
      }
    }
    if (r.length > 0) {
      this.RequestClaimScoreReward(r);
    }
  }
  JumpByQuestConfig(e) {
    var r = e.TaskType;
    if (r === 0) {
      var t;
      var i;
      var o = e.TaskSubType;
      if (o === 1) {
        t = ModelManager_1.ModelManager.ActivityRegressModel.GetFirstUnFinishMainQuestId();
        i = ModelManager_1.ModelManager.ActivityRegressModel.GetFirstShowRoleQuest();
        if (t === undefined && i !== undefined) {
          return this.Kl1(e);
        } else {
          return this.Ql1(e);
        }
      }
      if (o === 2) {
        return this._R1();
      }
    }
    if (r === 1) {
      ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView("DailyActivityTabView");
      return true;
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("ActivityRecall", 63, "回流活动->JumpToQuestView 没有定义该类型的回流活动任务跳转！", ["taskType: ", r], ["taskSubType: ", e.TaskSubType], ["config: ", e]);
      }
      return false;
    }
  }
  Ql1(e) {
    var r = ModelManager_1.ModelManager.ActivityRegressModel.GetFirstUnFinishMainQuestId();
    if (r === undefined) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Tips_01");
      return false;
    } else {
      UiManager_1.UiManager.OpenView("QuestView", r);
      return true;
    }
  }
  Kl1(e) {
    var r = ModelManager_1.ModelManager.ActivityRegressModel.GetFirstShowRoleQuest();
    if (r === undefined) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Role_Precondition");
      return false;
    } else {
      UiManager_1.UiManager.OpenView("QuestView", r.Id);
      return true;
    }
  }
  _R1() {
    var e = ModelManager_1.ModelManager.MapModel.GetAllUnlockedAreas();
    if (e === undefined || e.size <= 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Tips_01");
      return false;
    }
    var r;
    var t = [];
    for ([r] of e) {
      var i = ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(r);
      if (i !== undefined) {
        t.push(i);
      }
    }
    t.sort((e, r) => e.GetProgress() - r.GetProgress());
    if (t.length <= 0) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Tips_01");
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("ActivityRecall", 63, "[回流活动]ActivityRegress->RecallDailyExploreTaskJump 探索任务跳转失败，当前没有探索度数据");
      }
      return false;
    }
    let o = undefined;
    for (const l of t) {
      var a = l.AreaId;
      var n = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(a);
      if (n === undefined) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("ActivityRecall", 63, "[回流活动]ActivityRegress->RecallDailyExploreTaskJump 探索任务跳转缺少area配置, 请检查q.区域表", ["areaId: ", a]);
        }
      } else if (n.DeliveryMarkId === 0) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Tips_01");
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("ActivityRecall", 63, "[回流活动]ActivityRegress-> 探索任务跳转缺少DeliveryMarkId配置, 请检查q.区域表,并联系技术策划对齐", ["areaId: ", a], ["DeliveryMarkId: ", n.DeliveryMarkId]);
        }
      } else {
        a = n.DeliveryMarkId;
        a = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(a);
        if (ModelManager_1.ModelManager.MapModel.CheckFogUnlocked(a.FogHide)) {
          o = n;
          break;
        }
      }
    }
    if (o === undefined) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Tips_01");
      return false;
    } else {
      e = {
        MarkId: o.DeliveryMarkId,
        MarkType: o.DeliveryMarkType,
        StartScale: ModelManager_1.ModelManager.WorldMapModel.MapScaleMin,
        OpenFogId: 0
      };
      WorldMapController_1.WorldMapController.OpenView(2, false, e);
      return true;
    }
  }
}
exports.ActivityRegressController = ActivityRegressController;
//# sourceMappingURL=ActivityRegressController.js.map