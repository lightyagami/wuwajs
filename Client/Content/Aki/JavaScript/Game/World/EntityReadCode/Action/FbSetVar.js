"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetVar = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbSetVar {
  constructor(e) {
    this.FbDataInternal = e;
    this.cCh = false;
    this.uCh = undefined;
    this.dCh = false;
    this.mCh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbSetVar(e);
    }
  }
  get VarLeft() {
    var e;
    var t;
    if (!this.cCh && (this.cCh = true, e = this.FbDataInternal.varLeftType(), t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(e))) {
      this.uCh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(e, this.FbDataInternal.varLeft(t));
    }
    return this.uCh;
  }
  get VarRight() {
    var e;
    var t;
    if (!this.dCh && (this.dCh = true, e = this.FbDataInternal.varRightType(), t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(e))) {
      this.mCh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(e, this.FbDataInternal.varRight(t));
    }
    return this.mCh;
  }
}
exports.FbSetVar = FbSetVar;
//# sourceMappingURL=FbSetVar.js.map