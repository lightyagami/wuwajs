"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAxisLockScreenConfig = undefined;
class FbAxisLockScreenConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.hTh = false;
    this.lTh = 0;
    this.mch = false;
    this.Cch = 0;
    this.pch = false;
    this.vch = 0;
  }
  static Create(t) {
    if (t) {
      return new FbAxisLockScreenConfig(t);
    }
  }
  get TriggerAngle() {
    if (!this.hTh) {
      this.hTh = true;
      this.lTh = this.FbDataInternal.triggerAngle();
    }
    return this.lTh;
  }
  get FadeInTime() {
    if (!this.mch) {
      this.mch = true;
      this.Cch = this.FbDataInternal.fadeInTime();
    }
    return this.Cch;
  }
  get FadeOutTime() {
    if (!this.pch) {
      this.pch = true;
      this.vch = this.FbDataInternal.fadeOutTime();
    }
    return this.vch;
  }
}
exports.FbAxisLockScreenConfig = FbAxisLockScreenConfig;
//# sourceMappingURL=FbAxisLockScreenConfig.js.map