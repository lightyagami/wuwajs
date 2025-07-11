"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnterScreenWeight = undefined;
class FbEnterScreenWeight {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.jDh = false;
    this.HDh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbEnterScreenWeight(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Weight() {
    if (!this.jDh) {
      this.jDh = true;
      this.HDh = this.FbDataInternal.weight();
    }
    return this.HDh;
  }
}
exports.FbEnterScreenWeight = FbEnterScreenWeight;
//# sourceMappingURL=FbEnterScreenWeight.js.map