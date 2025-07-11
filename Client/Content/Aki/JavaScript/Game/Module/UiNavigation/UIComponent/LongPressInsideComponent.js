"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LongPressInsideComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class LongPressInsideComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRelease(e) {
    UiNavigationNewController_1.UiNavigationNewController.SimulationPointUpInside(e.BindButtonTag);
  }
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.SimulationPointDownInside(e.BindButtonTag);
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      if ((e = e.GetFocusListener()) && this.IsLinkListener(e.GetOwner())) {
        e = e.GetChildListenerByTag(t);
        this.SetVisibleMode(2, e?.IsListenerActive() ?? false);
      } else {
        this.SetVisibleMode(2, false);
      }
    }
  }
}
exports.LongPressInsideComponent = LongPressInsideComponent;
//# sourceMappingURL=LongPressInsideComponent.js.map