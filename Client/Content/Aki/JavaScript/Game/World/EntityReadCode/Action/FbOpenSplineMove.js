"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOpenSplineMove = undefined;
const UnionSplineMovePatternHelper_1 = require("./UnionSplineMovePatternHelper");
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbOpenSplineMove {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ldh = false;
    this.NHo = undefined;
    this.kuh = false;
    this.Guh = 0;
    this.Pbh = false;
    this.Ubh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbOpenSplineMove(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Target() {
    var t;
    var e;
    if (!this.ldh && (this.ldh = true, t = this.FbDataInternal.targetType(), e = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.NHo = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.target(e));
    }
    return this.NHo;
  }
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
  get Pattern() {
    var t;
    var e;
    if (!this.Pbh && (this.Pbh = true, t = this.FbDataInternal.patternType(), e = UnionSplineMovePatternHelper_1.UnionSplineMovePatternHelper.GetUnionSplineMovePatternObject(t))) {
      this.Ubh = UnionSplineMovePatternHelper_1.UnionSplineMovePatternHelper.ReadUnionSplineMovePattern(t, this.FbDataInternal.pattern(e));
    }
    return this.Ubh;
  }
}
exports.FbOpenSplineMove = FbOpenSplineMove;
//# sourceMappingURL=FbOpenSplineMove.js.map