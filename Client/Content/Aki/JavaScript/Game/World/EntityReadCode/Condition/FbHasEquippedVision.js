"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHasEquippedVision = undefined;
class FbHasEquippedVision {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.s_h = false;
    this.Hye = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHasEquippedVision(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Option() {
    if (!this.s_h) {
      this.s_h = true;
      this.Hye = this.FbDataInternal.option();
    }
    return this.Hye;
  }
}
exports.FbHasEquippedVision = FbHasEquippedVision;
//# sourceMappingURL=FbHasEquippedVision.js.map