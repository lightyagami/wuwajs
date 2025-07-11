"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDirectTrainHelper = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const QuestController_1 = require("../../../QuestNew/Controller/QuestController");
const SplashScreenController_1 = require("../../../SplashScreen/SplashScreenController");
const SplashScreenTask_1 = require("../../../SplashScreen/SplashScreenTask");
const ActivityController_1 = require("../../ActivityController");
const ActivityManager_1 = require("../../ActivityManager");
const ActivityDirectTrainDefine_1 = require("./ActivityDirectTrainDefine");
class ActivityDirectTrainHelper {
  static get IsInValidInstance() {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("DirectTrainShowIcon") ?? [];
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ActivityDirectTrain", 64, "判断当前副本是否在白名单中", ["instanceId", ModelManager_1.ModelManager.CreatureModel.GetInstanceId()], ["whiteList", e]);
    }
    return e.includes(ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
  }
  static GetActivityData() {
    var e = ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId;
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
  }
  static GetActivityController() {
    var e = ActivityDirectTrainHelper.GetActivityData();
    return ActivityManager_1.ActivityManager.GetActivityController(e.Type);
  }
  static IsGetActivityRewards() {
    var e = ModelManager_1.ModelManager.ActivityDirectTrainModel.GetSkipQuestId();
    return ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e);
  }
  static GetRecommendQuestLinkId() {
    var e = ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId;
    var r = ConfigManager_1.ConfigManager.ActivityDirectTrainConfig.GetDirectTrainActivityConfById(e).RecommendQuestLinkList;
    for (let e = r.length - 1; e >= 0; --e) {
      var t = r[e];
      var i = ModelManager_1.ModelManager.QuestNewModel.GetQuest(t);
      var a = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t);
      var a = a === 2 || a === 1;
      if (i && i.CanShowInUiPanel() && a) {
        return t;
      }
    }
    for (const o of r) {
      if (ModelManager_1.ModelManager.QuestNewModel.GetQuestState(o) === 0) {
        return o;
      }
    }
  }
  static async TryOpenPro(e = true) {
    if (!PublicUtil_1.PublicUtil.GetIsSilentLogin()) {
      if (this.IsInValidInstance) {
        const r = await ActivityDirectTrainHelper.YB1();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ActivityDirectTrain", 64, "RequestActivityDataBeforeActivityOpen", ["activityData", r], ["isByTask", e]);
        }
        if (r !== undefined && r.s5n !== 0) {
          ActivityDirectTrainHelper.IsProOpen = true;
          this.EmitEventsForOther(true);
          if (e) {
            if (!LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsDirectTrainProOpened)) {
              e = new SplashScreenTask_1.SplashScreenTask(5, 0, () => {
                if (!ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)) {
                  this.ProActivityDataCache = ActivityController_1.ActivityController.CreateActivityData(r);
                  UiManager_1.UiManager.OpenView("DirectTrainProView", this.ProActivityDataCache);
                  LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsDirectTrainProOpened, true);
                }
              });
              SplashScreenController_1.SplashScreenController.PushSplashScreenTask(e);
            }
          } else {
            this.ProActivityDataCache = ActivityController_1.ActivityController.CreateActivityData(r);
            UiManager_1.UiManager.OpenView("DirectTrainProView", this.ProActivityDataCache);
            LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsDirectTrainProOpened, true);
          }
        } else {
          ActivityDirectTrainHelper.IsProOpen = false;
          ActivityDirectTrainHelper.EmitEventsForOther(false);
        }
      } else {
        this.EmitEventsForOther(false);
      }
    }
  }
  static async YB1() {
    var e = Protocol_1.Aki.Protocol.$U1.create();
    var e = await Net_1.Net.CallAsync(27688, e);
    if (e) {
      return e.XU1;
    }
  }
  static RequestThroughTrain(r) {
    var e = Protocol_1.Aki.Protocol.zp_.create();
    e.w6n = ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId;
    Net_1.Net.Call(18515, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29237);
        } else {
          if ((e = ModelManager_1.ModelManager.ActivityDirectTrainModel.GetSkipQuestId()) !== ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id) {
            QuestController_1.QuestNewController.RequestTrackQuest(e, true, 1);
          }
          r?.();
        }
      }
    });
  }
  static async RequestThroughTrainFinishViewAsync() {
    var e;
    if ((ActivityDirectTrainHelper.DirectTrainStartConditionMap.get(ActivityDirectTrainDefine_1.EDirectTrainStartCondition.ServerConditionDone) ?? false) || this.IsProOpen) {
      (e = Protocol_1.Aki.Protocol.Kx_.create()).w6n = ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId;
      await Net_1.Net.CallAsync(24197, e);
      this.DirectTrainStartConditionMap.set(ActivityDirectTrainDefine_1.EDirectTrainStartCondition.ServerConditionDone, false);
    }
  }
  static EmitEventsForOther(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityDirectTrainProSetActive, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate);
  }
}
(exports.ActivityDirectTrainHelper = ActivityDirectTrainHelper).DirectTrainStartConditionMap = new Map();
ActivityDirectTrainHelper.IsProOpen = false;
ActivityDirectTrainHelper.CurrentActivityId = 103000003;
ActivityDirectTrainHelper.ProActivityDataCache = undefined; //# sourceMappingURL=ActivityDirectTrainHelper.js.map