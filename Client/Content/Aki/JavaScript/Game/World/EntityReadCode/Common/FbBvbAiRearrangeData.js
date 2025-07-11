"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBvbAiRearrangeData = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiRearrangeData {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Zw1 = false;
    this.eA1 = undefined;
    this.Qw1 = false;
    this.Kw1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBvbAiRearrangeData(t);
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
    var t;
    var e;
    if (!this.Zw1 && (this.Zw1 = true, t = this.FbDataInternal.boardCardType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.eA1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.boardCard(e));
    }
    return this.eA1;
  }
  get BoardPos() {
    var t;
    var e;
    if (!this.Qw1 && (this.Qw1 = true, t = this.FbDataInternal.boardPosType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.Kw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.boardPos(e));
    }
    return this.Kw1;
  }
}
exports.FbBvbAiRearrangeData = FbBvbAiRearrangeData;
//# sourceMappingURL=FbBvbAiRearrangeData.js.map