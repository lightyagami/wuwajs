"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonConsumeNavigationInsideNext = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const HotKeyComponent_1 = require("./HotKeyComponent");
class CommonConsumeNavigationInsideNext extends HotKeyComponent_1.HotKeyComponent {
  OnRelease(e) {
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.HandleCommonConsumeNavigationInside();
  }
  OnRefreshSelfHotKeyState(e) {
    e = e.GetFocusListener();
    if (e && this.IsLinkListener(e.GetOwner()) && ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetCanFocusInsideListener(e)) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.CommonConsumeNavigationInsideNext = CommonConsumeNavigationInsideNext;
//# sourceMappingURL=CommonConsumeNavigationInsideNext.js.map