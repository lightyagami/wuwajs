"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTraceSpline = undefined;
class FbTraceSpline {
  constructor(t) {
    this.FbDataInternal = t;
    this.xEh = false;
    this.REh = undefined;
    this.I_h = false;
    this.y6o = 0;
    this.kuh = false;
    this.Guh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTraceSpline(t);
    }
  }
  get EffectPath() {
    if (!this.xEh) {
      this.xEh = true;
      this.REh = this.FbDataInternal.effectPath();
    }
    return this.REh;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
}
exports.FbTraceSpline = FbTraceSpline;
//# sourceMappingURL=FbTraceSpline.js.map