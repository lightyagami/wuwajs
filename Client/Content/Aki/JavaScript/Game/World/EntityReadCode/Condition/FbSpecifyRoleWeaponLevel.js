"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSpecifyRoleWeaponLevel = undefined;
class FbSpecifyRoleWeaponLevel {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Afh = false;
    this.V_i = 0;
    this._ch = false;
    this.cch = undefined;
    this.Muh = false;
    this.jGi = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSpecifyRoleWeaponLevel(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Index() {
    if (!this.Afh) {
      this.Afh = true;
      this.V_i = this.FbDataInternal.index();
    }
    return this.V_i;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get Level() {
    if (!this.Muh) {
      this.Muh = true;
      this.jGi = this.FbDataInternal.level();
    }
    return this.jGi;
  }
}
exports.FbSpecifyRoleWeaponLevel = FbSpecifyRoleWeaponLevel;
//# sourceMappingURL=FbSpecifyRoleWeaponLevel.js.map