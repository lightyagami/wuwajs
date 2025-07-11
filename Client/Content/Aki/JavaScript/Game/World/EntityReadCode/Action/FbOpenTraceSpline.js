"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOpenTraceSpline = undefined;
class FbOpenTraceSpline {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.kuh = false;
    this.Guh = 0;
    this.I_h = false;
    this.y6o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbOpenTraceSpline(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
}
exports.FbOpenTraceSpline = FbOpenTraceSpline;
//# sourceMappingURL=FbOpenTraceSpline.js.map