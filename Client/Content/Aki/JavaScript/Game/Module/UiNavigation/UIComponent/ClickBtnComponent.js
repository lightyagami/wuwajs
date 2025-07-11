"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickBtnComponent = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const HotKeyViewDefine_1 = require("../HotKeyViewDefine");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class ClickBtnComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress(e) {
    this.c8i(e.BindButtonTag);
  }
  c8i(e) {
    if (e === HotKeyViewDefine_1.EXIT_TAG) {
      UiNavigationNewController_1.UiNavigationNewController.HotKeyCloseView();
    } else {
      UiNavigationNewController_1.UiNavigationNewController.ClickButton(e);
    }
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      e = e.GetActiveListenerByTag(t);
      this.SetVisibleMode(2, e?.IsListenerActive() ?? false);
    }
  }
}
exports.ClickBtnComponent = ClickBtnComponent;
//# sourceMappingURL=ClickBtnComponent.js.map