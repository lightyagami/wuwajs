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
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const RewardData_1 = require("../../../ItemReward/RewardData/RewardData");
const RewardItemData_1 = require("../../../ItemReward/RewardData/RewardItemData");
const LogReportDefine_1 = require("../../../LogReport/LogReportDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const SplashScreenController_1 = require("../../../SplashScreen/SplashScreenController");
const SplashScreenTask_1 = require("../../../SplashScreen/SplashScreenTask");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityNewPlayerSupportDefine_1 = require("../NewPlayerSupport/ActivityNewPlayerSupportDefine");
const NewPlayerSupportTrialRoleViewModel_1 = require("../NewPlayerSupport/View/NewPlayerSupportTrialRoleViewModel");
const ActivityRegress30MainView_1 = require("./ActivityRegress30MainView");
const ActivityRegressData_1 = require("./ActivityRegressData");
const ActivityRegressDefine_1 = require("./ActivityRegressDefine");
const BP_REMINDER_INTERVAL = 5;
class ActivityRegressController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Jca = new Map();
    this.ZWf = e => {
      var r = e.HCf;
      var t = e.h_g;
      for (const a of r) {
        if (t && t.Q6n === a) {
          this._Nf(a, t);
        } else {
          this._Nf(a);
        }
      }
    };
    this.WXf = e => {
      for (const r of e.Q6n) {
        this._Nf(r);
      }
    };
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
    this.TDa = (e, r) => {
      var t;
      var a;
      var o;
      if (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData && ActivityRegressDefine_1.RECALL_SCORE_ITEM_ID === e && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ModelManager_1.ModelManager.ActivityRegressModel.ActivityId), o = (e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData).PrevBpExp, r = r, o = e.GetLevelProgressDataByScore(o), r = e.GetLevelProgressDataByScore(r), o !== undefined) && r !== undefined) {
        t = o.Level;
        a = r.Level;
        o = o.NeedScore > 0 ? o.CurScore / o.NeedScore : 0;
        r = r.NeedScore > 0 ? r.CurScore / r.NeedScore : 0;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RegressBpExpAnim, t, a, o, r);
        e.RefreshPrevBpExp();
      }
    };
    this.USe = e => {
      if (e.PayItemId === ActivityRegressDefine_1.RECALL_PAY_BP_GIFT_ID) {
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.SetPayRewardUnlock(true);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
        UiManager_1.UiManager.OpenView("RegressBpLevelUpTipsView");
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RecallActivityInfoUpdate, this.itt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.TDa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPayItemSuccess, this.USe);
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(19365, this.ZWf);
    Net_1.Net.Register(26115, this.WXf);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19365);
    Net_1.Net.UnRegister(26115);
  }
  OnClear() {
    this.Jca.clear();
    return true;
  }
  OnGetActivityResource(e) {
    return "UiItem_CircumfluenceMain30";
  }
  OnCreateActivityData(e) {
    ModelManager_1.ModelManager.ActivityRegressModel.ActivityId = e.s5n;
    return new ActivityRegressData_1.ActivityRegressData();
  }
  OnCreateSubPageComponent(e) {
    return new ActivityRegress30MainView_1.ActivityRegress30MainView();
  }
  OnGetIsOpeningActivityRelativeView() {
    for (const e of ["ActivityNewPlayerSupportTrialRoleView"]) {
      if (UiManager_1.UiManager.IsViewOpen(e)) {
        return true;
      }
    }
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
    Net_1.Net.Call(16345, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29881);
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
    var a = Protocol_1.Aki.Protocol.zh1.create();
    a.w6n = t;
    a.k6n = r;
    a.gps = e;
    Net_1.Net.Call(24428, a, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27125);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
      }
    });
  }
  RequestClaimAllTaskReward() {
    let e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskListByType(0) ?? [];
    var r;
    var t;
    var a = [];
    for (const i of e = (e = e.concat(ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskListByType(1) ?? [])).concat(ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskListByType(6) ?? [])) {
      var o = i.Id;
      if (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetTaskRewardState(o) === 1) {
        a.push(o);
      }
    }
    if (a.length !== 0) {
      r = ModelManager_1.ModelManager.ActivityRegressModel.ActivityId;
      (t = Protocol_1.Aki.Protocol.kqf.create()).w6n = r;
      t.gps = a;
      Net_1.Net.Call(29753, t, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24507);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
        }
      });
    }
  }
  async RequestGachaInfo() {
    var e = Protocol_1.Aki.Protocol.Xrs.create();
    e.r9n = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(LanguageSystem_1.LanguageSystem.PackageLanguage).LanguageType;
    var e = await Net_1.Net.CallAsync(16989, e);
    if (e) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16411);
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
  RegressSetCurUseTrialRoleRequest(e, r) {
    var t = Protocol_1.Aki.Protocol.KGf.create();
    t.HCf = e;
    Net_1.Net.Call(26736, t, e => {
      if (e) {
        if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 24507);
        }
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.CurrentUseTrialRole = e.Q6n;
        ModelManager_1.ModelManager.TrialRoleModel.SetCurUseTrialRole(e.Q6n, e.h_g);
        r?.(e.Q6n);
      }
    });
  }
  _Nf(e, r) {
    var t = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleGroupId(e);
    if (ModelManager_1.ModelManager.TrialRoleModel.GetDataByGroupId(t).IsLocked()) {
      ModelManager_1.ModelManager.ActivityRegressModel.ActivityData?.SetTrialRoleRedDotChecked(false);
    }
    ModelManager_1.ModelManager.TrialRoleModel.SetGroupTrialRoleId(e, r);
  }
  RegressTrialRoleLvUpRequest(e) {
    var r = Protocol_1.Aki.Protocol.zIf.create();
    r.HCf = e;
    Net_1.Net.Call(15727, r, e => {
      if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 20413);
      } else {
        this._Nf(e.Q6n, e.h_g);
      }
    });
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
    var a;
    if (e) {
      if (!ModelManager_1.ModelManager.ActivityRegressModel.AlreadyStartView) {
        a = new SplashScreenTask_1.SplashScreenTask(4, 0, () => {
          UiManager_1.UiManager.OpenView("ActivityRegressStartupView");
        });
        SplashScreenController_1.SplashScreenController.PushSplashScreenTask(a);
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
    Net_1.Net.Call(28602, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23212);
        }
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.SetQuestionnaireReached(r.Id);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ModelManager_1.ModelManager.ActivityRegressModel.ActivityId);
      }
    });
  }
  async NewTrialRoleGetNightmarePhantomInstInfoRequest() {
    var e = Protocol_1.Aki.Protocol.QBg.create();
    var e = await Net_1.Net.CallAsync(22786, e);
    if (e) {
      if (e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 28947);
      } else {
        ModelManager_1.ModelManager.ActivityRegressModel.SaveInsIdList = e.YBg;
        ModelManager_1.ModelManager.ActivityRegressModel.NightmarePhantomInstInfoMap.clear();
        for (const r of e.XBg) {
          ModelManager_1.ModelManager.ActivityRegressModel.NightmarePhantomInstInfoMap.set(r.aAu, MathUtils_1.MathUtils.LongToNumber(r.JBg));
        }
      }
    }
  }
  GetQuestionnaireUrl(e) {
    var e = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(e);
    var r = ModelManager_1.ModelManager.LoginModel.GetServerId() ?? "";
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? "";
    var a = CommonParamById_1.configCommonParamById.GetStringConfig("mail_question_key");
    var a = "" + e.QuestionnaireId + t + ";" + r + a;
    return `${e.HyperLink}?sojumpparm=${t};${r}&parmsign=${UE.KuroStaticLibrary.HashStringWithSHA1(a)}&langv=${ConfigManager_1.ConfigManager.LanguageConfig.GetLanguageDefineByLanguageCode(LanguageSystem_1.LanguageSystem.PackageLanguage).QuestionnaireId}`;
  }
  RequestAllTaskScoreRewards() {
    var r = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetSortedRegressBonusRewardConfigList();
    var t = [];
    ModelManager_1.ModelManager.ActivityRegressModel.NeedShowExtraRewardView = false;
    for (let e = 0; e < r.length; e++) {
      var a = r[e];
      var o = a.Id;
      var i = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskScoreRewardState(a);
      var a = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskPayScoreRewardState(a);
      if ((e + 1) % BP_REMINDER_INTERVAL == 0 && i === 1) {
        ModelManager_1.ModelManager.ActivityRegressModel.NeedShowExtraRewardView = true;
      }
      if (i === 1 || a === 1) {
        t.push(o);
      }
    }
    if (t.length > 0) {
      this.RequestClaimScoreReward(t);
    }
  }
  JumpByQuestConfig(e) {
    var r;
    var t;
    var a;
    var o = e.TaskType;
    if (o === 0 || o === 6) {
      if ((r = e.TaskSubType) === 1) {
        t = ModelManager_1.ModelManager.ActivityRegressModel.GetFirstUnFinishMainQuestId();
        a = ModelManager_1.ModelManager.ActivityRegressModel.GetFirstShowRoleQuest();
        if (t === undefined && a !== undefined) {
          return this.Kl1(e);
        } else {
          return this.Ql1(e);
        }
      } else if (r === 2) {
        return this.ExploreJump();
      } else {
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.AccessPathId);
        return true;
      }
    } else if (o === 1) {
      ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView("DailyActivityTabView");
      return true;
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("ActivityRecall", 63, "回流活动->JumpToQuestView 没有定义该类型的回流活动任务跳转！", ["taskType: ", o], ["taskSubType: ", e.TaskSubType], ["config: ", e]);
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
  ExploreJump() {
    var e = this.GetFirstUnlockArea();
    var e = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e.AreaId);
    if (e === undefined) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Tips_01");
      return false;
    } else {
      e = {
        MarkId: e.DeliveryMarkId,
        MarkType: e.DeliveryMarkType,
        StartScale: ModelManager_1.ModelManager.WorldMapModel.MapScaleMin,
        OpenFogId: 0
      };
      WorldMapController_1.WorldMapController.OpenView(2, false, e);
      return true;
    }
  }
  GetFirstUnlockArea() {
    var e = ModelManager_1.ModelManager.MapModel.GetAllUnlockedAreas();
    if (e === undefined || e.size <= 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Tips_01");
    } else {
      var r;
      var t = [];
      for ([r] of e) {
        var a = ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(r);
        if (a !== undefined) {
          t.push(a);
        }
      }
      t.sort((e, r) => e.GetProgress() - r.GetProgress());
      if (t.length <= 0) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Tips_01");
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("ActivityRecall", 63, "[回流活动]ActivityRegress->RecallDailyExploreTaskJump 探索任务跳转失败，当前没有探索度数据");
        }
      } else {
        for (const n of t) {
          var o = n.AreaId;
          var i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(o);
          if (i === undefined) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("ActivityRecall", 63, "[回流活动]ActivityRegress->RecallDailyExploreTaskJump 探索任务跳转缺少area配置, 请检查q.区域表", ["areaId: ", o]);
            }
          } else {
            if (i.DeliveryMarkId !== 0) {
              return n;
            }
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RecallActivity_Tips_01");
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("ActivityRecall", 63, "[回流活动]ActivityRegress-> 探索任务跳转缺少DeliveryMarkId配置, 请检查q.区域表,并联系技术策划对齐", ["areaId: ", o], ["DeliveryMarkId: ", i.DeliveryMarkId]);
            }
          }
        }
      }
    }
  }
  RegressDisposableRewardRequest() {
    var e = Protocol_1.Aki.Protocol.KIf.create();
    Net_1.Net.Call(20518, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28087);
        } else {
          ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.DisposableReward = true;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate);
        }
      }
    });
  }
  IsNeedExtraRewardView() {
    return ModelManager_1.ModelManager.ActivityRegressModel.NeedShowExtraRewardView;
  }
  BuildExtraRewardData(e) {
    var r;
    var t;
    var a = [];
    var o = ModelManager_1.ModelManager.ActivityRegressModel.Grade;
    var o = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBonusRewardConfigList(o) ?? [];
    var i = new Map();
    var n = ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskScore();
    for (const g of o) {
      if (!(n < g.NeedScore)) {
        if (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskPayScoreRewardState(g) !== 2) {
          var l = g.PayDrop;
          if (!(l <= 0)) {
            var _;
            var s;
            var l = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(l);
            if (l !== undefined) {
              for ([_, s] of l.DropPreview) {
                if (i.has(_)) {
                  i.set(_, i.get(_) + s);
                } else {
                  i.set(_, s);
                }
              }
            }
          }
        }
      }
    }
    for ([r, t] of i) {
      a.push(new RewardItemData_1.RewardItemData(r, t));
    }
    a.sort((e, r) => {
      var t = e.GetQualityId();
      var a = r.GetQualityId();
      if (t === a) {
        return e.Count - r.Count;
      } else {
        return a - t;
      }
    });
    o = {
      Type: 4,
      ViewName: "BattlePassExtraRewardView",
      CommonItems: e,
      ExtraItems: a,
      TipsTextId: "Regress_BattlePass_Purchase_Tips",
      LeftAction: () => {
        UiManager_1.UiManager.OpenView("RegressBpPayView");
      },
      RightAction: () => {}
    };
    return new RewardData_1.RewardData(o);
  }
  RequestBuyBattlePassLevel(e) {
    var r = Protocol_1.Aki.Protocol.jOf.create();
    r.YGf = e;
    Net_1.Net.Call(25347, r, () => EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RecallActivityInfoUpdate));
  }
  static OpenGameIntroductionByRoleId(e) {
    let r = ModelManager_1.ModelManager.ChannelModel.GameIntroductionUrl;
    if (r === "") {
      r = ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() ? ConfigManager_1.ConfigManager.CommonConfig.GetGameIntroductionGlobalUrl() : ConfigManager_1.ConfigManager.CommonConfig.GetGameIntroductionUrl();
    }
    var e = (PublicUtil_1.PublicUtil.GetExternalUrl(r, 2) ?? "") + "&role_id=" + e;
    var t = new LogReportDefine_1.GameInformationClickLogEvent();
    ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t);
    ControllerHolder_1.ControllerHolder.KuroSdkController.OpenWebView("", e, true, true, true);
  }
  OpenTrialRoleView(e = undefined) {
    var e = new NewPlayerSupportTrialRoleViewModel_1.NewPlayerSupportTrialRoleViewModel(3, CommonParamById_1.configCommonParamById.GetStringConfig("NewPlayerSupportTrialRoleIcon"), CommonParamById_1.configCommonParamById.GetStringConfig("NewPlayerSupportTrialRoleTitle"), ActivityNewPlayerSupportDefine_1.TRAIL_ROLE_HELP_ID, e);
    e.SetRequestTrialRoleLvUpFunc(e => {
      this.RegressTrialRoleLvUpRequest(e);
    });
    e.SetRequestSetCurUseTrialRoleFunc((e, r) => {
      this.RegressSetCurUseTrialRoleRequest(e, r);
    });
    var r = ConfigManager_1.ConfigManager.ActivityRegressConfig.GetTrialRoleUnlockDesc();
    e.SetTrialRoleGroupUnlockDesc(r);
    UiManager_1.UiManager.OpenView("ActivityNewPlayerSupportTrialRoleView", e);
  }
  static RegressStartJumpToActivity(e) {
    var r = UiManager_1.UiManager.IsViewOpen("ActivityRegressNewVersionMainView");
    UiManager_1.UiManager.CloseView(r ? "ActivityRegressNewVersionMainView" : "ActivityRegressMainView", () => {
      if (UiManager_1.UiManager.IsViewOpen("AdventureGuideView")) {
        UiManager_1.UiManager.CloseView("AdventureGuideView");
      }
      e();
    });
  }
}
exports.ActivityRegressController = ActivityRegressController;
//# sourceMappingURL=ActivityRegressController.js.map