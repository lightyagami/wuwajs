"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextInputComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class TextInputComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.ActiveTextInput(e.BindButtonTag);
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      e = e.GetActiveListenerByTag(t);
      this.SetVisibleMode(2, e?.IsListenerActive() ?? false);
    }
  }
}
exports.TextInputComponent = TextInputComponent;
//# sourceMappingURL=TextInputComponent.js.map