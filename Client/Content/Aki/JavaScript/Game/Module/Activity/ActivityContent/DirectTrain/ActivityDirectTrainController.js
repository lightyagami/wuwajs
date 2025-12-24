"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDirectTrainController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
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
const SplashScreenController_1 = require("../../../SplashScreen/SplashScreenController");
const SplashScreenTask_1 = require("../../../SplashScreen/SplashScreenTask");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityDirectTrainData_1 = require("./ActivityDirectTrainData");
const ActivityDirectTrainDefine_1 = require("./ActivityDirectTrainDefine");
const ActivityDirectTrainHelper_1 = require("./ActivityDirectTrainHelper");
const ActivityDirectTrainSubView_1 = require("./ActivityDirectTrainSubView");
class ActivityDirectTrainController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.nye = () => {
      let e = undefined;
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)) {
        this.zca();
      } else if (!UiManager_1.UiManager.IsViewOpen("DirectTrainProView")) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ActivityDirectTrain", 95, "尝试开启直通车 (OnWorldDone)");
        }
        e = ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.TryOpenPro();
      }
      if (e) {
        e.finally(() => {
          this.Z8f();
        });
      } else {
        this.Z8f();
      }
    };
    this.itt = e => {
      var i;
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)) {
        if ((i = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)) !== undefined && i.Type === Protocol_1.Aki.Protocol.uks.Proto_ThroughTrain && i.Id === e && (i = i?.IsUnLock(), this.hU_.set(ActivityDirectTrainDefine_1.EDirectTrainStartCondition.ActivityOpen, i), Log_1.Log.CheckDebug() && Log_1.Log.Debug("ActivityDirectTrain", 64, "OnActivityUpdate", ["activityId", e], ["ready", i], ["showing Activity", ModelManager_1.ModelManager.ActivityModel.HaveShowingActivity()]), i)) {
          this.zca();
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ActivityDirectTrain", 64, "直通车收到刷新活动协议时，活动功能还没有开启");
      }
    };
    this.lU_ = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ActivityDirectTrain", 64, "OnThroughTrainForceRemindNotify", ["activityId", e.w6n]);
      }
      ModelManager_1.ModelManager.ActivityDirectTrainModel.SetServerRemindActivityId(e.w6n);
    };
    this.KB1 = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ActivityDirectTrain", 64, "OnDirectTrainPreOpenCloseNotify", ["notify", e]);
      }
      ControllerHolder_1.ControllerHolder.SplashScreenController.FinishCurTask(5);
      if (UiManager_1.UiManager.IsViewOpen("DirectTrainProView")) {
        UiManager_1.UiManager.CloseView("DirectTrainProView");
      }
      ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsProOpen = false;
      ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.EmitEventsForOther(false);
    };
    this.XB1 = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ActivityDirectTrain", 64, "OnDirectTrainInfoNotify", ["notify", e]);
      }
      if (e.XU1 && e.XU1.s5n !== 0 && (ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsProOpen = true, ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.EmitEventsForOther(true), !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.IsDirectTrainProOpened)) && ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ActivityDirectTrain", 64, "OnDirectTrainInfoNotify，游戏流程进行中尝试开启界面", ["notify", e]);
        }
        ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.TryOpenPro(false);
      }
    };
  }
  OnGetIsOpeningActivityRelativeView() {
    throw new Error("Method not implemented.");
  }
  OnInit() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Activity", 63, "[剧情直通车]初始化剧情直通车活动");
    }
    return true;
  }
  OnClear() {
    return true;
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.itt);
    Net_1.Net.Register(17631, this.lU_);
    Net_1.Net.Register(28420, this.KB1);
    Net_1.Net.Register(24776, this.XB1);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.itt);
    Net_1.Net.UnRegister(17631);
    Net_1.Net.UnRegister(28420);
    Net_1.Net.UnRegister(24776);
  }
  OnOpenView(e) {}
  OnCreateActivityData(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ActivityDirectTrain", 95, "[剧情直通车]创建活动数据->", ["id", e.s5n]);
    }
    return new ActivityDirectTrainData_1.ActivityDirectTrainData();
  }
  OnCreateSubPageComponent(e) {
    return new ActivityDirectTrainSubView_1.ActivityDirectTrainSubView();
  }
  OnGetActivityResource(e) {
    return ModelManager_1.ModelManager.ActivityDirectTrainModel.GetPrefabResource(e.Id);
  }
  get hU_() {
    return ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.DirectTrainStartConditionMap;
  }
  Z8f() {
    if (!ModelManager_1.ModelManager.ActivityDirectTrainModel.HasInitData()) {
      ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.RequestDirectTrainInfoBeforeActivityOpen().then(e => {
        ModelManager_1.ModelManager.ActivityDirectTrainModel.LoadDataFromInfoProto(e);
      });
    }
  }
  zca() {
    if (PublicUtil_1.PublicUtil.GetIsSilentLogin()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ActivityDirectTrain", 95, "[直通车活动][SplashScreen]CheckIsStart->静默模式不展示");
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ActivityDirectTrain", 63, "[直通车活动]CheckIsStart->");
      }
      const n = ModelManager_1.ModelManager.ActivityDirectTrainModel.GetDirectTrainServerRemindId();
      var t;
      if (n !== 0 && (t = ConfigManager_1.ConfigManager.ActivityDirectTrainConfig.GetDirectTrainActivityConfById(n)) && t.IsForceRemind) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ActivityDirectTrain", 95, "[直通车活动]CheckIsStart->服务器下发了需要强制提醒的活动Id", ["id", n]);
        }
        this.hU_.set(ActivityDirectTrainDefine_1.EDirectTrainStartCondition.ServerConditionDone, true);
      }
      let e = true;
      let i = undefined;
      for (const a in ActivityDirectTrainDefine_1.EDirectTrainStartCondition) {
        var r = Number(a);
        if (!isNaN(r)) {
          if (!(this.hU_.get(r) ?? false)) {
            e = false;
            i = ActivityDirectTrainDefine_1.EDirectTrainStartCondition[r];
            break;
          }
        }
      }
      if (e) {
        if (ModelManager_1.ModelManager.ActivityDirectTrainModel.AlreadyStartView) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("ActivityDirectTrain", 95, "[直通车活动][SplashScreen]CheckIsStart->已经展示过");
          }
        } else if (n !== 0) {
          t = new SplashScreenTask_1.SplashScreenTask(3, 0, () => {
            ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(n);
          });
          SplashScreenController_1.SplashScreenController.PushSplashScreenTask(t);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("ActivityDirectTrain", 64, "[SplashScreen]CheckIsStart--PushSplashScreenTask", ["activityId", n]);
          }
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ActivityDirectTrain", 95, "[直通车活动][SplashScreen]CheckIsStart->没有remindId");
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ActivityDirectTrain", 63, "[直通车活动][SplashScreen]CheckIsStart->", ["未满足启动的条件", i]);
      }
    }
  }
}
exports.ActivityDirectTrainController = ActivityDirectTrainController;
//# sourceMappingURL=ActivityDirectTrainController.js.map