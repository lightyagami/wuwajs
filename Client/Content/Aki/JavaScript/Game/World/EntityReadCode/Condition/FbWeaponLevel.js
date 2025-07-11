"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbWeaponLevel = undefined;
const UnionWeaponLevelHelper_1 = require("./UnionWeaponLevelHelper");
class FbWeaponLevel {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.s_h = false;
    this.Hye = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbWeaponLevel(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Option() {
    var e;
    var t;
    if (!this.s_h && (this.s_h = true, e = this.FbDataInternal.optionType(), t = UnionWeaponLevelHelper_1.UnionWeaponLevelHelper.GetUnionWeaponLevelObject(e))) {
      this.Hye = UnionWeaponLevelHelper_1.UnionWeaponLevelHelper.ReadUnionWeaponLevel(e, this.FbDataInternal.option(t));
    }
    return this.Hye;
  }
}
exports.FbWeaponLevel = FbWeaponLevel;
//# sourceMappingURL=FbWeaponLevel.js.map