"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGravityFlipConfig = undefined;
class FbGravityFlipConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.bMh = false;
    this.LMh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbGravityFlipConfig(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get LocationEntityId() {
    if (!this.bMh) {
      this.bMh = true;
      this.LMh = this.FbDataInternal.locationEntityId();
    }
    return this.LMh;
  }
}
exports.FbGravityFlipConfig = FbGravityFlipConfig;
//# sourceMappingURL=FbGravityFlipConfig.js.map