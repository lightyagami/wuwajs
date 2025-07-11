"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCloseSplineMove = undefined;
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbCloseSplineMove {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ldh = false;
    this.NHo = undefined;
    this.kuh = false;
    this.Guh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCloseSplineMove(t);
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
}
exports.FbCloseSplineMove = FbCloseSplineMove;
//# sourceMappingURL=FbCloseSplineMove.js.map