"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRushWarningEffectParams = undefined;
class FbRushWarningEffectParams {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.H9h = false;
    this.W9h = 0;
    this.V9h = false;
    this.j9h = 0;
    this.Fph = false;
    this.Nph = 0;
  }
  static Create(t) {
    if (t) {
      return new FbRushWarningEffectParams(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Length() {
    if (!this.H9h) {
      this.H9h = true;
      this.W9h = this.FbDataInternal.length();
    }
    return this.W9h;
  }
  get Width() {
    if (!this.V9h) {
      this.V9h = true;
      this.j9h = this.FbDataInternal.width();
    }
    return this.j9h;
  }
  get Time() {
    if (!this.Fph) {
      this.Fph = true;
      this.Nph = this.FbDataInternal.time();
    }
    return this.Nph;
  }
}
exports.FbRushWarningEffectParams = FbRushWarningEffectParams;
//# sourceMappingURL=FbRushWarningEffectParams.js.map