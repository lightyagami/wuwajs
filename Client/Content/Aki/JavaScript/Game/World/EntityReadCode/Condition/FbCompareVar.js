"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareVar = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbCompareVar {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.H1h = false;
    this.W1h = undefined;
    this.$1h = false;
    this.X1h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCompareVar(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get Var1() {
    var t;
    var i;
    if (!this.H1h && (this.H1h = true, t = this.FbDataInternal.var1Type(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.W1h = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.var1(i));
    }
    return this.W1h;
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
exports.FbCompareVar = FbCompareVar;
//# sourceMappingURL=FbCompareVar.js.map