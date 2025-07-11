"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDoCalculate = undefined;
const UnionVarHelper_1 = require("./UnionVarHelper");
class FbDoCalculate {
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
      return new FbDoCalculate(t);
    }
  }
  get Var1() {
    var t;
    var i;
    if (!this.H1h && (this.H1h = true, t = this.FbDataInternal.var1Type(), i = UnionVarHelper_1.UnionVarHelper.GetUnionVarObject(t))) {
      this.W1h = UnionVarHelper_1.UnionVarHelper.ReadUnionVar(t, this.FbDataInternal.var1(i));
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
    var i;
    if (!this.$1h && (this.$1h = true, t = this.FbDataInternal.var2Type(), i = UnionVarHelper_1.UnionVarHelper.GetUnionVarObject(t))) {
      this.X1h = UnionVarHelper_1.UnionVarHelper.ReadUnionVar(t, this.FbDataInternal.var2(i));
    }
    return this.X1h;
  }
  get Result() {
    if (!this.Y1h) {
      this.Y1h = true;
      this.z1h = this.FbDataInternal.result();
    }
    return this.z1h;
  }
}
exports.FbDoCalculate = FbDoCalculate;
//# sourceMappingURL=FbDoCalculate.js.map