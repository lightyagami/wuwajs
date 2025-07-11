"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbOptionLockTip = undefined;
class FbOptionLockTip {
  constructor(t) {
    this.FbDataInternal = t;
    this.Y_h = false;
    this.z_h = undefined;
    this.J_h = false;
    this.Z_h = undefined;
    this.ric = false;
    this.oic = 0;
    this.nic = false;
    this.sic = 0;
  }
  static Create(t) {
    if (t) {
      return new FbOptionLockTip(t);
    }
  }
  get TidAppendText() {
    if (!this.Y_h) {
      this.Y_h = true;
      this.z_h = this.FbDataInternal.tidAppendText();
    }
    return this.z_h;
  }
  get TidHintText() {
    if (!this.J_h) {
      this.J_h = true;
      this.Z_h = this.FbDataInternal.tidHintText();
    }
    return this.Z_h;
  }
  get AppendTextId() {
    if (!this.ric) {
      this.ric = true;
      this.oic = this.FbDataInternal.appendTextId();
    }
    return this.oic;
  }
  get HintTextId() {
    if (!this.nic) {
      this.nic = true;
      this.sic = this.FbDataInternal.hintTextId();
    }
    return this.sic;
  }
}
exports.FbOptionLockTip = FbOptionLockTip;
//# sourceMappingURL=FbOptionLockTip.js.map