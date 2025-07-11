"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCondition = undefined;
const UnionVarHelper_1 = require("./UnionVarHelper");
class FbCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.H1h = false;
    this.W1h = undefined;
    this.$1h = false;
    this.X1h = undefined;
    this._ch = false;
    this.cch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCondition(t);
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
  get Var2() {
    var t;
    var i;
    if (!this.$1h && (this.$1h = true, t = this.FbDataInternal.var2Type(), i = UnionVarHelper_1.UnionVarHelper.GetUnionVarObject(t))) {
      this.X1h = UnionVarHelper_1.UnionVarHelper.ReadUnionVar(t, this.FbDataInternal.var2(i));
    }
    return this.X1h;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
}
exports.FbCondition = FbCondition;
//# sourceMappingURL=FbCondition.js.map