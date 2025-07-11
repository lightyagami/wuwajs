"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNextSlideRail = undefined;
class FbNextSlideRail {
  constructor(t) {
    this.FbDataInternal = t;
    this.t2c = false;
    this.i2c = undefined;
    this.Iv1 = false;
    this.Tv1 = 0;
    this.r2c = false;
    this.o2c = false;
  }
  static Create(t) {
    if (t) {
      return new FbNextSlideRail(t);
    }
  }
  get TriggerKey() {
    if (!this.t2c) {
      this.t2c = true;
      this.i2c = this.FbDataInternal.triggerKey();
    }
    return this.i2c;
  }
  get TargetRailEntityId() {
    if (!this.Iv1) {
      this.Iv1 = true;
      this.Tv1 = this.FbDataInternal.targetRailEntityId();
    }
    return this.Tv1;
  }
  get IsFallbackRail() {
    if (!this.r2c) {
      this.r2c = true;
      this.o2c = this.FbDataInternal.isFallbackRail();
    }
    return this.o2c;
  }
}
exports.FbNextSlideRail = FbNextSlideRail;
//# sourceMappingURL=FbNextSlideRail.js.map