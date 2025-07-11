"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMontageAsset = undefined;
class FbMontageAsset {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.hRh = false;
    this.lRh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMontageAsset(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Asset() {
    if (!this.hRh) {
      this.hRh = true;
      this.lRh = this.FbDataInternal.asset();
    }
    return this.lRh;
  }
}
exports.FbMontageAsset = FbMontageAsset;
//# sourceMappingURL=FbMontageAsset.js.map