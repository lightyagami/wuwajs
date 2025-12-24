"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadClickComponent = exports.GamepadWheelComponent = exports.GamepadCheckDragComponent = exports.GamepadCheckComponent = exports.GamepadMoveRightComponent = exports.GamepadMoveForwardComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiNavigationViewManager_1 = require("../New/UiNavigationViewManager");
const HotKeyComponent_1 = require("./HotKeyComponent");
class GamepadInteractComponentBase extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    if (e.HasGamepadControlMouse()) {
      e = e.MainPanel?.GamepadMouseItem?.IsUIActiveInHierarchy() ?? false;
      this.SetVisibleMode(2, e);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
class GamepadMoveForwardComponent extends GamepadInteractComponentBase {
  OnInputAxis(e, t) {
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.GamepadControlMouseMoveForward(t);
  }
}
exports.GamepadMoveForwardComponent = GamepadMoveForwardComponent;
class GamepadMoveRightComponent extends GamepadInteractComponentBase {
  OnInputAxis(e, t) {
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.GamepadControlMouseMoveRight(t);
  }
}
exports.GamepadMoveRightComponent = GamepadMoveRightComponent;
class GamepadCheckComponent extends GamepadInteractComponentBase {
  constructor() {
    super(...arguments);
    this.r0f = false;
  }
  OnPress(e) {
    if (!ControllerHolder_1.ControllerHolder.UiNavigationNewController.IsNavigationMousePositionDragging() && this.r0f) {
      this.r0f = false;
    }
    if (this.r0f) {
      this.r0f = false;
    } else {
      this.r0f = ControllerHolder_1.ControllerHolder.UiNavigationNewController.IsGamepadHitListenerUseDrag();
      if (this.r0f) {
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.NotifyNavigationMousePositionDragState(true);
      }
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SimulationPointerTrigger(true);
    }
  }
  OnRelease(e) {
    if (!this.r0f) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SimulationPointerTrigger(false);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.NotifyNavigationMousePositionDragState(false);
    }
  }
  OnRefreshByControllerChange() {
    if (this.r0f) {
      this.r0f = false;
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SimulationPointerTrigger(false);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.NotifyNavigationMousePositionDragState(false);
    }
  }
}
exports.GamepadCheckComponent = GamepadCheckComponent;
class GamepadCheckDragComponent extends GamepadInteractComponentBase {
  constructor() {
    super(...arguments);
    this.r0f = false;
  }
  OnPress(e) {
    if (this.r0f) {
      this.r0f = false;
    } else {
      this.r0f = ControllerHolder_1.ControllerHolder.UiNavigationNewController.IsGamepadHitListenerUseDrag();
      var t = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
      let e = t.GetGuideUiListener();
      e = e || t.GetHitComponentListener();
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.GamepadInteractSimulationPointer(e?.GetSelectableComponent(), true);
      if (!ControllerHolder_1.ControllerHolder.UiNavigationNewController.IsNavigationMousePositionDragging() && this.r0f) {
        this.r0f = false;
      }
    }
  }
  OnRelease(e) {
    var t;
    if (!this.r0f) {
      if (!(t = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle()).GetGuideUiListener()) {
        t.GetHitComponentListener();
      }
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SimulationPointerTrigger(false);
    }
  }
  OnRefreshByControllerChange() {
    if (this.r0f) {
      this.r0f = false;
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SimulationPointerTrigger(false);
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.NotifyNavigationMousePositionDragState(false);
    }
  }
}
exports.GamepadCheckDragComponent = GamepadCheckDragComponent;
const WHEEL_SPEED_SCALE = 0.4;
class GamepadWheelComponent extends GamepadInteractComponentBase {
  constructor() {
    super(...arguments);
    this.BQ_ = 0;
  }
  OnInputAxis(e, t) {
    t = -t * WHEEL_SPEED_SCALE;
    if (this.BQ_ !== t || t != 0) {
      this.BQ_ = t;
      LguiEventSystemManager_1.LguiEventSystemManager.InputWheelAxisByGamepad(t);
    }
  }
}
exports.GamepadWheelComponent = GamepadWheelComponent;
class GamepadClickComponent extends GamepadInteractComponentBase {
  OnPress(e) {
    var t = UiNavigationViewManager_1.UiNavigationViewManager.GetCurrentViewHandle();
    let o = t.GetGuideUiListener();
    if ((o = o || t.GetHitComponentListener()) && o.TagArray?.Contains(e.BindButtonTag)) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.InteractClickByListener(o);
    }
  }
  OnRefreshSelfHotKeyState(t) {
    var o = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(o)) {
      if (t.HasGamepadControlMouse()) {
        if (t.IsNavigationMousePositionDragging()) {
          this.SetVisibleMode(2, false);
        } else {
          let e = t.GetGuideUiListener();
          if (e = e || t.GetHitComponentListener()) {
            t = e.TagArray?.Contains(o) ?? false;
            this.SetVisibleMode(2, t);
          } else {
            this.SetVisibleMode(2, false);
          }
        }
      } else {
        this.SetVisibleMode(2, false);
      }
    }
  }
}
exports.GamepadClickComponent = GamepadClickComponent;
//# sourceMappingURL=GamepadInteractComponent.js.map