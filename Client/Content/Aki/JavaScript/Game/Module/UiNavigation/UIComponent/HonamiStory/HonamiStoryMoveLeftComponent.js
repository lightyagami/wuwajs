"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryMoveLeftComponent = undefined;
const HonamiStoryComponentBase_1 = require("./HonamiStoryComponentBase");
class HonamiStoryMoveLeftComponent extends HonamiStoryComponentBase_1.HonamiStoryComponentBase {
  OnPress(e) {
    if (this.Logic) {
      this.Logic.JumpToPrevPanelNew();
    }
  }
  OnRefreshSelfHotKeyState(e) {
    if (this.Logic) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.HonamiStoryMoveLeftComponent = HonamiStoryMoveLeftComponent;
//# sourceMappingURL=HonamiStoryMoveLeftComponent.js.map