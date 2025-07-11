"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBvbAiChangeData = undefined;
const UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbBvbAiChangeData {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.$w1 = false;
    this.Ww1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBvbAiChangeData(t);
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
    var e;
    if (!this.$w1 && (this.$w1 = true, t = this.FbDataInternal.handCardType(), e = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) {
      this.Ww1 = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(t, this.FbDataInternal.handCard(e));
    }
    return this.Ww1;
  }
}
exports.FbBvbAiChangeData = FbBvbAiChangeData;
//# sourceMappingURL=FbBvbAiChangeData.js.map