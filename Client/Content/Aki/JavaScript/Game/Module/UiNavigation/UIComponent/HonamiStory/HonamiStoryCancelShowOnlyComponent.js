"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryCancelShowOnlyComponent = undefined;
const HonamiStoryComponentBase_1 = require("./HonamiStoryComponentBase");
class HonamiStoryCancelShowOnlyComponent extends HonamiStoryComponentBase_1.HonamiStoryComponentBase {
  OnRefreshSelfHotKeyState(o) {
    if (o.HasGamepadControlMouse() && o.IsNavigationMousePositionDragging()) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.HonamiStoryCancelShowOnlyComponent = HonamiStoryCancelShowOnlyComponent;
//# sourceMappingURL=HonamiStoryCancelShowOnlyComponent.js.map