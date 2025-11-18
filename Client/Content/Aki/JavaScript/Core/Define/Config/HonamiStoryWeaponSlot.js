"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryWeaponSlot = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class HonamiStoryWeaponSlot {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsHonamiStoryWeaponSlot(t, e) {
    return (e || new HonamiStoryWeaponSlot()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.HonamiStoryWeaponSlot = HonamiStoryWeaponSlot;
//# sourceMappingURL=HonamiStoryWeaponSlot.js.map