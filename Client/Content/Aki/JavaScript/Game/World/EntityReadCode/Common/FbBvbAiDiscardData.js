"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbBvbAiDiscardData = void 0;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiDiscardData {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.Sw1 = !1, this.Mw1 = void 0, this.Ew1 = !1, this.Iw1 = void 0
  }
  static Create(t) {
    if (t) return new FbBvbAiDiscardData(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get ReserveHandCard() {
    var t, i;
    return !this.Sw1 && (this.Sw1 = !0, t = this.FbDataInternal.reserveHandCardType(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t)) && (this.Mw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.reserveHandCard(i))), this.Mw1
  }
  get Strategy() {
    return this.Ew1 || (this.Ew1 = !0, this.Iw1 = this.FbDataInternal.strategy()), this.Iw1
  }
}
exports.FbBvbAiDiscardData = FbBvbAiDiscardData;
//# sourceMappingURL=FbBvbAiDiscardData.js.map