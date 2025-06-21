"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbBvbAiGetBestSwapData = void 0;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiGetBestSwapData {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.Pw1 = !1, this.xw1 = void 0, this.Dw1 = !1, this.Uw1 = void 0
  }
  static Create(t) {
    if (t) return new FbBvbAiGetBestSwapData(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get HandCard1Stored() {
    var t, e;
    return !this.Pw1 && (this.Pw1 = !0, t = this.FbDataInternal.handCard1StoredType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t)) && (this.xw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.handCard1Stored(e))), this.xw1
  }
  get HandCard2Stored() {
    var t, e;
    return !this.Dw1 && (this.Dw1 = !0, t = this.FbDataInternal.handCard2StoredType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t)) && (this.Uw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.handCard2Stored(e))), this.Uw1
  }
}
exports.FbBvbAiGetBestSwapData = FbBvbAiGetBestSwapData;
//# sourceMappingURL=FbBvbAiGetBestSwapData.js.map