"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCalculateVar = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbCalculateVar {
  constructor(t) {
    this.FbDataInternal = t;
    this.H1h = false;
    this.W1h = undefined;
    this.Q1h = false;
    this.K1h = undefined;
    this.$1h = false;
    this.X1h = undefined;
    this.Y1h = false;
    this.z1h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCalculateVar(t);
    }
  }
  get Var1() {
    var t;
    var e;
    if (!this.H1h && (this.H1h = true, t = this.FbDataInternal.var1Type(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.W1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.var1(e));
    }
    return this.W1h;
  }
  get Op() {
    if (!this.Q1h) {
      this.Q1h = true;
      this.K1h = this.FbDataInternal.op();
    }
    return this.K1h;
  }
  get Var2() {
    var t;
    var e;
    if (!this.$1h && (this.$1h = true, t = this.FbDataInternal.var2Type(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.X1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.var2(e));
    }
    return this.X1h;
  }
  get Result() {
    var t;
    var e;
    if (!this.Y1h && (this.Y1h = true, t = this.FbDataInternal.resultType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.z1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.result(e));
    }
    return this.z1h;
  }
}
exports.FbCalculateVar = FbCalculateVar;
//# sourceMappingURL=FbCalculateVar.js.map