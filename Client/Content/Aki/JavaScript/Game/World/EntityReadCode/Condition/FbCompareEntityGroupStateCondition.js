"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareEntityGroupStateCondition = undefined;
const FbEntityGroupCondition_1 = require("./FbEntityGroupCondition");
class FbCompareEntityGroupStateCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.MVh = false;
    this.EVh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCompareEntityGroupStateCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get GroupCondition() {
    if (!this.MVh) {
      this.MVh = true;
      this.EVh = FbEntityGroupCondition_1.FbEntityGroupCondition.Create(this.FbDataInternal.groupCondition());
    }
    return this.EVh;
  }
}
exports.FbCompareEntityGroupStateCondition = FbCompareEntityGroupStateCondition;
//# sourceMappingURL=FbCompareEntityGroupStateCondition.js.map