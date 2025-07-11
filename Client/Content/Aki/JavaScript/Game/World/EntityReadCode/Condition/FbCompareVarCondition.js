"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareVarCondition = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbCompareVarCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.H1h = false;
    this.W1h = undefined;
    this._ch = false;
    this.cch = undefined;
    this.$1h = false;
    this.X1h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCompareVarCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Var1() {
    var t;
    var i;
    if (!this.H1h && (this.H1h = true, t = this.FbDataInternal.var1Type(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.W1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.var1(i));
    }
    return this.W1h;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get Var2() {
    var t;
    var i;
    if (!this.$1h && (this.$1h = true, t = this.FbDataInternal.var2Type(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.X1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.var2(i));
    }
    return this.X1h;
  }
}
exports.FbCompareVarCondition = FbCompareVarCondition;
//# sourceMappingURL=FbCompareVarCondition.js.map