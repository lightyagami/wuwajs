"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBaseCurve = undefined;
class FbBaseCurve {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.sTh = false;
    this.aTh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbBaseCurve(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get N() {
    if (!this.sTh) {
      this.sTh = true;
      this.aTh = this.FbDataInternal.n();
    }
    return this.aTh;
  }
}
exports.FbBaseCurve = FbBaseCurve;
//# sourceMappingURL=FbBaseCurve.js.map