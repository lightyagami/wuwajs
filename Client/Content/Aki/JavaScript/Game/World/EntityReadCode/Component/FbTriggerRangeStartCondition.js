"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTriggerRangeStartCondition = undefined;
class FbTriggerRangeStartCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.M_h = false;
    this.E_h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbTriggerRangeStartCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Range() {
    if (!this.M_h) {
      this.M_h = true;
      this.E_h = this.FbDataInternal.range();
    }
    return this.E_h;
  }
}
exports.FbTriggerRangeStartCondition = FbTriggerRangeStartCondition;
//# sourceMappingURL=FbTriggerRangeStartCondition.js.map