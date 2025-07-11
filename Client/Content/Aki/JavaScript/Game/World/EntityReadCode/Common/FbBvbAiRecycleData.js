"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBvbAiRecycleData = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiRecycleData {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.Zw1 = false;
    this.eA1 = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbBvbAiRecycleData(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BoardCard() {
    var e;
    var t;
    if (!this.Zw1 && (this.Zw1 = true, e = this.FbDataInternal.boardCardType(), t = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(e))) {
      this.eA1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(e, this.FbDataInternal.boardCard(t));
    }
    return this.eA1;
  }
}
exports.FbBvbAiRecycleData = FbBvbAiRecycleData;
//# sourceMappingURL=FbBvbAiRecycleData.js.map