"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChargeSlashControl = undefined;
class FbChargeSlashControl {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.$u1 = false;
    this.Wu1 = 0;
    this.Qu1 = false;
    this.Ku1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChargeSlashControl(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get UpHeight() {
    if (!this.$u1) {
      this.$u1 = true;
      this.Wu1 = this.FbDataInternal.upHeight();
    }
    return this.Wu1;
  }
  get UpCurvePath() {
    if (!this.Qu1) {
      this.Qu1 = true;
      this.Ku1 = this.FbDataInternal.upCurvePath();
    }
    return this.Ku1;
  }
}
exports.FbChargeSlashControl = FbChargeSlashControl;
//# sourceMappingURL=FbChargeSlashControl.js.map