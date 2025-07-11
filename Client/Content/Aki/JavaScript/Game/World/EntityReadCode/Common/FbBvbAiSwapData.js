"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBvbAiSwapData = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiSwapData {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.lA1 = false;
    this._A1 = undefined;
    this.uA1 = false;
    this.cA1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBvbAiSwapData(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get BoardCard1() {
    var t;
    var i;
    if (!this.lA1 && (this.lA1 = true, t = this.FbDataInternal.boardCard1Type(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this._A1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.boardCard1(i));
    }
    return this._A1;
  }
  get BoardCard2() {
    var t;
    var i;
    if (!this.uA1 && (this.uA1 = true, t = this.FbDataInternal.boardCard2Type(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.cA1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.boardCard2(i));
    }
    return this.cA1;
  }
}
exports.FbBvbAiSwapData = FbBvbAiSwapData;
//# sourceMappingURL=FbBvbAiSwapData.js.map