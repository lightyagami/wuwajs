"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbWeaponComponent = undefined;
class FbWeaponComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.VRh = false;
    this.jRh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbWeaponComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get WeaponId() {
    if (!this.VRh) {
      this.VRh = true;
      this.jRh = this.FbDataInternal.weaponId();
    }
    return this.jRh;
  }
}
exports.FbWeaponComponent = FbWeaponComponent;
//# sourceMappingURL=FbWeaponComponent.js.map