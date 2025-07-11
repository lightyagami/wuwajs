"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRangeSphere = undefined;
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbRangeSphere {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.nIh = false;
    this.n9o = undefined;
    this.sIh = false;
    this.s9o = 0;
    this.czh = false;
    this.uzh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbRangeSphere(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Center() {
    if (!this.nIh) {
      this.nIh = true;
      this.n9o = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.center());
    }
    return this.n9o;
  }
  get Radius() {
    if (!this.sIh) {
      this.sIh = true;
      this.s9o = this.FbDataInternal.radius();
    }
    return this.s9o;
  }
  get OnlinePlayerConditionTargetOption() {
    var t;
    var e;
    if (!this.czh && (this.czh = true, t = this.FbDataInternal.onlinePlayerConditionTargetOptionType(), e = UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.GetUnionOnlinePlayerConditionTargetObject(t))) {
      this.uzh = UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.ReadUnionOnlinePlayerConditionTarget(t, this.FbDataInternal.onlinePlayerConditionTargetOption(e));
    }
    return this.uzh;
  }
}
exports.FbRangeSphere = FbRangeSphere;
//# sourceMappingURL=FbRangeSphere.js.map