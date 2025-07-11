"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckGameplayTagCondition = undefined;
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbCheckGameplayTagCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ldh = false;
    this.NHo = undefined;
    this.Rvh = false;
    this.wvh = undefined;
    this._ch = false;
    this.cch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckGameplayTagCondition(t);
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
    if (!this.ldh && (this.ldh = true, t = this.FbDataInternal.targetType(), i = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.NHo = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.target(i));
    }
    return this.NHo;
  }
  get GameplayTag() {
    if (!this.Rvh) {
      this.Rvh = true;
      this.wvh = this.FbDataInternal.gameplayTag();
    }
    return this.wvh;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
}
exports.FbCheckGameplayTagCondition = FbCheckGameplayTagCondition;
//# sourceMappingURL=FbCheckGameplayTagCondition.js.map