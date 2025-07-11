"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickBtnInsideReleaseComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class ClickBtnInsideReleaseComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRelease(e) {
    UiNavigationNewController_1.UiNavigationNewController.ClickButtonInside(e.BindButtonTag);
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      if (e = e.GetFocusListener()) {
        e = e.GetChildListenerByTag(t);
        this.SetVisibleMode(2, e?.IsListenerActive() ?? false);
      } else {
        this.SetVisibleMode(2, false);
      }
    }
  }
}
exports.ClickBtnInsideReleaseComponent = ClickBtnInsideReleaseComponent;
//# sourceMappingURL=ClickBtnInsideReleaseComponent.js.map