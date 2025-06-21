"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbNextSlideRail = void 0;
class FbNextSlideRail {
  constructor(t) {
    this.FbDataInternal = t, this.t2c = !1, this.i2c = void 0, this.tv1 = !1, this.iv1 = 0, this.r2c = !1, this.o2c = !1
  }
  static Create(t) {
    if (t) return new FbNextSlideRail(t)
  }
  get TriggerKey() {
    return this.t2c || (this.t2c = !0, this.i2c = this.FbDataInternal.triggerKey()), this.i2c
  }
  get TargetRailEntityId() {
    return this.tv1 || (this.tv1 = !0, this.iv1 = this.FbDataInternal.targetRailEntityId()), this.iv1
  }
  get IsFallbackRail() {
    return this.r2c || (this.r2c = !0, this.o2c = this.FbDataInternal.isFallbackRail()), this.o2c
  }
}
exports.FbNextSlideRail = FbNextSlideRail;
//# sourceMappingURL=FbNextSlideRail.js.map