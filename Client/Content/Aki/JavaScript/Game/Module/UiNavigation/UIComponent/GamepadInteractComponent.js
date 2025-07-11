"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamepadWheelComponent = exports.GamepadCheckComponent = exports.GamepadMoveRightComponent = exports.GamepadMoveForwardComponent = undefined;
const LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
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
    UiNavigationNewController_1.UiNavigationNewController.GamepadControlMouseMoveForward(t);
  }
}
exports.GamepadMoveForwardComponent = GamepadMoveForwardComponent;
class GamepadMoveRightComponent extends GamepadInteractComponentBase {
  OnInputAxis(e, t) {
    UiNavigationNewController_1.UiNavigationNewController.GamepadControlMouseMoveRight(t);
  }
}
exports.GamepadMoveRightComponent = GamepadMoveRightComponent;
class GamepadCheckComponent extends GamepadInteractComponentBase {
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.SimulationPointerTrigger(true);
  }
  OnRelease(e) {
    UiNavigationNewController_1.UiNavigationNewController.SimulationPointerTrigger(false);
  }
}
exports.GamepadCheckComponent = GamepadCheckComponent;
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
//# sourceMappingURL=GamepadInteractComponent.js.map