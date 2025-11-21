"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStorySellComponent = undefined;
const HonamiStoryComponentBase_1 = require("./HonamiStoryComponentBase");
class HonamiStorySellComponent extends HonamiStoryComponentBase_1.HonamiStoryComponentBase {
  OnPress(e) {
    if (this.Logic) {
      this.Logic.SellSingleOne();
    }
  }
  OnRefreshSelfHotKeyState(e) {
    if (e.HasGamepadControlMouse() && !e.IsNavigationMousePositionDragging() && this.Logic) {
      this.SetVisibleMode(2, !this.Logic.IsInGame());
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.HonamiStorySellComponent = HonamiStorySellComponent;
//# sourceMappingURL=HonamiStorySellComponent.js.map