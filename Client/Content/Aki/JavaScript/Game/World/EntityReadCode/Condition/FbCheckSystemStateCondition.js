"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckSystemStateCondition = undefined;
const UnionCheckSystemStateHelper_1 = require("./UnionCheckSystemStateHelper");
class FbCheckSystemStateCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.bSh = false;
    this.TAe = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckSystemStateCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Config() {
    var t;
    var e;
    if (!this.bSh && (this.bSh = true, t = this.FbDataInternal.configType(), e = UnionCheckSystemStateHelper_1.UnionCheckSystemStateHelper.GetUnionCheckSystemStateObject(t))) {
      this.TAe = UnionCheckSystemStateHelper_1.UnionCheckSystemStateHelper.ReadUnionCheckSystemState(t, this.FbDataInternal.config(e));
    }
    return this.TAe;
  }
}
exports.FbCheckSystemStateCondition = FbCheckSystemStateCondition;
//# sourceMappingURL=FbCheckSystemStateCondition.js.map