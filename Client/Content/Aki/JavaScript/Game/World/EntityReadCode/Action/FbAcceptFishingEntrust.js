"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAcceptFishingEntrust = undefined;
class FbAcceptFishingEntrust {
  constructor(t) {
    this.FbDataInternal = t;
    this.o1_ = false;
    this.n1_ = 0;
    this.s1_ = false;
    this.a1_ = false;
  }
  static Create(t) {
    if (t) {
      return new FbAcceptFishingEntrust(t);
    }
  }
  get EntrustId() {
    if (!this.o1_) {
      this.o1_ = true;
      this.n1_ = this.FbDataInternal.entrustId();
    }
    return this.n1_;
  }
  get IsAutoTracking() {
    if (!this.s1_) {
      this.s1_ = true;
      this.a1_ = this.FbDataInternal.isAutoTracking();
    }
    return this.a1_;
  }
}
exports.FbAcceptFishingEntrust = FbAcceptFishingEntrust;
//# sourceMappingURL=FbAcceptFishingEntrust.js.map