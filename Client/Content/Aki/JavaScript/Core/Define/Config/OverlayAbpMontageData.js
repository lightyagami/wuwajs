"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverlayAbpMontageData = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class OverlayAbpMontageData {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Montage() {
    return this.montage();
  }
  get MaleVariant() {
    return this.malevariant();
  }
  get IsWalkingUsable() {
    return this.iswalkingusable();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsOverlayAbpMontageData(t, e) {
    return (e || new OverlayAbpMontageData()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  montage(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  malevariant(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  iswalkingusable() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.OverlayAbpMontageData = OverlayAbpMontageData;
//# sourceMappingURL=OverlayAbpMontageData.js.map