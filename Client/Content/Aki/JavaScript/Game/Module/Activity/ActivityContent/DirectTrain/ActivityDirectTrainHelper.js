"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivityDirectTrainHelper = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  SplashScreenController_1 = require("../../../SplashScreen/SplashScreenController"),
  SplashScreenTask_1 = require("../../../SplashScreen/SplashScreenTask"),
  ActivityController_1 = require("../../ActivityController"),
  ActivityManager_1 = require("../../ActivityManager"),
  ActivityDirectTrainDefine_1 = require("./ActivityDirectTrainDefine");
class ActivityDirectTrainHelper {
  static get IsInValidInstance() {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("DirectTrainShowIcon") ?? [];
    return Log_1.Log.CheckDebug() && Log_1.Log.Debug("ActivityDirectTrain", 64, "判断当前副本是否在白名单中", ["instanceId", ModelManager_1.ModelManager.CreatureModel.GetInstanceId()], ["whiteList", e]), e.includes(ModelManager_1.ModelManager.CreatureModel.GetInstanceId())
  }
  static GetActivityData() {
    var e = ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId;
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)
  }
  static GetActivityController() {
    var e = ActivityDirectTrainHelper.GetActivityData();
    return ActivityManager_1.ActivityManager.GetActivityController(e.Type)
  }
  static IsGetActivityRewards() {
    var e = ModelManager_1.ModelManager.ActivityDirectTrainModel.GetSkipQuestId();
    return ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e)
  }
  static GetRecommendQuestLinkId() {
    var e = ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId,
      r = ConfigManager_1.ConfigManager.ActivityDirectTrainConfig.GetDirectTrainActivityConfById(e).RecommendQuestLinkList;
    for (let e = r.length - 1; 0 <= e; --e) {
      var t = r[e],
        i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t),
        a = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t),
        a = 2 === a || 1 === a;
      if (i && i.CanShowInUiPanel() && a) return t
    }
    for (const o of r)
      if (0 === ModelManager_1.ModelManager.QuestNewModel.GetQuestState(o)) return o
  }
  static async TryOpenPro(e = !0) {
    if (!PublicUtil_1.PublicUtil.GetIsSilentLogin())
      if (this.IsInValidInstance) {
        const r = await ActivityDirectTrainHelper.vB1();
        Log_1.Log.CheckDebug() && Log_1.Log.Debug("ActivityDirectTrain", 64, "RequestActivityDataBeforeActivityOpen", ["activityData", r], ["isByTask", e]), void 0 !== r && 0 !== r.s5n ? (ActivityDirectTrainHelper.IsProOpen = !0, this.EmitEventsForOther(!0), e ? LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsDirectTrainProOpened) || (e = new SplashScreenTask_1.SplashScreenTask(5, 0, () => {
          ModelManager_1.ModelManager.FunctionModel.IsOpen(10053) || (this.ProActivityDataCache = ActivityController_1.ActivityController.CreateActivityData(r), UiManager_1.UiManager.OpenView("DirectTrainProView", this.ProActivityDataCache), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsDirectTrainProOpened, !0))
        }), SplashScreenController_1.SplashScreenController.PushSplashScreenTask(e)) : (this.ProActivityDataCache = ActivityController_1.ActivityController.CreateActivityData(r), UiManager_1.UiManager.OpenView("DirectTrainProView", this.ProActivityDataCache), LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsDirectTrainProOpened, !0))) : (ActivityDirectTrainHelper.IsProOpen = !1, ActivityDirectTrainHelper.EmitEventsForOther(!1))
      } else this.EmitEventsForOther(!1)
  }
  static async vB1() {
    var e = Protocol_1.Aki.Protocol.gU1.create(),
      e = await Net_1.Net.CallAsync(28783, e);
    if (e) return e.yU1
  }
  static RequestThroughTrain(r) {
    var e = Protocol_1.Aki.Protocol.zp_.create();
    e.w6n = ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId, Net_1.Net.Call(21409, e, e => {
      e && (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15513) : ((e = ModelManager_1.ModelManager.ActivityDirectTrainModel.GetSkipQuestId()) !== ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id && QuestController_1.QuestNewController.RequestTrackQuest(e, !0, 1), r?.()))
    })
  }
  static async RequestThroughTrainFinishViewAsync() {
    var e;
    ((ActivityDirectTrainHelper.DirectTrainStartConditionMap.get(ActivityDirectTrainDefine_1.EDirectTrainStartCondition.ServerConditionDone) ?? !1) || this.IsProOpen) && ((e = Protocol_1.Aki.Protocol.Kx_.create()).w6n = ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId, await Net_1.Net.CallAsync(26409, e), this.DirectTrainStartConditionMap.set(ActivityDirectTrainDefine_1.EDirectTrainStartCondition.ServerConditionDone, !1))
  }
  static EmitEventsForOther(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityDirectTrainProSetActive, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate)
  }
}(exports.ActivityDirectTrainHelper = ActivityDirectTrainHelper).DirectTrainStartConditionMap = new Map, ActivityDirectTrainHelper.IsProOpen = !1, ActivityDirectTrainHelper.CurrentActivityId = 103000003, ActivityDirectTrainHelper.ProActivityDataCache = void 0;
//# sourceMappingURL=ActivityDirectTrainHelper.js.map