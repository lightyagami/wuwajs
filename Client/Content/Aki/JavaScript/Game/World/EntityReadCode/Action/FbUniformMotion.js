"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbUniformMotion = undefined;
class FbUniformMotion {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Fph = false;
    this.Nph = 0;
  }
  static Create(t) {
    if (t) {
      return new FbUniformMotion(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Time() {
    if (!this.Fph) {
      this.Fph = true;
      this.Nph = this.FbDataInternal.time();
    }
    return this.Nph;
  }
}
exports.FbUniformMotion = FbUniformMotion;
//# sourceMappingURL=FbUniformMotion.js.map