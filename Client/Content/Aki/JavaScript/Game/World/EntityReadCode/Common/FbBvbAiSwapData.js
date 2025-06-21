"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbBvbAiSwapData = void 0;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiSwapData {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.Bw1 = !1, this.kw1 = void 0, this.Ow1 = !1, this.qw1 = void 0
  }
  static Create(t) {
    if (t) return new FbBvbAiSwapData(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get BoardCard1() {
    var t, i;
    return !this.Bw1 && (this.Bw1 = !0, t = this.FbDataInternal.boardCard1Type(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t)) && (this.kw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.boardCard1(i))), this.kw1
  }
  get BoardCard2() {
    var t, i;
    return !this.Ow1 && (this.Ow1 = !0, t = this.FbDataInternal.boardCard2Type(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t)) && (this.qw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.boardCard2(i))), this.qw1
  }
}
exports.FbBvbAiSwapData = FbBvbAiSwapData;
//# sourceMappingURL=FbBvbAiSwapData.js.map