"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbStopNewMoveWithSplineAtTargetPoint = void 0;
class FbStopNewMoveWithSplineAtTargetPoint {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.N11 = !1, this.V11 = 0
  }
  static Create(t) {
    if (t) return new FbStopNewMoveWithSplineAtTargetPoint(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get PointId() {
    return this.N11 || (this.N11 = !0, this.V11 = this.FbDataInternal.pointId()), this.V11
  }
}
exports.FbStopNewMoveWithSplineAtTargetPoint = FbStopNewMoveWithSplineAtTargetPoint;
//# sourceMappingURL=FbStopNewMoveWithSplineAtTargetPoint.js.map