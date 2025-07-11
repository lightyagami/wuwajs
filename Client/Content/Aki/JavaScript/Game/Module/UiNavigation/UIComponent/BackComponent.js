"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackComponent = undefined;
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class BackComponent extends HotKeyComponent_1.HotKeyComponent {
  OnPress() {
    UiNavigationNewController_1.UiNavigationNewController.HotKeyCloseView();
  }
}
exports.BackComponent = BackComponent;
//# sourceMappingURL=BackComponent.js.map