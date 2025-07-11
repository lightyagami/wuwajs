"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCustomAlertValueChangeSpeed = undefined;
class FbCustomAlertValueChangeSpeed {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ZSh = false;
    this.eMh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCustomAlertValueChangeSpeed(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CustomValue() {
    if (!this.ZSh) {
      this.ZSh = true;
      this.eMh = this.FbDataInternal.customValue();
    }
    return this.eMh;
  }
}
exports.FbCustomAlertValueChangeSpeed = FbCustomAlertValueChangeSpeed;
//# sourceMappingURL=FbCustomAlertValueChangeSpeed.js.map