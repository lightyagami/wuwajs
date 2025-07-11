"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickBtnReleaseComponent = undefined;
const HotKeyViewDefine_1 = require("../HotKeyViewDefine");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class ClickBtnReleaseComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRelease(e) {
    this.c8i(e.BindButtonTag);
  }
  c8i(e) {
    if (e === HotKeyViewDefine_1.EXIT_TAG) {
      UiNavigationNewController_1.UiNavigationNewController.HotKeyCloseView();
    } else {
      UiNavigationNewController_1.UiNavigationNewController.ClickButton(e);
    }
  }
}
exports.ClickBtnReleaseComponent = ClickBtnReleaseComponent;
//# sourceMappingURL=ClickBtnReleaseComponent.js.map