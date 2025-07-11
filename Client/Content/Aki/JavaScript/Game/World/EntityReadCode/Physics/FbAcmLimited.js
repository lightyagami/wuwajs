"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAcmLimited = undefined;
class FbAcmLimited {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.SZh = false;
    this.MZh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbAcmLimited(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get LimitValue() {
    if (!this.SZh) {
      this.SZh = true;
      this.MZh = this.FbDataInternal.limitValue();
    }
    return this.MZh;
  }
}
exports.FbAcmLimited = FbAcmLimited;
//# sourceMappingURL=FbAcmLimited.js.map