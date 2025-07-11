"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingSliderReduceReverseInsideComponent = exports.SettingSliderIncreaseReverseInsideComponent = exports.SettingSliderReduceInsideComponent = exports.SettingSliderIncreaseInsideComponent = exports.SliderReduceInsideComponent = exports.SliderIncreaseInsideComponent = exports.SliderInsideComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const SliderComponent_1 = require("./SliderComponent");
const INTERVAL = 0.05;
const SLIDER_DEAD_AREA = 0.4;
class SliderInsideComponent extends SliderComponent_1.SliderComponent {
  SetValue(e) {
    UiNavigationNewController_1.UiNavigationNewController.SliderInsideComponentSetValue(this.GetBindButtonTag(), e);
  }
  OnRefreshSelfHotKeyState(e) {
    var n = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(n)) {
      if ((e = e.GetFocusListener()) && (e = UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(e, n))) {
        this.SetVisibleMode(2, e.IsListenerActive());
      } else {
        this.SetVisibleMode(2, false);
      }
    }
  }
}
class SliderIncreaseInsideComponent extends (exports.SliderInsideComponent = SliderInsideComponent) {
  OnRelease(e) {
    this.SetValue(INTERVAL);
  }
  OnInputAxis(e, n) {
    if (!(n <= SLIDER_DEAD_AREA)) {
      this.SetValue(n * INTERVAL);
    }
  }
}
exports.SliderIncreaseInsideComponent = SliderIncreaseInsideComponent;
class SliderReduceInsideComponent extends SliderInsideComponent {
  OnRelease(e) {
    this.SetValue(-INTERVAL);
  }
  OnInputAxis(e, n) {
    if (!(n >= -SLIDER_DEAD_AREA)) {
      this.SetValue(n * INTERVAL);
    }
  }
}
exports.SliderReduceInsideComponent = SliderReduceInsideComponent;
const DEAD_AREA = 0.073;
const SETTING_INTERVAL = 0.01;
class SettingSliderIncreaseInsideComponent extends SliderIncreaseInsideComponent {
  OnInputAxis(e, n) {
    if (!(n <= DEAD_AREA)) {
      this.SetValue(n * SETTING_INTERVAL);
    }
  }
}
exports.SettingSliderIncreaseInsideComponent = SettingSliderIncreaseInsideComponent;
class SettingSliderReduceInsideComponent extends SliderReduceInsideComponent {
  OnInputAxis(e, n) {
    if (!(n >= -DEAD_AREA)) {
      this.SetValue(n * SETTING_INTERVAL);
    }
  }
}
exports.SettingSliderReduceInsideComponent = SettingSliderReduceInsideComponent;
class SettingSliderIncreaseReverseInsideComponent extends SliderIncreaseInsideComponent {
  OnInputAxis(e, n) {
    if (!(n >= -DEAD_AREA)) {
      this.SetValue(-n * SETTING_INTERVAL);
    }
  }
}
exports.SettingSliderIncreaseReverseInsideComponent = SettingSliderIncreaseReverseInsideComponent;
class SettingSliderReduceReverseInsideComponent extends SliderReduceInsideComponent {
  OnInputAxis(e, n) {
    if (!(n <= DEAD_AREA)) {
      this.SetValue(-n * SETTING_INTERVAL);
    }
  }
}
exports.SettingSliderReduceReverseInsideComponent = SettingSliderReduceReverseInsideComponent;
//# sourceMappingURL=SliderInsideComponent.js.map