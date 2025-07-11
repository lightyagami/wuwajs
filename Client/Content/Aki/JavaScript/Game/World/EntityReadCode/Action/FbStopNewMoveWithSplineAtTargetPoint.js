"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStopNewMoveWithSplineAtTargetPoint = undefined;
class FbStopNewMoveWithSplineAtTargetPoint {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ac1 = false;
    this.hc1 = 0;
  }
  static Create(t) {
    if (t) {
      return new FbStopNewMoveWithSplineAtTargetPoint(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get PointId() {
    if (!this.ac1) {
      this.ac1 = true;
      this.hc1 = this.FbDataInternal.pointId();
    }
    return this.hc1;
  }
}
exports.FbStopNewMoveWithSplineAtTargetPoint = FbStopNewMoveWithSplineAtTargetPoint;
//# sourceMappingURL=FbStopNewMoveWithSplineAtTargetPoint.js.map