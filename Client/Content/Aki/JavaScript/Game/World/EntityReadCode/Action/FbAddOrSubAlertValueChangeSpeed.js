"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAddOrSubAlertValueChangeSpeed = undefined;
class FbAddOrSubAlertValueChangeSpeed {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.zSh = false;
    this.JSh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbAddOrSubAlertValueChangeSpeed(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get DeltaValue() {
    if (!this.zSh) {
      this.zSh = true;
      this.JSh = this.FbDataInternal.deltaValue();
    }
    return this.JSh;
  }
}
exports.FbAddOrSubAlertValueChangeSpeed = FbAddOrSubAlertValueChangeSpeed;
//# sourceMappingURL=FbAddOrSubAlertValueChangeSpeed.js.map