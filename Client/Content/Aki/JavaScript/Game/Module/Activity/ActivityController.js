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
    ActivityController.A1h = false;
    this.DisableRefreshTimer();
    return true;
  }
  static EnableRefreshTimer(t) {
    if (this.GOe === undefined) {
      this.GOe = TimerSystem_1.GameplayTimerSystem.Forever(this.o3i, t, undefined, undefined);
    }
  }
  static DisableRefreshTimer() {
    if (this.GOe !== undefined) {
      this.Qjf.clear();
      TimerSystem_1.GameplayTimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
  }
  static RegisterRefreshTimerDelegate(t) {
    this.Qjf.add(t);
  }
  static UnregisterRefreshTimerDelegate(t) {
    this.Qjf.delete(t);
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
    var t = () => {
      UiManager_1.UiManager.ResetToBattleView();
    };
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115);
    e.FunctionMap.set(1, t);
    e.FunctionMap.set(0, t);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  static rYa() {
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(224);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
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
  static InitActivity(t) {}
  static OnRegisterNetEvent() {
    Net_1.Net.Register(24139, ActivityController.T4e);
    Net_1.Net.Register(18882, ActivityController.L4e);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24139);
    Net_1.Net.UnRegister(18882);
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
  static OpenActivityById(t = 0, e = 4, i = undefined, r) {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)) {
      if (ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities().length === 0) {
        ControllerHolder_1.ControllerHolder.ActivityController.rYa();
        return false;
      } else {
        if (UiManager_1.UiManager.IsViewOpen("CommonActivityView")) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewChange, t);
        } else {
          UiManager_1.UiManager.OpenView("CommonActivityView", [e, t, i], r);
        }
        return true;
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
      return false;
    }
  }
  static CloseAndOpenActivityById(t, e = 0, i = 4, r = undefined, o) {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)) {
      if (ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities().length === 0) {
        ControllerHolder_1.ControllerHolder.ActivityController.rYa();
        return false;
      } else {
        if (UiManager_1.UiManager.IsViewOpen("CommonActivityView")) {
          UiManager_1.UiManager.CloseView(t);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityViewChange, e);
        } else {
          UiManager_1.UiManager.CloseAndOpenView(t, "CommonActivityView", [i, e, r], o);
        }
        return true;
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FunctionDisable");
      return false;
    }
  }
  static OpenActivityContentView(t) {
    ActivityManager_1.ActivityManager.GetActivityController(t.Type).OpenView(t);
  }
  static RequestReadActivity(e) {
    var t;
    if (e?.GetIfFirstOpen()) {
      (t = new Protocol_1.Aki.Protocol.M$n()).w6n = e.Id;
      Net_1.Net.Call(23791, t, t => {
        if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 19522);
        }
        ModelManager_1.ModelManager.ActivityModel.OnReceiveActivityRead(e.Id);
      });
    }
    ModelManager_1.ModelManager.ActivityModel.OnReceiveActivityRead(e.Id);
  }
  static RequestPreOpenActivity(e, i) {
    var t;
    if (e?.CanPreOpen()) {
      (t = new Protocol_1.Aki.Protocol.ak_()).w6n = e.Id;
      Net_1.Net.Call(25220, t, t => {
        if (t) {
          if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 18546);
            i?.(false);
          } else {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityPreOpen, e.Id);
            i?.(true);
          }
        } else {
          i?.(false);
        }
      });
    }
  }
  static CreateActivityData(t) {
    return ActivityManager_1.ActivityManager.GetActivityController(t.h5n).CreateActivityData(t);
  }
  static IsOpeningActivityRelativeView(t) {
    t = ActivityManager_1.ActivityManager.GetActivityController(t);
    return !!t && t.GetIsOpeningActivityRelativeView();
  }
  static OpenActivityConditionView(t) {
    if (t) {
      t = new ActivityCommonDefine_1.ActivityConditionGroupData(t);
      UiManager_1.UiManager.OpenView("ActivityConditionView", t);
    }
  }
  static CheckIsActivityClose(t, e) {
    if (e) {
      if (ModelManager_1.ModelManager.ActivityModel.GetActivityById(e)?.CheckIfClose()) {
        ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
      }
    } else if (t) {
      for (const i of ModelManager_1.ModelManager.ActivityModel.GetActivitiesByType(t)) {
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
ActivityController.GOe = undefined;
ActivityController.Qjf = new Set();
ActivityController.o3i = t => {
  if (_a.Qjf.size !== 0) {
    for (const e of _a.Qjf) {
      e(t);
    }
  }
};
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
ActivityController.AFe = (t, e) => {
  ActivityController.InitActivity(t);
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
ActivityController.g3e = t => {
  for (const i of t) {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(i);
    if (e && ActivityController.IsOpeningActivityRelativeView(e.Type)) {
      _a.ShowActivityRefreshAndBackToBattleView();
      return;
    }
  }
};
ActivityController._Mo = () => {
  _a.RequestActivityData().then(t => {
    if (t) {
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
  return !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10053) && new Promise(e => {
    var t = new Protocol_1.Aki.Protocol.v$n();
    Net_1.Net.Call(23005, t, t => {
      if (t) {
        if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 18119);
          e(false);
        } else {
          ModelManager_1.ModelManager.ActivityModel.OnReceiveMessageData(t.Yps);
          ModelManager_1.ModelManager.ActivityModel.InitCache();
          e(true);
        }
      } else {
        e(false);
      }
    });
  });
};
ActivityController.T4e = t => {
  ModelManager_1.ModelManager.ActivityModel.OnActivityUpdate(t.Yps);
  ActivityController.D4e();
};
ActivityController.L4e = t => {
  ModelManager_1.ModelManager.ActivityModel.OnDisableActivity(t.Jps);
  ActivityController.D4e();
}; //# sourceMappingURL=ActivityController.js.map