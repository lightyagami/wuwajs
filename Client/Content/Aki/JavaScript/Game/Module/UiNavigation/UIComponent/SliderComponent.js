"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SliderReduceReverseComponent = exports.SliderIncreaseReverseComponent = exports.SliderReduceComponent = exports.SliderIncreaseComponent = exports.SliderComponent = undefined;
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
const INTERVAL = 0.05;
const DEAD_AREA = 0.4;
class SliderComponent extends HotKeyComponent_1.HotKeyComponent {
  SetValue(e) {
    UiNavigationNewController_1.UiNavigationNewController.SliderComponentSetValue(this.GetBindButtonTag(), e);
  }
}
class SliderIncreaseComponent extends (exports.SliderComponent = SliderComponent) {
  OnRelease(e) {
    this.SetValue(INTERVAL);
  }
  OnInputAxis(e, n) {
    if (!(n <= DEAD_AREA)) {
      this.SetValue(n * INTERVAL);
    }
  }
}
exports.SliderIncreaseComponent = SliderIncreaseComponent;
class SliderReduceComponent extends SliderComponent {
  OnRelease(e) {
    this.SetValue(-INTERVAL);
  }
  OnInputAxis(e, n) {
    if (!(n >= -DEAD_AREA)) {
      this.SetValue(n * INTERVAL);
    }
  }
}
exports.SliderReduceComponent = SliderReduceComponent;
class SliderIncreaseReverseComponent extends SliderComponent {
  OnRelease(e) {
    this.SetValue(INTERVAL);
  }
  OnInputAxis(e, n) {
    if (!(n >= -DEAD_AREA)) {
      this.SetValue(-n * INTERVAL);
    }
  }
}
exports.SliderIncreaseReverseComponent = SliderIncreaseReverseComponent;
class SliderReduceReverseComponent extends SliderComponent {
  OnRelease(e) {
    this.SetValue(-INTERVAL);
  }
  OnInputAxis(e, n) {
    if (!(n <= DEAD_AREA)) {
      this.SetValue(-n * INTERVAL);
    }
  }
}
exports.SliderReduceReverseComponent = SliderReduceReverseComponent;
//# sourceMappingURL=SliderComponent.js.map