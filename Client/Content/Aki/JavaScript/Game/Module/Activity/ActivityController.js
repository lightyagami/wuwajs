"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputManager_1 = require("../../Ui/Input/InputManager");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ActivityCommonDefine_1 = require("./ActivityCommonDefine");
const ActivityManager_1 = require("./ActivityManager");
const CHECKGAP = 600000;
class ActivityController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnAddEvents();
    this.OnRegisterNetEvent();
    ActivityManager_1.ActivityManager.Init();
    this.OnAddOpenViewCheckFunction();
    InputManager_1.InputManager.RegisterOpenViewFunc("CommonActivityView", ActivityController.y4e);
    return !(ActivityController.A1h = false);
  }
  static OnClear() {
    this.OnRemoveEvents();
    this.OnUnRegisterNetEvent();
    ActivityManager_1.ActivityManager.Clear();
    this.R6t();
    this.OnRemoveOpenViewCheckFunction();
    return !(ActivityController.A1h = false);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("CommonActivityView", ActivityController.CheckCanOpen, "ActivityController.CheckCanOpen");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("CommonActivityView", ActivityController.CheckCanOpen);
  }
  static CheckCanOpenWithoutPrompt() {
    return !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10053) && ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities().length !== 0;
  }
  static ShowActivityRefreshAndBackToBattleView() {
    var e = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetToBattleView);
    };
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115);
    t.FunctionMap.set(1, e);
    t.FunctionMap.set(0, e);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
  }
  static rYa() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(224);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, ActivityController.Q5e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, ActivityController.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LocalStorageInitPlayerId, ActivityController.I4e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnReceiveActivityData, ActivityController.AFe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityClose, ActivityController.g3e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CrossDay, ActivityController._Mo);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, ActivityController.Q5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, ActivityController.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LocalStorageInitPlayerId, ActivityController.I4e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnReceiveActivityData, ActivityController.AFe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityClose, ActivityController.g3e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CrossDay, ActivityController._Mo);
  }
  static InitActivity(e) {}
  static OnRegisterNetEvent() {
    Net_1.Net.Register(27608, ActivityController.T4e);
    Net_1.Net.Register(22726, ActivityController.L4e);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27608);
    Net_1.Net.UnRegister(22726);
  }
  static R6t() {
    if (this.zaa !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.zaa);
      this.zaa = undefined;
    }
  }
  static P3e() {
    this.R6t();
    this.zaa = TimerSystem_1.GameplayTimerSystem.Forever(this.Zaa, CHECKGAP, undefined, undefined, undefined, false);
  }
  static OpenActivityById(e = 0, t = 4, i = undefined, r) {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)) {
      if (ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities().length === 0) {
        ControllerHolder_1.ControllerHolder.ActivityController.rYa();
        return false;
      } else {
        if (UiManager_1.UiManager.IsViewOpen("CommonActivityView")) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewChange, e);
        } else {
          UiManager_1.UiManager.OpenView("CommonActivityView", [t, e, i], r);
        }
        return true;
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
      return false;
    }
  }
  static CloseAndOpenActivityById(e, t = 0, i = 4, r = undefined, o) {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)) {
      if (ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities().length === 0) {
        ControllerHolder_1.ControllerHolder.ActivityController.rYa();
        return false;
      } else {
        if (UiManager_1.UiManager.IsViewOpen("CommonActivityView")) {
          UiManager_1.UiManager.CloseView(e);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewChange, t);
        } else {
          UiManager_1.UiManager.CloseAndOpenView(e, "CommonActivityView", [i, t, r], o);
        }
        return true;
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
      return false;
    }
  }
  static OpenActivityContentView(e) {
    ActivityManager_1.ActivityManager.GetActivityController(e.Type).OpenView(e);
  }
  static RequestReadActivity(t) {
    var e;
    if (t?.GetIfFirstOpen()) {
      (e = new Protocol_1.Aki.Protocol.M$n()).w6n = t.Id;
      Net_1.Net.Call(18028, e, e => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24014);
        }
        ModelManager_1.ModelManager.ActivityModel.OnReceiveActivityRead(t.Id);
      });
    }
    ModelManager_1.ModelManager.ActivityModel.OnReceiveActivityRead(t.Id);
  }
  static RequestPreOpenActivity(t, i) {
    var e;
    if (t?.CanPreOpen()) {
      (e = new Protocol_1.Aki.Protocol.ak_()).w6n = t.Id;
      Net_1.Net.Call(18737, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19769);
            i?.(false);
          } else {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityPreOpen, t.Id);
            i?.(true);
          }
        } else {
          i?.(false);
        }
      });
    }
  }
  static CreateActivityData(e) {
    return ActivityManager_1.ActivityManager.GetActivityController(e.h5n).CreateActivityData(e);
  }
  static IsOpeningActivityRelativeView(e) {
    e = ActivityManager_1.ActivityManager.GetActivityController(e);
    return !!e && e.GetIsOpeningActivityRelativeView();
  }
  static OpenActivityConditionView(e) {
    if (e) {
      e = new ActivityCommonDefine_1.ActivityConditionGroupData(e);
      UiManager_1.UiManager.OpenView("ActivityConditionView", e);
    }
  }
  static CheckIsActivityClose(e, t) {
    if (t) {
      if (ModelManager_1.ModelManager.ActivityModel.GetActivityById(t)?.CheckIfClose()) {
        ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
      }
    } else if (e) {
      for (const i of ModelManager_1.ModelManager.ActivityModel.GetActivitiesByType(e)) {
        if (i.CheckIfClose()) {
          ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
          return;
        }
      }
    }
  }
}
exports.ActivityController = ActivityController;
(_a = ActivityController).zaa = undefined;
ActivityController.A1h = false;
ActivityController.y4e = () => {
  ActivityController.OpenActivityById(0, 3);
};
ActivityController.CheckCanOpen = () => {
  if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)) {
    return ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities().length !== 0;
  } else {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
    return false;
  }
};
ActivityController.D4e = () => {
  ModelManager_1.ModelManager.ActivityModel.RefreshShowingActivities();
};
ActivityController.AFe = (e, t) => {
  ActivityController.InitActivity(e);
};
ActivityController.I4e = () => {
  ModelManager_1.ModelManager.ActivityModel.InitCache();
};
ActivityController.Q5e = () => {
  _a.P3e();
};
ActivityController.nye = () => {
  if (!ActivityController.A1h) {
    ActivityController.A1h = true;
    _a.RequestActivityData();
  }
};
ActivityController.g3e = e => {
  for (const i of e) {
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(i);
    if (t && ActivityController.IsOpeningActivityRelativeView(t.Type)) {
      _a.ShowActivityRefreshAndBackToBattleView();
      return;
    }
  }
};
ActivityController._Mo = () => {
  _a.RequestActivityData().then(e => {
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 37, "[CrossDay][Activity] 跨天活动数据刷新完成");
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityCrossDayRefresh);
    }
  });
};
ActivityController.Zaa = () => {
  _a.RequestActivityData();
};
ActivityController.RequestActivityData = async () => {
  return !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10053) && new Promise(t => {
    var e = new Protocol_1.Aki.Protocol.v$n();
    Net_1.Net.Call(15145, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22355);
          t(false);
        } else {
          ModelManager_1.ModelManager.ActivityModel.OnReceiveMessageData(e.Yps);
          ModelManager_1.ModelManager.ActivityModel.InitCache();
          t(true);
        }
      } else {
        t(false);
      }
    });
  });
};
ActivityController.T4e = e => {
  ModelManager_1.ModelManager.ActivityModel.OnActivityUpdate(e.Yps);
  ActivityController.D4e();
};
ActivityController.L4e = e => {
  ModelManager_1.ModelManager.ActivityModel.OnDisableActivity(e.Jps);
  ActivityController.D4e();
}; //# sourceMappingURL=ActivityController.js.map