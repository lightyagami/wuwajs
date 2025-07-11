"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowOnlyComponent = undefined;
const HotKeyComponent_1 = require("./HotKeyComponent");
class ShowOnlyComponent extends HotKeyComponent_1.HotKeyComponent {
  OnRefreshSelfHotKeyState(e) {
    this.SetVisibleMode(2, true);
  }
  OnIsOccupancyFightInput() {
    return false;
  }
}
exports.ShowOnlyComponent = ShowOnlyComponent;
//# sourceMappingURL=ShowOnlyComponent.js.map