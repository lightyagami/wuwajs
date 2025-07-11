"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckTargetAttributeCondition = undefined;
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
const UnionTargetAttributeHelper_1 = require("./UnionTargetAttributeHelper");
class FbCheckTargetAttributeCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.s_h = false;
    this.Hye = undefined;
    this.czh = false;
    this.uzh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckTargetAttributeCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Option() {
    var t;
    var e;
    if (!this.s_h && (this.s_h = true, t = this.FbDataInternal.optionType(), e = UnionTargetAttributeHelper_1.UnionTargetAttributeHelper.GetUnionTargetAttributeObject(t))) {
      this.Hye = UnionTargetAttributeHelper_1.UnionTargetAttributeHelper.ReadUnionTargetAttribute(t, this.FbDataInternal.option(e));
    }
    return this.Hye;
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
exports.FbCheckTargetAttributeCondition = FbCheckTargetAttributeCondition;
//# sourceMappingURL=FbCheckTargetAttributeCondition.js.map