"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCameraTransition = undefined;
class FbCameraTransition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.I_h = false;
    this.y6o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCameraTransition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
}
exports.FbCameraTransition = FbCameraTransition;
//# sourceMappingURL=FbCameraTransition.js.map