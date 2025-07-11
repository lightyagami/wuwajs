"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMaxAlertValue = undefined;
class FbMaxAlertValue {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMaxAlertValue(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
}
exports.FbMaxAlertValue = FbMaxAlertValue;
//# sourceMappingURL=FbMaxAlertValue.js.map