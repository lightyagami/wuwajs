"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckPlayerStateRestrictionCondition = undefined;
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
class FbCheckPlayerStateRestrictionCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Wzh = false;
    this.Qzh = 0;
    this.czh = false;
    this.uzh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckPlayerStateRestrictionCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get RestrictionId() {
    if (!this.Wzh) {
      this.Wzh = true;
      this.Qzh = this.FbDataInternal.restrictionId();
    }
    return this.Qzh;
  }
  get OnlinePlayerConditionTargetOption() {
    var t;
    var i;
    if (!this.czh && (this.czh = true, t = this.FbDataInternal.onlinePlayerConditionTargetOptionType(), i = UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.GetUnionOnlinePlayerConditionTargetObject(t))) {
      this.uzh = UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.ReadUnionOnlinePlayerConditionTarget(t, this.FbDataInternal.onlinePlayerConditionTargetOption(i));
    }
    return this.uzh;
  }
}
exports.FbCheckPlayerStateRestrictionCondition = FbCheckPlayerStateRestrictionCondition;
//# sourceMappingURL=FbCheckPlayerStateRestrictionCondition.js.map