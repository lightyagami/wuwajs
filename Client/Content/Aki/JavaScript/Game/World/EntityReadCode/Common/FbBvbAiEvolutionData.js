"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbBvbAiEvolutionData = void 0;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiEvolutionData {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.Cw1 = !1, this.pw1 = void 0, this.Tw1 = !1, this.bw1 = void 0
  }
  static Create(t) {
    if (t) return new FbBvbAiEvolutionData(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get HandCard() {
    var t, i;
    return !this.Cw1 && (this.Cw1 = !0, t = this.FbDataInternal.handCardType(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t)) && (this.pw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.handCard(i))), this.pw1
  }
  get BoardCard() {
    var t, i;
    return !this.Tw1 && (this.Tw1 = !0, t = this.FbDataInternal.boardCardType(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t)) && (this.bw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.boardCard(i))), this.bw1
  }
}
exports.FbBvbAiEvolutionData = FbBvbAiEvolutionData;
//# sourceMappingURL=FbBvbAiEvolutionData.js.map