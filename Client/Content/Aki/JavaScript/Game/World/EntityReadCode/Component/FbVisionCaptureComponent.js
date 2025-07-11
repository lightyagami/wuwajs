"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVisionCaptureComponent = undefined;
class FbVisionCaptureComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.uVh = false;
    this.dVh = 0;
    this.mVh = false;
    this.CVh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbVisionCaptureComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get VisionCaptureId() {
    if (!this.uVh) {
      this.uVh = true;
      this.dVh = this.FbDataInternal.visionCaptureId();
    }
    return this.dVh;
  }
  get VisionCaptureProb() {
    if (!this.mVh) {
      this.mVh = true;
      this.CVh = this.FbDataInternal.visionCaptureProb();
    }
    return this.CVh;
  }
}
exports.FbVisionCaptureComponent = FbVisionCaptureComponent;
//# sourceMappingURL=FbVisionCaptureComponent.js.map