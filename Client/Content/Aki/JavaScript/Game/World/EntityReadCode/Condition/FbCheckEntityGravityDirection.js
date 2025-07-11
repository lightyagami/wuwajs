"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckEntityGravityDirection = undefined;
const UnionGravityDirectionHelper_1 = require("../Common/UnionGravityDirectionHelper");
const UnionCheckTargetHelper_1 = require("./UnionCheckTargetHelper");
class FbCheckEntityGravityDirection {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ldh = false;
    this.NHo = undefined;
    this.yUh = false;
    this.SUh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckEntityGravityDirection(t);
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
    var i;
    if (!this.ldh && (this.ldh = true, t = this.FbDataInternal.targetType(), i = UnionCheckTargetHelper_1.UnionCheckTargetHelper.GetUnionCheckTargetObject(t))) {
      this.NHo = UnionCheckTargetHelper_1.UnionCheckTargetHelper.ReadUnionCheckTarget(t, this.FbDataInternal.target(i));
    }
    return this.NHo;
  }
  get GravityDirection() {
    var t;
    var i;
    if (!this.yUh && (this.yUh = true, t = this.FbDataInternal.gravityDirectionType(), i = UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.GetUnionGravityDirectionObject(t))) {
      this.SUh = UnionGravityDirectionHelper_1.UnionGravityDirectionHelper.ReadUnionGravityDirection(t, this.FbDataInternal.gravityDirection(i));
    }
    return this.SUh;
  }
}
exports.FbCheckEntityGravityDirection = FbCheckEntityGravityDirection;
//# sourceMappingURL=FbCheckEntityGravityDirection.js.map