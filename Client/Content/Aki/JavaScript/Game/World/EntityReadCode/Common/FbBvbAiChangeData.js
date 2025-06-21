"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbBvbAiChangeData = void 0;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiChangeData {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.Cw1 = !1, this.pw1 = void 0
  }
  static Create(t) {
    if (t) return new FbBvbAiChangeData(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get HandCard() {
    var t, e;
    return !this.Cw1 && (this.Cw1 = !0, t = this.FbDataInternal.handCardType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t)) && (this.pw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.handCard(e))), this.pw1
  }
}
exports.FbBvbAiChangeData = FbBvbAiChangeData;
//# sourceMappingURL=FbBvbAiChangeData.js.map