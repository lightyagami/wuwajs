"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCameraDepthOfField = undefined;
class FbCameraDepthOfField {
  constructor(t) {
    this.FbDataInternal = t;
    this.PTh = false;
    this.UTh = 0;
    this.rdh = false;
    this.odh = 0;
    this.DTh = false;
    this.BTh = 0;
    this.qTh = false;
    this.kTh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCameraDepthOfField(t);
    }
  }
  get Fstop() {
    if (!this.PTh) {
      this.PTh = true;
      this.UTh = this.FbDataInternal.fstop();
    }
    return this.UTh;
  }
  get Distance() {
    if (!this.rdh) {
      this.rdh = true;
      this.odh = this.FbDataInternal.distance();
    }
    return this.odh;
  }
  get BlurAmount() {
    if (!this.DTh) {
      this.DTh = true;
      this.BTh = this.FbDataInternal.blurAmount();
    }
    return this.BTh;
  }
  get BlurRadius() {
    if (!this.qTh) {
      this.qTh = true;
      this.kTh = this.FbDataInternal.blurRadius();
    }
    return this.kTh;
  }
}
exports.FbCameraDepthOfField = FbCameraDepthOfField;
//# sourceMappingURL=FbCameraDepthOfField.js.map