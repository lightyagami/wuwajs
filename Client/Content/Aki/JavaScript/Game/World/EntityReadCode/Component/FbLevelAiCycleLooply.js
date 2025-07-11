"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLevelAiCycleLooply = undefined;
class FbLevelAiCycleLooply {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.QRh = false;
    this.KRh = false;
  }
  static Create(t) {
    if (t) {
      return new FbLevelAiCycleLooply(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get IsCircle() {
    if (!this.QRh) {
      this.QRh = true;
      this.KRh = this.FbDataInternal.isCircle();
    }
    return this.KRh;
  }
}
exports.FbLevelAiCycleLooply = FbLevelAiCycleLooply;
//# sourceMappingURL=FbLevelAiCycleLooply.js.map