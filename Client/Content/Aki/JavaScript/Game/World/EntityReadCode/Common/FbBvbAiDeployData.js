"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbBvbAiDeployData = void 0;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiDeployData {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.Cw1 = !1, this.pw1 = void 0, this.vw1 = !1, this.yw1 = void 0
  }
  static Create(t) {
    if (t) return new FbBvbAiDeployData(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get HandCard() {
    var t, e;
    return !this.Cw1 && (this.Cw1 = !0, t = this.FbDataInternal.handCardType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t)) && (this.pw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.handCard(e))), this.pw1
  }
  get BoardPos() {
    var t, e;
    return !this.vw1 && (this.vw1 = !0, t = this.FbDataInternal.boardPosType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t)) && (this.yw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.boardPos(e))), this.yw1
  }
}
exports.FbBvbAiDeployData = FbBvbAiDeployData;
//# sourceMappingURL=FbBvbAiDeployData.js.map