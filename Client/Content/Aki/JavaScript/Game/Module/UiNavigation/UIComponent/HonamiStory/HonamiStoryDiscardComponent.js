"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryDiscardComponent = undefined;
const HonamiStoryComponentBase_1 = require("./HonamiStoryComponentBase");
class HonamiStoryDiscardComponent extends HonamiStoryComponentBase_1.HonamiStoryComponentBase {
  OnPress(t) {
    if (this.Logic) {
      this.Logic.Discard();
    }
  }
  OnRefreshSelfHotKeyState(t) {
    if (!this.Logic || !this.Logic.IsInGame() || !t.HasGamepadControlMouse() || t.IsNavigationMousePositionDragging() || !(t = this.Logic.GetCurItem()) || t.GetBackpackType() === 2) {
      this.SetVisibleMode(2, false);
    } else {
      this.SetVisibleMode(2, true);
    }
  }
}
exports.HonamiStoryDiscardComponent = HonamiStoryDiscardComponent;
//# sourceMappingURL=HonamiStoryDiscardComponent.js.map