"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LguiEventSystemManager = undefined;
const LguiUtil_1 = require("../../../Game/Module/Util/LguiUtil");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const InputMappingsDefine_1 = require("../InputDistribute/InputMappingsDefine");
class LguiEventSystemManager {
  static get LguiEventSystem() {
    return LguiEventSystemManager.Odr?.EventSystem;
  }
  static async Initialize() {
    var e;
    if (!LguiEventSystemManager.ZCe) {
      LguiEventSystemManager.ZCe = true;
      e = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_LGUIEventSystem_Actor", undefined);
      LguiEventSystemManager.Odr = e;
      LguiUtil_1.LguiUtil.SetActorIsPermanent(LguiEventSystemManager.Odr, true, true);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.LoadLguiEventSystemActor);
    LguiEventSystemManager.Odr.InitializeLguiEventSystemActor();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InitializeLguiEventSystemActor);
  }
  static Clear() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DestroyLguiEventSystemActor);
    LguiEventSystemManager.Odr.ResetLguiEventSystemActor();
  }
  static ClickedMouse(e, t) {
    var n = LguiEventSystemManager.Odr;
    if (n?.IsValid()) {
      var i = t === 0;
      switch (e) {
        case InputMappingsDefine_1.actionMappings.Ui左键点击:
          n.InputTrigger(i, 0);
          break;
        case InputMappingsDefine_1.actionMappings.Ui右键点击:
          n.InputTrigger(i, 2);
      }
    }
  }
  static InputNavigation(e, t) {
    var n = LguiEventSystemManager.Odr;
    if (n?.IsValid()) {
      var i = t === 0;
      switch (e) {
        case InputMappingsDefine_1.actionMappings.Ui方向上:
          n.InputNavigation(3, i);
          break;
        case InputMappingsDefine_1.actionMappings.Ui方向下:
          n.InputNavigation(4, i);
          break;
        case InputMappingsDefine_1.actionMappings.Ui方向左:
          n.InputNavigation(1, i);
          break;
        case InputMappingsDefine_1.actionMappings.Ui方向右:
          n.InputNavigation(2, i);
      }
    }
  }
  static RefreshCurrentInputModule() {
    LguiEventSystemManager.Odr?.RefreshCurrentInputModule();
  }
  static InputWheelAxis(e, t) {
    LguiEventSystemManager.Odr?.InputScroll(t);
  }
  static InputWheelAxisByGamepad(e) {
    LguiEventSystemManager.Odr?.InputScrollByGamepad(e);
  }
  static InputTouchTrigger(e, t, n) {
    LguiEventSystemManager.Odr?.InputTouchTrigger(e, t, n);
  }
  static InputLguiTouchMove(e, t) {
    LguiEventSystemManager.Odr?.InputTouchMove(e, t);
  }
  static SetEventDataPrevPosition(e, t) {
    LguiEventSystemManager.Odr?.SetPrevMousePosition(e, t);
  }
  static get LguiEventSystemActor() {
    return LguiEventSystemManager.Odr;
  }
  static GetNowHitComponent() {
    return LguiEventSystemManager.Odr.GetNowHitComponent();
  }
  static GetNowHitComponentName() {
    var e = LguiEventSystemManager.GetNowHitComponent();
    if (e) {
      return e.GetDisplayName();
    }
  }
  static GetPointerEventData(e, t = false) {
    return LguiEventSystemManager.Odr?.GetPointerEventData(e, t);
  }
  static GetPointerEventDataPosition(e) {
    e = LguiEventSystemManager.GetPointerEventData(e);
    if (e) {
      return e.pointerPosition;
    }
  }
  static IsPressComponentIsValid(e) {
    e = LguiEventSystemManager.GetPointerEventData(e);
    return !!e && e.enterComponent !== undefined && e.pressComponent !== undefined;
  }
  static IsNowTriggerPressed(e) {
    e = LguiEventSystemManager.GetPointerEventData(e);
    return !!e && e.nowIsTriggerPressed;
  }
}
(exports.LguiEventSystemManager = LguiEventSystemManager).ZCe = false;
//# sourceMappingURL=LguiEventSystemManager.js.map