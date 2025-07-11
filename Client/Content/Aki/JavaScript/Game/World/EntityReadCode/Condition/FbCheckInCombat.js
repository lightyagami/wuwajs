"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckInCombat = undefined;
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
class FbCheckInCombat {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Rzh = false;
    this.wzh = false;
    this.czh = false;
    this.uzh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckInCombat(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get InCombat() {
    if (!this.Rzh) {
      this.Rzh = true;
      this.wzh = this.FbDataInternal.inCombat();
    }
    return this.wzh;
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
exports.FbCheckInCombat = FbCheckInCombat;
//# sourceMappingURL=FbCheckInCombat.js.map