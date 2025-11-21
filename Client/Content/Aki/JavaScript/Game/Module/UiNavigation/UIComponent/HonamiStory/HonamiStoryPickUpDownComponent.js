"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryPickUpDownComponent = undefined;
const HonamiStoryComponentBase_1 = require("./HonamiStoryComponentBase");
class HonamiStoryPickUpDownComponent extends HonamiStoryComponentBase_1.HonamiStoryComponentBase {
  OnPress(o) {}
  OnRefreshSelfHotKeyState(o) {
    if (this.Logic) {
      this.SetVisibleMode(2, true);
    } else {
      this.SetVisibleMode(2, false);
    }
  }
}
exports.HonamiStoryPickUpDownComponent = HonamiStoryPickUpDownComponent;
//# sourceMappingURL=HonamiStoryPickUpDownComponent.js.map