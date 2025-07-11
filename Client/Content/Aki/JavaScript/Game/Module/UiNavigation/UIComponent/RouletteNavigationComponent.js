"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteNavigationComponent = undefined;
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class RouletteNavigationComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.Nxo = undefined;
    this.Rqo = false;
  }
  OnPress() {
    this.Nxo = UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener();
    this.Rqo = UiNavigationNewController_1.UiNavigationNewController.Interact(true);
  }
  OnRelease(e) {
    var o = UiNavigationNewController_1.UiNavigationNewController.GetCurrentNavigationFocusListener();
    var t = UiNavigationNewController_1.UiNavigationNewController.Interact(false);
    if (this.Nxo === o && this.Rqo && t) {
      UiNavigationNewController_1.UiNavigationNewController.JumpNavigationGroup(5);
    }
  }
  OnRefreshSelfHotKeyState(e) {
    e = e.GetFocusListener();
    if (e !== undefined && e.GroupName === "Group1") {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.RouletteNavigationComponent = RouletteNavigationComponent;
//# sourceMappingURL=RouletteNavigationComponent.js.map