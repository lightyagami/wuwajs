"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBvbAiDiscardData = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiDiscardData {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Xw1 = false;
    this.Yw1 = undefined;
    this.zw1 = false;
    this.Jw1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBvbAiDiscardData(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ReserveHandCard() {
    var t;
    var i;
    if (!this.Xw1 && (this.Xw1 = true, t = this.FbDataInternal.reserveHandCardType(), i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.Yw1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.reserveHandCard(i));
    }
    return this.Yw1;
  }
  get Strategy() {
    if (!this.zw1) {
      this.zw1 = true;
      this.Jw1 = this.FbDataInternal.strategy();
    }
    return this.Jw1;
  }
}
exports.FbBvbAiDiscardData = FbBvbAiDiscardData;
//# sourceMappingURL=FbBvbAiDiscardData.js.map