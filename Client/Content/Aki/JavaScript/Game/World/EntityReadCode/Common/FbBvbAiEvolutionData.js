"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBvbAiEvolutionData = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiEvolutionData {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.$w1 = false;
    this.Ww1 = undefined;
    this.Zw1 = false;
    this.eA1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBvbAiEvolutionData(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get HandCard() {
    var t;
    var i;
    if (!this.$w1 && (this.$w1 = true, t = this.FbDataInternal.handCardType(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.Ww1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.handCard(i));
    }
    return this.Ww1;
  }
  get BoardCard() {
    var t;
    var i;
    if (!this.Zw1 && (this.Zw1 = true, t = this.FbDataInternal.boardCardType(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.eA1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.boardCard(i));
    }
    return this.eA1;
  }
}
exports.FbBvbAiEvolutionData = FbBvbAiEvolutionData;
//# sourceMappingURL=FbBvbAiEvolutionData.js.map