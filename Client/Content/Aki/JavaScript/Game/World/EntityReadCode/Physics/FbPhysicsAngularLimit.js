"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPhysicsAngularLimit = undefined;
const UnionAngularConstraintMotionHelper_1 = require("./UnionAngularConstraintMotionHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPhysicsAngularLimit {
  constructor(t) {
    this.FbDataInternal = t;
    this.dZh = false;
    this.mZh = undefined;
    this.CZh = false;
    this.gZh = undefined;
    this.fZh = false;
    this.pZh = undefined;
    this.vZh = false;
    this.yZh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPhysicsAngularLimit(t);
    }
  }
  get Swing1Motion() {
    var t;
    var i;
    if (!this.dZh && (this.dZh = true, t = this.FbDataInternal.swing1MotionType(), i = UnionAngularConstraintMotionHelper_1.UnionAngularConstraintMotionHelper.GetUnionAngularConstraintMotionObject(t))) {
      this.mZh = UnionAngularConstraintMotionHelper_1.UnionAngularConstraintMotionHelper.ReadUnionAngularConstraintMotion(t, this.FbDataInternal.swing1Motion(i));
    }
    return this.mZh;
  }
  get Swing2Motion() {
    var t;
    var i;
    if (!this.CZh && (this.CZh = true, t = this.FbDataInternal.swing2MotionType(), i = UnionAngularConstraintMotionHelper_1.UnionAngularConstraintMotionHelper.GetUnionAngularConstraintMotionObject(t))) {
      this.gZh = UnionAngularConstraintMotionHelper_1.UnionAngularConstraintMotionHelper.ReadUnionAngularConstraintMotion(t, this.FbDataInternal.swing2Motion(i));
    }
    return this.gZh;
  }
  get TwistMotion() {
    var t;
    var i;
    if (!this.fZh && (this.fZh = true, t = this.FbDataInternal.twistMotionType(), i = UnionAngularConstraintMotionHelper_1.UnionAngularConstraintMotionHelper.GetUnionAngularConstraintMotionObject(t))) {
      this.pZh = UnionAngularConstraintMotionHelper_1.UnionAngularConstraintMotionHelper.ReadUnionAngularConstraintMotion(t, this.FbDataInternal.twistMotion(i));
    }
    return this.pZh;
  }
  get AngularRotationOffset() {
    if (!this.vZh) {
      this.vZh = true;
      this.yZh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.angularRotationOffset());
    }
    return this.yZh;
  }
}
exports.FbPhysicsAngularLimit = FbPhysicsAngularLimit;
//# sourceMappingURL=FbPhysicsAngularLimit.js.map