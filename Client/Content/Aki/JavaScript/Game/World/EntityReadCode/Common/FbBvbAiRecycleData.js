"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbBvbAiRecycleData = void 0;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiRecycleData {
  constructor(e) {
    this.FbDataInternal = e, this.u_h = !1, this.f8o = void 0, this.Tw1 = !1, this.bw1 = void 0
  }
  static Create(e) {
    if (e) return new FbBvbAiRecycleData(e)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get BoardCard() {
    var e, t;
    return !this.Tw1 && (this.Tw1 = !0, e = this.FbDataInternal.boardCardType(), t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(e)) && (this.bw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(e, this.FbDataInternal.boardCard(t))), this.bw1
  }
}
exports.FbBvbAiRecycleData = FbBvbAiRecycleData;
//# sourceMappingURL=FbBvbAiRecycleData.js.map