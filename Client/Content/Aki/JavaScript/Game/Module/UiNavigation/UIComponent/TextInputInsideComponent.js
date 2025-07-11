"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextInputInsideComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class TextInputInsideComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.ActiveTextInputInside(e.BindButtonTag);
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      if ((e = e.GetFocusListener()) && (e = UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(e, t))) {
        this.SetVisibleMode(2, e?.IsListenerActive() ?? false);
      } else {
        this.SetVisibleMode(2, false);
      }
    }
  }
}
exports.TextInputInsideComponent = TextInputInsideComponent;
//# sourceMappingURL=TextInputInsideComponent.js.map