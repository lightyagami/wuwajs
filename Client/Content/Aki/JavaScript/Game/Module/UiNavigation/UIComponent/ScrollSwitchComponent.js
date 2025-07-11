"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollSwitchComponent = undefined;
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
const THRESHOLD = 0.6;
class ScrollSwitchComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.Uqo = false;
  }
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.FindScrollbar(true);
  }
  OnInputAxis(e, t) {
    if (this.Uqo) {
      if (t === 0) {
        this.Uqo = false;
      }
    } else if (!(Math.abs(t) <= THRESHOLD)) {
      UiNavigationNewController_1.UiNavigationNewController.FindScrollbar(t < 0);
      this.Uqo = true;
    }
  }
  OnRefreshSelfHotKeyState(e) {
    e = e.GetScrollbarData();
    this.SetVisibleMode(2, e.HasActiveScrollbarList());
  }
}
exports.ScrollSwitchComponent = ScrollSwitchComponent;
//# sourceMappingURL=ScrollSwitchComponent.js.map