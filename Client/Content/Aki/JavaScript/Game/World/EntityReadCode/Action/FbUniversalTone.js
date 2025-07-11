"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbUniversalTone = undefined;
class FbUniversalTone {
  constructor(t) {
    this.FbDataInternal = t;
    this.Zfh = false;
    this.eph = 0;
    this.tph = false;
    this.iph = 0;
  }
  static Create(t) {
    if (t) {
      return new FbUniversalTone(t);
    }
  }
  get UniversalToneId() {
    if (!this.Zfh) {
      this.Zfh = true;
      this.eph = this.FbDataInternal.universalToneId();
    }
    return this.eph;
  }
  get TimberId() {
    if (!this.tph) {
      this.tph = true;
      this.iph = this.FbDataInternal.timberId();
    }
    return this.iph;
  }
}
exports.FbUniversalTone = FbUniversalTone;
//# sourceMappingURL=FbUniversalTone.js.map