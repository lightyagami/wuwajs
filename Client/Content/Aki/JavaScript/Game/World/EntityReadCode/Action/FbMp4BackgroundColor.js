"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMp4BackgroundColor = undefined;
class FbMp4BackgroundColor {
  constructor(t) {
    this.FbDataInternal = t;
    this._Lh = false;
    this.cLh = undefined;
    this.uLh = false;
    this.dLh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbMp4BackgroundColor(t);
    }
  }
  get FadeIn() {
    if (!this._Lh) {
      this._Lh = true;
      this.cLh = this.FbDataInternal.fadeIn();
    }
    return this.cLh;
  }
  get FadeOut() {
    if (!this.uLh) {
      this.uLh = true;
      this.dLh = this.FbDataInternal.fadeOut();
    }
    return this.dLh;
  }
}
exports.FbMp4BackgroundColor = FbMp4BackgroundColor;
//# sourceMappingURL=FbMp4BackgroundColor.js.map