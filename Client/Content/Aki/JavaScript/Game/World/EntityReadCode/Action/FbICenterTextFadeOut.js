"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbICenterTextFadeOut = undefined;
class FbICenterTextFadeOut {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.mch = false;
    this.Cch = 0;
    this.pch = false;
    this.vch = 0;
  }
  static Create(t) {
    if (t) {
      return new FbICenterTextFadeOut(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get FadeInTime() {
    if (!this.mch) {
      this.mch = true;
      this.Cch = this.FbDataInternal.fadeInTime();
    }
    return this.Cch;
  }
  get FadeOutTime() {
    if (!this.pch) {
      this.pch = true;
      this.vch = this.FbDataInternal.fadeOutTime();
    }
    return this.vch;
  }
}
exports.FbICenterTextFadeOut = FbICenterTextFadeOut;
//# sourceMappingURL=FbICenterTextFadeOut.js.map