"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckFishingPointHasFish = undefined;
class FbCheckFishingPointHasFish {
  constructor(s) {
    this.FbDataInternal = s;
    this.u_h = false;
    this.f8o = undefined;
    this.$P_ = false;
    this.WP_ = false;
  }
  static Create(s) {
    if (s) {
      return new FbCheckFishingPointHasFish(s);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get HasFish() {
    if (!this.$P_) {
      this.$P_ = true;
      this.WP_ = this.FbDataInternal.hasFish();
    }
    return this.WP_;
  }
}
exports.FbCheckFishingPointHasFish = FbCheckFishingPointHasFish;
//# sourceMappingURL=FbCheckFishingPointHasFish.js.map