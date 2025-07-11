"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStopNewMoveWithSpline = undefined;
const UnionNewSplineMoveTargetHelper_1 = require("./UnionNewSplineMoveTargetHelper");
const UnionStopNewMoveWithSplineTypeHelper_1 = require("./UnionStopNewMoveWithSplineTypeHelper");
class FbStopNewMoveWithSpline {
  constructor(e) {
    this.FbDataInternal = e;
    this.nc1 = false;
    this.sc1 = undefined;
    this.ZEh = false;
    this.eIh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbStopNewMoveWithSpline(e);
    }
  }
  get StopTarget() {
    var e;
    var t;
    if (!this.nc1 && (this.nc1 = true, e = this.FbDataInternal.stopTargetType(), t = UnionNewSplineMoveTargetHelper_1.UnionNewSplineMoveTargetHelper.GetUnionNewSplineMoveTargetObject(e))) {
      this.sc1 = UnionNewSplineMoveTargetHelper_1.UnionNewSplineMoveTargetHelper.ReadUnionNewSplineMoveTarget(e, this.FbDataInternal.stopTarget(t));
    }
    return this.sc1;
  }
  get StopType() {
    var e;
    var t;
    if (!this.ZEh && (this.ZEh = true, e = this.FbDataInternal.stopTypeType(), t = UnionStopNewMoveWithSplineTypeHelper_1.UnionStopNewMoveWithSplineTypeHelper.GetUnionStopNewMoveWithSplineTypeObject(e))) {
      this.eIh = UnionStopNewMoveWithSplineTypeHelper_1.UnionStopNewMoveWithSplineTypeHelper.ReadUnionStopNewMoveWithSplineType(e, this.FbDataInternal.stopType(t));
    }
    return this.eIh;
  }
}
exports.FbStopNewMoveWithSpline = FbStopNewMoveWithSpline;
//# sourceMappingURL=FbStopNewMoveWithSpline.js.map