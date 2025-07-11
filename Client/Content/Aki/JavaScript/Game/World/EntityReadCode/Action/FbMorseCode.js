"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMorseCode = undefined;
class FbMorseCode {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.BIh = false;
    this.qIh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMorseCode(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MorseCodeId() {
    if (!this.BIh) {
      this.BIh = true;
      this.qIh = this.FbDataInternal.morseCodeId();
    }
    return this.qIh;
  }
}
exports.FbMorseCode = FbMorseCode;
//# sourceMappingURL=FbMorseCode.js.map