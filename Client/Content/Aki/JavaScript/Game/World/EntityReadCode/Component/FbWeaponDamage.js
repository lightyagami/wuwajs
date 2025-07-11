"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbWeaponDamage = undefined;
class FbWeaponDamage {
  constructor(t) {
    this.FbDataInternal = t;
    this.I3h = false;
    this.T3h = 0;
    this.eVh = false;
    this.tVh = 0;
    this.iVh = false;
    this.rVh = 0;
    this.oVh = false;
    this.nVh = 0;
    this.sVh = false;
    this.aVh = 0;
    this.hVh = false;
    this.lVh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbWeaponDamage(t);
    }
  }
  get DefaultValue() {
    if (!this.I3h) {
      this.I3h = true;
      this.T3h = this.FbDataInternal.defaultValue();
    }
    return this.T3h;
  }
  get GreatSword() {
    if (!this.eVh) {
      this.eVh = true;
      this.tVh = this.FbDataInternal.greatSword();
    }
    return this.tVh;
  }
  get Dagger() {
    if (!this.iVh) {
      this.iVh = true;
      this.rVh = this.FbDataInternal.dagger();
    }
    return this.rVh;
  }
  get Pistol() {
    if (!this.oVh) {
      this.oVh = true;
      this.nVh = this.FbDataInternal.pistol();
    }
    return this.nVh;
  }
  get Pugilism() {
    if (!this.sVh) {
      this.sVh = true;
      this.aVh = this.FbDataInternal.pugilism();
    }
    return this.aVh;
  }
  get Ring() {
    if (!this.hVh) {
      this.hVh = true;
      this.lVh = this.FbDataInternal.ring();
    }
    return this.lVh;
  }
}
exports.FbWeaponDamage = FbWeaponDamage;
//# sourceMappingURL=FbWeaponDamage.js.map