"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCameraSetting = undefined;
class FbCameraSetting {
  constructor(t) {
    this.FbDataInternal = t;
    this.yfh = false;
    this.Sfh = 0;
    this.Mfh = false;
    this.Efh = 0;
    this.Ifh = false;
    this.Tfh = 0;
    this.bfh = false;
    this.Lfh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCameraSetting(t);
    }
  }
  get Aperture() {
    if (!this.yfh) {
      this.yfh = true;
      this.Sfh = this.FbDataInternal.aperture();
    }
    return this.Sfh;
  }
  get FocalLength() {
    if (!this.Mfh) {
      this.Mfh = true;
      this.Efh = this.FbDataInternal.focalLength();
    }
    return this.Efh;
  }
  get FocusDistance() {
    if (!this.Ifh) {
      this.Ifh = true;
      this.Tfh = this.FbDataInternal.focusDistance();
    }
    return this.Tfh;
  }
  get FocalRegion() {
    if (!this.bfh) {
      this.bfh = true;
      this.Lfh = this.FbDataInternal.focalRegion();
    }
    return this.Lfh;
  }
}
exports.FbCameraSetting = FbCameraSetting;
//# sourceMappingURL=FbCameraSetting.js.map