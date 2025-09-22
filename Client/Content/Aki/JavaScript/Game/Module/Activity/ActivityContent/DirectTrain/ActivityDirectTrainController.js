"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDirectTrainController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Net_1 = require("../../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
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
    this.hHu = undefined;
    this.aU_ = undefined;
    this.nye = () => {
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)) {
        this.zca();
      } else if (!UiManager_1.UiManager.IsViewOpen("DirectTrainProView")) {
        ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.TryOpenPro();
      }
    };
    this.itt = e => {
      var i;
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)) {
        if ((i = ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.GetActivityData()) !== undefined && i.Id === e && (i = ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.GetActivityData()?.IsUnLock(), this.hU_.set(ActivityDirectTrainDefine_1.EDirectTrainStartCondition.ActivityOpen, i), Log_1.Log.CheckDebug() && Log_1.Log.Debug("ActivityDirectTrain", 64, "OnActivityUpdate", ["activityId", e], ["ready", i], ["showing Activity", ModelManager_1.ModelManager.ActivityModel.HaveShowingActivity()]), i)) {
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
      this.aU_ = e.w6n;
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
    this.hHu = TimerSystem_1.TimerSystem.Forever(e => {
      if (ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.ProActivityDataCache !== undefined && ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.ProActivityDataCache.EndShowTime !== 0 && ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.ProActivityDataCache.EndShowTime < TimeUtil_1.TimeUtil.GetServerTime()) {
        ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.EmitEventsForOther(false);
        ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsProOpen = false;
        this.hHu?.Remove();
        this.hHu = undefined;
      }
    }, 1000);
    return true;
  }
  OnClear() {
    this.hHu?.Remove();
    return !(this.hHu = undefined);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.itt);
    Net_1.Net.Register(22071, this.lU_);
    Net_1.Net.Register(29968, this.KB1);
    Net_1.Net.Register(17436, this.XB1);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.itt);
    Net_1.Net.UnRegister(22071);
    Net_1.Net.UnRegister(29968);
    Net_1.Net.UnRegister(17436);
  }
  OnOpenView(e) {}
  OnCreateActivityData(e) {
    ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId = e.s5n;
    return new ActivityDirectTrainData_1.ActivityDirectTrainData();
  }
  OnCreateSubPageComponent(e) {
    return new ActivityDirectTrainSubView_1.ActivityDirectTrainSubView();
  }
  OnGetActivityResource(e) {
    return "UiItem_PlotTrain";
  }
  get hU_() {
    return ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.DirectTrainStartConditionMap;
  }
  zca() {
    if (!PublicUtil_1.PublicUtil.GetIsSilentLogin()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ActivityDirectTrain", 63, "[直通车活动]CheckIsStart->", ["判断当前需要提醒的活动ID", this.aU_], ["当前活动ID", ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId]);
      }
      if (this.aU_ !== undefined && this.aU_ === ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId) {
        this.hU_.set(ActivityDirectTrainDefine_1.EDirectTrainStartCondition.ServerConditionDone, true);
      }
      let e = true;
      let i = undefined;
      for (const n in ActivityDirectTrainDefine_1.EDirectTrainStartCondition) {
        var t = Number(n);
        if (!isNaN(t)) {
          if (!(this.hU_.get(t) ?? false)) {
            e = false;
            i = ActivityDirectTrainDefine_1.EDirectTrainStartCondition[t];
            break;
          }
        }
      }
      if (e) {
        if (!ModelManager_1.ModelManager.ActivityDirectTrainModel.AlreadyStartView) {
          const a = ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId;
          var r;
          if (a !== 0 && (r = new SplashScreenTask_1.SplashScreenTask(3, 0, () => {
            ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(a);
          }), SplashScreenController_1.SplashScreenController.PushSplashScreenTask(r), Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("ActivityDirectTrain", 64, "CheckIsStart--PushSplashScreenTask", ["activityId", a]);
          }
        }
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ActivityDirectTrain", 63, "[直通车活动]CheckIsStart->", ["未满足启动的条件", i]);
      }
    }
  }
}
exports.ActivityDirectTrainController = ActivityDirectTrainController;
//# sourceMappingURL=ActivityDirectTrainController.js.map