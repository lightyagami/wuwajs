"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryMoveRightComponent = undefined;
const HonamiStoryComponentBase_1 = require("./HonamiStoryComponentBase");
class HonamiStoryMoveRightComponent extends HonamiStoryComponentBase_1.HonamiStoryComponentBase {
  OnPress(o) {
    if (this.Logic) {
      this.Logic.JumpToNextPanelNew();
    }
  }
  OnRefreshSelfHotKeyState(o) {
    if (this.Logic) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.HonamiStoryMoveRightComponent = HonamiStoryMoveRightComponent;
//# sourceMappingURL=HonamiStoryMoveRightComponent.js.map