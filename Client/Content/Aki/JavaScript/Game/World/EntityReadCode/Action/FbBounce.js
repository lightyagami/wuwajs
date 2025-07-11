"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBounce = undefined;
class FbBounce {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.mSh = false;
    this.CSh = 0;
    this.Fph = false;
    this.Nph = 0;
    this.gSh = false;
    this.fSh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBounce(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Height() {
    if (!this.mSh) {
      this.mSh = true;
      this.CSh = this.FbDataInternal.height();
    }
    return this.CSh;
  }
  get Time() {
    if (!this.Fph) {
      this.Fph = true;
      this.Nph = this.FbDataInternal.time();
    }
    return this.Nph;
  }
  get MotionCurve() {
    if (!this.gSh) {
      this.gSh = true;
      this.fSh = this.FbDataInternal.motionCurve();
    }
    return this.fSh;
  }
}
exports.FbBounce = FbBounce;
//# sourceMappingURL=FbBounce.js.map