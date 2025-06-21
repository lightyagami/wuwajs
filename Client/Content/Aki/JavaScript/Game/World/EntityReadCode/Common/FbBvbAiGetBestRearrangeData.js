"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbBvbAiGetBestRearrangeData = void 0;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiGetBestRearrangeData {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.Rw1 = !1, this.Lw1 = void 0, this.ww1 = !1, this.Aw1 = void 0
  }
  static Create(t) {
    if (t) return new FbBvbAiGetBestRearrangeData(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get HandCardStored() {
    var t, e;
    return !this.Rw1 && (this.Rw1 = !0, t = this.FbDataInternal.handCardStoredType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t)) && (this.Lw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.handCardStored(e))), this.Lw1
  }
  get BoardPosStored() {
    var t, e;
    return !this.ww1 && (this.ww1 = !0, t = this.FbDataInternal.boardPosStoredType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t)) && (this.Aw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.boardPosStored(e))), this.Aw1
  }
}
exports.FbBvbAiGetBestRearrangeData = FbBvbAiGetBestRearrangeData;
//# sourceMappingURL=FbBvbAiGetBestRearrangeData.js.map