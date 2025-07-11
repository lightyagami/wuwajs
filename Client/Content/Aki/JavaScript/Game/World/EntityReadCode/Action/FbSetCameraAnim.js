"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetCameraAnim = undefined;
class FbSetCameraAnim {
  constructor(t) {
    this.FbDataInternal = t;
    this.ifh = false;
    this.rfh = undefined;
    this.qmh = false;
    this.H8o = 0;
    this.ofh = false;
    this.nfh = false;
  }
  static Create(t) {
    if (t) {
      return new FbSetCameraAnim(t);
    }
  }
  get CameraAnimDataAsset() {
    if (!this.ifh) {
      this.ifh = true;
      this.rfh = this.FbDataInternal.cameraAnimDataAsset();
    }
    return this.rfh;
  }
  get Speed() {
    if (!this.qmh) {
      this.qmh = true;
      this.H8o = this.FbDataInternal.speed();
    }
    return this.H8o;
  }
  get UseNoise() {
    if (!this.ofh) {
      this.ofh = true;
      this.nfh = this.FbDataInternal.useNoise();
    }
    return this.nfh;
  }
}
exports.FbSetCameraAnim = FbSetCameraAnim;
//# sourceMappingURL=FbSetCameraAnim.js.map