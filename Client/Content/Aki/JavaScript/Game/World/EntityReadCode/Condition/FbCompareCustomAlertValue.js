"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareCustomAlertValue = undefined;
class FbCompareCustomAlertValue {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.KJh = false;
    this.$Jh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCompareCustomAlertValue(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CompareValue() {
    if (!this.KJh) {
      this.KJh = true;
      this.$Jh = this.FbDataInternal.compareValue();
    }
    return this.$Jh;
  }
}
exports.FbCompareCustomAlertValue = FbCompareCustomAlertValue;
//# sourceMappingURL=FbCompareCustomAlertValue.js.map