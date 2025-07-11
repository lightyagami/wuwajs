"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOpenConfirmBoxWithReturn = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbOpenConfirmBoxWithReturn {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.tgh = false;
    this.FFe = 0;
    this.mxh = false;
    this.Cxh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbOpenConfirmBoxWithReturn(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
  get ReturnVar() {
    var t;
    var e;
    if (!this.mxh && (this.mxh = true, t = this.FbDataInternal.returnVarType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.Cxh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.returnVar(e));
    }
    return this.Cxh;
  }
}
exports.FbOpenConfirmBoxWithReturn = FbOpenConfirmBoxWithReturn;
//# sourceMappingURL=FbOpenConfirmBoxWithReturn.js.map