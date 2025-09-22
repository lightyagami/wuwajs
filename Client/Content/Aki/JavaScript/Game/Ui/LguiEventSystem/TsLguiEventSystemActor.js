"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsLguiEventSystemActor = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../../Game/Global");
const CursorController_1 = require("../../../Game/Module/Cursor/CursorController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const UiNavigationDefine_1 = require("../../Module/UiNavigation/New/UiNavigationDefine");
class TsLguiEventSystemActor extends UE.LGUIEventSystemActor {
  constructor() {
    super(...arguments);
    this.StandaloneInputModule = undefined;
    this.TouchInputModule = undefined;
    this.CurrentInputModule = undefined;
    this.NavigationEnable = false;
    this.HandleWrapper = undefined;
    this.ShowTypeChange = (t, e) => {};
    this.ControllerConnectChange = (t, e, i) => {};
    this.TouchClickThreshold = 10;
    this.MouseClickThreshold = 5;
    this.GamepadClickThreshold = 5;
  }
  Constructor() {
    this.HandleWrapper = undefined;
    this.ShowTypeChange = (t, e) => {};
    this.ControllerConnectChange = (t, e, i) => {};
    this.TouchClickThreshold = 10;
    this.MouseClickThreshold = 5;
    this.GamepadClickThreshold = 5;
  }
  InitializeLguiEventSystemActor() {
    this.RefreshCurrentInputModule();
    var t = (0, puerts_1.toManualReleaseDelegate)(TsLguiEventSystemActor.ChangeController);
    this.HandleWrapper = this.StandaloneInputModule.RegisterInputChangeEvent(t);
    this.AddEvents();
    this.RegisterControllerChange();
    CursorController_1.CursorController.SetWindowCursorStyle();
    this.RegisterPointEnterExitEvent();
    this.BroadCastInputType();
  }
  ResetLguiEventSystemActor() {
    this.StandaloneInputModule.UnregisterInputChangeEvent(this.HandleWrapper);
    (0, puerts_1.releaseManualReleaseDelegate)(TsLguiEventSystemActor.ChangeController);
    this.HandleWrapper = undefined;
    this.UnRegisterControllerChange();
    this.RemoveEvents();
    this.UnRegisterPointEnterExitEvent();
  }
  AddEvents() {
    this.ShowTypeChange = (t, e) => {
      this.RefreshCurrentInputModule();
    };
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowTypeChange, this.ShowTypeChange);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShowTypeChange, this.ShowTypeChange);
  }
  RegisterControllerChange() {
    this.ControllerConnectChange = (t, e, i) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("MobileInputSwitch", 10, "广播了连接通知");
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ControllerConnectChange, t, e, i);
    };
    this.EventSystem.OnConnectionChanged.Add(this.ControllerConnectChange);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MobileInputSwitch", 10, "注册了连接通知", ["this.EventSystem", this.EventSystem !== undefined], ["this.ControllerConnectChange", this.ControllerConnectChange !== undefined]);
    }
  }
  UnRegisterControllerChange() {
    this.EventSystem.OnConnectionChanged.Remove(this.ControllerConnectChange);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MobileInputSwitch", 10, "注销了连接通知");
    }
  }
  InputTrigger(t, e) {
    var i;
    if (!Info_1.Info.IsInTouch()) {
      if ((i = Global_1.Global.CharacterController) && i.bShowMouseCursor) {
        this.StandaloneInputModule.InputTrigger(t, e);
      }
    }
  }
  InputNavigation(t, e, i = false) {
    if ((this.NavigationEnable || i) && this.CurrentInputModule) {
      TsLguiEventSystemActor.InputType = 1;
      this.CurrentInputModule.InputNavigation(t, e);
    }
  }
  InputTriggerForNavigation(t) {
    if (this.CurrentInputModule) {
      TsLguiEventSystemActor.InputType = 1;
      this.CurrentInputModule.InputTriggerForNavigation(t);
    }
  }
  SwitchToNavigationInputType() {
    if (this.CurrentInputModule && TsLguiEventSystemActor.InputType !== 1) {
      TsLguiEventSystemActor.InputType = 1;
      this.CurrentInputModule.SwitchToNavigationInputType();
    }
  }
  InputScroll(t) {
    this.StandaloneInputModule.InputScroll(t);
    if (!Info_1.Info.IsInTouch()) {
      if (t !== 0 && (t = this.GetPointerEventData(0, true)).inputType !== 0) {
        t.inputType = 0;
        TsLguiEventSystemActor.ChangeController(t.inputType);
      }
    }
  }
  InputScrollByGamepad(t) {
    this.StandaloneInputModule.InputScroll(t);
    if (t !== 0 && (t = this.GetPointerEventData(0, true)).inputType !== 1) {
      t.inputType = 1;
      TsLguiEventSystemActor.ChangeController(t.inputType);
    }
  }
  InputTouchTrigger(t, e, i) {
    let s = e;
    if (Info_1.Info.IsMobileInputModel() && Info_1.Info.IsInGamepad()) {
      s = e + UiNavigationDefine_1.MOBILE_TOUCHID_ADD_INGAMEPAD;
    }
    this.TouchInputModule.InputTouchTrigger(t, s, i);
  }
  InputTouchMove(t, e) {
    let i = t;
    if (Info_1.Info.IsMobileInputModel() && Info_1.Info.IsInGamepad()) {
      i = t + UiNavigationDefine_1.MOBILE_TOUCHID_ADD_INGAMEPAD;
      this.TouchInputModule.InputTouchMoved(i, e);
      this.TouchInputModule.RefreshProcessInput();
    } else {
      this.TouchInputModule.InputTouchMoved(i, e);
    }
  }
  RefreshCurrentInputModule() {
    if (Info_1.Info.IsInTouch()) {
      this.CurrentInputModule = this.TouchInputModule;
    } else {
      this.CurrentInputModule = this.StandaloneInputModule;
    }
    this.CurrentInputModule.Activate(false);
  }
  GetNowHitComponent() {
    if (this.CurrentInputModule) {
      return this.CurrentInputModule.GetNowHitComponent();
    }
  }
  GetPointerEventData(t, e = false) {
    if (this.CurrentInputModule) {
      return this.CurrentInputModule.GetPointerEventData(t, e);
    }
  }
  IsPointerEventDataLineTrace(t) {
    return !!this.CurrentInputModule && this.CurrentInputModule.IsPointerEventDataLineTrace(t);
  }
  SimulateClickButton(t, e, i = new UE.Vector2D(0.5, 0.5)) {
    return this.StandaloneInputModule.SimulationLineTrace(t, e, i);
  }
  SimulationPointerDownUp(t, e, i) {
    return this.StandaloneInputModule.SimulationPointerDownUp(t, e, i);
  }
  SimulationPointerTrigger(t, e) {
    this.StandaloneInputModule.SimulationPointerTrigger(t, e);
  }
  ResetNowIsTriggerPressed(t) {
    this.StandaloneInputModule.ResetNowIsTriggerPressed(t);
  }
  UpdateNavigationListener(t) {
    this.StandaloneInputModule.UpdateNavigation(t);
  }
  SetIsUseMouse(t) {
    this.StandaloneInputModule.SetIsUseMouse(t);
  }
  SetIsForceChange(t) {
    this.StandaloneInputModule.SetIsForceChange(t);
  }
  SetPrevMousePosition(t, e) {
    var i = this.GetPointerEventData(0, true);
    if (i) {
      i.prevMousePos = new UE.Vector2D(t, e);
    }
  }
  SetCurrentInputKeyType(t) {
    (Info_1.Info.IsInTouch() ? this.TouchInputModule : this.StandaloneInputModule)?.SetCurrentInputKeyType(t);
    this.SetClickThresholdWithInputKeyType(t);
  }
  SetClickThresholdWithInputKeyType(t) {
    let e = undefined;
    e = Info_1.Info.IsInTouch() ? this.TouchInputModule : this.StandaloneInputModule;
    switch (t) {
      case 1:
        e?.SetClickThreshold(this.MouseClickThreshold);
        break;
      case 3:
        e?.SetClickThreshold(this.TouchClickThreshold);
        break;
      case 2:
        e?.SetClickThreshold(this.GamepadClickThreshold);
    }
  }
  OverrideMousePosition(t) {
    if (this.StandaloneInputModule) {
      this.StandaloneInputModule.InputOverrideMousePosition(t);
    }
  }
  SetIsOverrideMousePosition(t) {
    if (this.StandaloneInputModule) {
      this.StandaloneInputModule.bOverrideMousePosition = t;
    }
  }
  static IsInPointerInputType() {
    return TsLguiEventSystemActor.InputType === 0;
  }
  static IsInNavigationInputType() {
    return TsLguiEventSystemActor.InputType === 1;
  }
  RegisterPointEnterExitEvent() {
    if (Info_1.Info.IsPcOrGamepadPlatform()) {
      this.EventSystem.RegisterPointerEnterExitEvent((0, puerts_1.toManualReleaseDelegate)(CursorController_1.CursorController.CursorEnterExit));
    }
  }
  UnRegisterPointEnterExitEvent() {
    if (Info_1.Info.IsPcOrGamepadPlatform()) {
      this.EventSystem.UnRegisterPointerEnterExitEvent();
      (0, puerts_1.releaseManualReleaseDelegate)(CursorController_1.CursorController.CursorEnterExit);
    }
  }
  BroadCastInputType() {
    TsLguiEventSystemActor.InputType = this.EventSystem.defaultInputType;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PointerInputTypeChange, this.EventSystem.defaultInputType);
  }
}
(exports.TsLguiEventSystemActor = TsLguiEventSystemActor).InputType = 2;
TsLguiEventSystemActor.ChangeController = t => {
  if ((TsLguiEventSystemActor.InputType = t) === 0) {
    Info_1.Info.SwitchInputControllerType(1, "MouseMove");
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PointerInputTypeChange, t);
};
exports.default = TsLguiEventSystemActor; //# sourceMappingURL=TsLguiEventSystemActor.js.map