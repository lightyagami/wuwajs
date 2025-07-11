"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNewMoveWithSpline = undefined;
const UnionNewSplineMoveTargetHelper_1 = require("./UnionNewSplineMoveTargetHelper");
class FbNewMoveWithSpline {
  constructor(t) {
    this.FbDataInternal = t;
    this.Buh = false;
    this.quh = undefined;
    this.kuh = false;
    this.Guh = 0;
    this.juh = false;
    this.Huh = 0;
    this.Wuh = false;
    this.Quh = 0;
    this.Xuh = false;
    this.Yuh = false;
    this.Kuh = false;
    this.$uh = false;
  }
  static Create(t) {
    if (t) {
      return new FbNewMoveWithSpline(t);
    }
  }
  get MoveTarget() {
    var t;
    var i;
    if (!this.Buh && (this.Buh = true, t = this.FbDataInternal.moveTargetType(), i = UnionNewSplineMoveTargetHelper_1.UnionNewSplineMoveTargetHelper.GetUnionNewSplineMoveTargetObject(t))) {
      this.quh = UnionNewSplineMoveTargetHelper_1.UnionNewSplineMoveTargetHelper.ReadUnionNewSplineMoveTarget(t, this.FbDataInternal.moveTarget(i));
    }
    return this.quh;
  }
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
  get StartPointIndex() {
    if (!this.juh) {
      this.juh = true;
      this.Huh = this.FbDataInternal.startPointIndex();
    }
    return this.Huh;
  }
  get EndPointIndex() {
    if (!this.Wuh) {
      this.Wuh = true;
      this.Quh = this.FbDataInternal.endPointIndex();
    }
    return this.Quh;
  }
  get IsForceToFirstPoint() {
    if (!this.Xuh) {
      this.Xuh = true;
      this.Yuh = this.FbDataInternal.isForceToFirstPoint();
    }
    return this.Yuh;
  }
  get IsFollowStrictly() {
    if (!this.Kuh) {
      this.Kuh = true;
      this.$uh = this.FbDataInternal.isFollowStrictly();
    }
    return this.$uh;
  }
}
exports.FbNewMoveWithSpline = FbNewMoveWithSpline;
//# sourceMappingURL=FbNewMoveWithSpline.js.map