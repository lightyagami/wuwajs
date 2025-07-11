"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBvbAiGetBestRearrangeData = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiGetBestRearrangeData {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.tA1 = false;
    this.iA1 = undefined;
    this.rA1 = false;
    this.oA1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBvbAiGetBestRearrangeData(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get HandCardStored() {
    var t;
    var e;
    if (!this.tA1 && (this.tA1 = true, t = this.FbDataInternal.handCardStoredType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.iA1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.handCardStored(e));
    }
    return this.iA1;
  }
  get BoardPosStored() {
    var t;
    var e;
    if (!this.rA1 && (this.rA1 = true, t = this.FbDataInternal.boardPosStoredType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.oA1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.boardPosStored(e));
    }
    return this.oA1;
  }
}
exports.FbBvbAiGetBestRearrangeData = FbBvbAiGetBestRearrangeData;
//# sourceMappingURL=FbBvbAiGetBestRearrangeData.js.map