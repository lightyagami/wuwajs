"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFlowTemplateMode = undefined;
class FbFlowTemplateMode {
  constructor(t) {
    this.FbDataInternal = t;
    this.tgh = false;
    this.FFe = 0;
    this.efh = false;
    this.tfh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbFlowTemplateMode(t);
    }
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
  get CameraId() {
    if (!this.efh) {
      this.efh = true;
      this.tfh = this.FbDataInternal.cameraId();
    }
    return this.tfh;
  }
}
exports.FbFlowTemplateMode = FbFlowTemplateMode;
//# sourceMappingURL=FbFlowTemplateMode.js.map