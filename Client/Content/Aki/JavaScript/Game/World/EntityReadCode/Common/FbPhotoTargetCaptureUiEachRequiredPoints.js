"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPhotoTargetCaptureUiEachRequiredPoints = undefined;
class FbPhotoTargetCaptureUiEachRequiredPoints {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPhotoTargetCaptureUiEachRequiredPoints(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
}
exports.FbPhotoTargetCaptureUiEachRequiredPoints = FbPhotoTargetCaptureUiEachRequiredPoints;
//# sourceMappingURL=FbPhotoTargetCaptureUiEachRequiredPoints.js.map