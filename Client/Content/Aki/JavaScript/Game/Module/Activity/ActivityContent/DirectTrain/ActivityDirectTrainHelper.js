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
const ActivityDirectTrainData_1 = require("./ActivityDirectTrainData");
const ActivityDirectTrainDefine_1 = require("./ActivityDirectTrainDefine");
class ActivityDirectTrainHelper {
  static get IsInValidInstance() {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig("DirectTrainShowIcon") ?? [];
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ActivityDirectTrain", 64, "判断当前副本是否在白名单中", ["instanceId", ModelManager_1.ModelManager.CreatureModel.GetInstanceId()], ["whiteList", e]);
    }
    return e.includes(ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
  }
  static IsGetActivityRewards(e) {
    e = ModelManager_1.ModelManager.ActivityDirectTrainModel.GetSkipQuestId(e);
    return ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e);
  }
  static GetRecommendQuestLinkId(e) {
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
    var r;
    var t;
    if (!PublicUtil_1.PublicUtil.GetIsSilentLogin()) {
      if (this.IsInValidInstance) {
        r = await ActivityDirectTrainHelper.RequestDirectTrainInfoBeforeActivityOpen();
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ActivityDirectTrain", 64, "RequestDirectTrainInfoBeforeActivityOpen", ["activityData", r], ["isByTask", e]);
        }
        (t = ModelManager_1.ModelManager.ActivityDirectTrainModel).LoadDataFromInfoProto(r);
        r = t.HasValidDirectTrainProData;
        ActivityDirectTrainHelper.IsProOpen = r;
        ActivityDirectTrainHelper.EmitEventsForOther(r);
        if (r) {
          if (e) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("ActivityDirectTrain", 95, "尝试以SplashScreenTask打开直通车");
            }
            if (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsDirectTrainProOpened)) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("ActivityDirectTrain", 95, "LocalStorage中直通车Pro已打开过，跳过");
              }
            } else {
              t = new SplashScreenTask_1.SplashScreenTask(5, 0, () => {
                var e;
                if (!ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)) {
                  e = ActivityDirectTrainData_1.ActivityDirectTrainProParam.LoadDataFromModel();
                  UiManager_1.UiManager.OpenView("DirectTrainProView", e);
                  LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsDirectTrainProOpened, true);
                }
              });
              SplashScreenController_1.SplashScreenController.PushSplashScreenTask(t);
            }
          } else {
            r = ActivityDirectTrainData_1.ActivityDirectTrainProParam.LoadDataFromModel();
            UiManager_1.UiManager.OpenView("DirectTrainProView", r);
            LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsDirectTrainProOpened, true);
          }
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ActivityDirectTrain", 95, "尝试打开直通车，但服务器没有返回有效的活动数据");
        }
      } else {
        this.EmitEventsForOther(false);
      }
    }
  }
  static async RequestDirectTrainInfoBeforeActivityOpen() {
    var e = Protocol_1.Aki.Protocol.$U1.create();
    var e = await Net_1.Net.CallAsync(27485, e);
    if (e) {
      return e;
    }
  }
  static RequestThroughTrain(e, r) {
    const t = Protocol_1.Aki.Protocol.zp_.create();
    t.w6n = e;
    Net_1.Net.Call(23253, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19814);
        } else {
          if ((e = ModelManager_1.ModelManager.ActivityDirectTrainModel.GetSkipQuestId(t.w6n)) !== ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()?.Id) {
            QuestController_1.QuestNewController.RequestTrackQuest(e, true, 1);
          }
          r?.();
        }
      }
    });
  }
  static async RequestThroughTrainFinishViewAsync(e) {
    var r;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ActivityDirectTrain", 95, "[直通车活动] RequestThroughTrainFinishViewAsync()->", ["actId", e]);
    }
    if ((ActivityDirectTrainHelper.DirectTrainStartConditionMap.get(ActivityDirectTrainDefine_1.EDirectTrainStartCondition.ServerConditionDone) ?? false) || this.IsProOpen) {
      (r = Protocol_1.Aki.Protocol.Kx_.create()).w6n = e;
      await Net_1.Net.CallAsync(16893, r);
      this.DirectTrainStartConditionMap.set(ActivityDirectTrainDefine_1.EDirectTrainStartCondition.ServerConditionDone, false);
    }
  }
  static EmitEventsForOther(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityDirectTrainProSetActive, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityDirectTrainRedDotUpdate, 0);
  }
}
(exports.ActivityDirectTrainHelper = ActivityDirectTrainHelper).DirectTrainStartConditionMap = new Map();
ActivityDirectTrainHelper.IsProOpen = false; //# sourceMappingURL=ActivityDirectTrainHelper.js.map