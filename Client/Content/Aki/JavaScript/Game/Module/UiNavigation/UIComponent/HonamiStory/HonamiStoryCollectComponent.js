"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryCollectComponent = undefined;
const HonamiStoryComponentBase_1 = require("./HonamiStoryComponentBase");
class HonamiStoryCollectComponent extends HonamiStoryComponentBase_1.HonamiStoryComponentBase {
  OnPress(o) {
    if (this.Logic) {
      this.Logic.Collect();
    }
  }
  OnRefreshSelfHotKeyState(o) {
    var t;
    if (!this.Logic || !(t = this.Logic.GetCurItem()) || t.GetBackpackType() !== 2) {
      this.SetVisibleMode(2, false);
    } else {
      this.SetVisibleMode(2, true);
    }
  }
}
exports.HonamiStoryCollectComponent = HonamiStoryCollectComponent;
//# sourceMappingURL=HonamiStoryCollectComponent.js.map