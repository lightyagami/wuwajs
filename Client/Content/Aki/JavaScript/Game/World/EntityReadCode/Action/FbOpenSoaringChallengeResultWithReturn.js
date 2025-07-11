"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOpenSoaringChallengeResultWithReturn = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbOpenSoaringChallengeResultWithReturn {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.gxh = false;
    this.fxh = undefined;
    this.pxh = false;
    this.vxh = 0;
    this.yxh = false;
    this.Sxh = 0;
    this.Mxh = false;
    this.Exh = 0;
    this.mxh = false;
    this.Cxh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbOpenSoaringChallengeResultWithReturn(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Score() {
    var t;
    var i;
    if (!this.gxh && (this.gxh = true, t = this.FbDataInternal.scoreType(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.fxh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.score(i));
    }
    return this.fxh;
  }
  get RankS() {
    if (!this.pxh) {
      this.pxh = true;
      this.vxh = this.FbDataInternal.rankS();
    }
    return this.vxh;
  }
  get RankA() {
    if (!this.yxh) {
      this.yxh = true;
      this.Sxh = this.FbDataInternal.rankA();
    }
    return this.Sxh;
  }
  get RankB() {
    if (!this.Mxh) {
      this.Mxh = true;
      this.Exh = this.FbDataInternal.rankB();
    }
    return this.Exh;
  }
  get ReturnVar() {
    var t;
    var i;
    if (!this.mxh && (this.mxh = true, t = this.FbDataInternal.returnVarType(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.Cxh = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.returnVar(i));
    }
    return this.Cxh;
  }
}
exports.FbOpenSoaringChallengeResultWithReturn = FbOpenSoaringChallengeResultWithReturn;
//# sourceMappingURL=FbOpenSoaringChallengeResultWithReturn.js.map