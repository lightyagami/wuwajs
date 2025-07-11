"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBvbAiGetBestSwapData = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiGetBestSwapData {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.nA1 = false;
    this.sA1 = undefined;
    this.aA1 = false;
    this.hA1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBvbAiGetBestSwapData(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get HandCard1Stored() {
    var t;
    var e;
    if (!this.nA1 && (this.nA1 = true, t = this.FbDataInternal.handCard1StoredType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.sA1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.handCard1Stored(e));
    }
    return this.sA1;
  }
  get HandCard2Stored() {
    var t;
    var e;
    if (!this.aA1 && (this.aA1 = true, t = this.FbDataInternal.handCard2StoredType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.hA1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.handCard2Stored(e));
    }
    return this.hA1;
  }
}
exports.FbBvbAiGetBestSwapData = FbBvbAiGetBestSwapData;
//# sourceMappingURL=FbBvbAiGetBestSwapData.js.map