"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetCameraMode = undefined;
class FbSetCameraMode {
  constructor(t) {
    this.FbDataInternal = t;
    this.Lmh = false;
    this.NMr = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetCameraMode(t);
    }
  }
  get Mode() {
    if (!this.Lmh) {
      this.Lmh = true;
      this.NMr = this.FbDataInternal.mode();
    }
    return this.NMr;
  }
}
exports.FbSetCameraMode = FbSetCameraMode;
//# sourceMappingURL=FbSetCameraMode.js.map