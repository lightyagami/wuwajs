"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareFishingBoatState = undefined;
class FbCompareFishingBoatState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Yzl = false;
    this.zzl = false;
    this._1_ = false;
    this.c1_ = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCompareFishingBoatState(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get IsStop() {
    if (!this.Yzl) {
      this.Yzl = true;
      this.zzl = this.FbDataInternal.isStop();
    }
    return this.zzl;
  }
  get FishingPort() {
    if (!this._1_) {
      this._1_ = true;
      this.c1_ = this.FbDataInternal.fishingPort();
    }
    return this.c1_;
  }
}
exports.FbCompareFishingBoatState = FbCompareFishingBoatState;
//# sourceMappingURL=FbCompareFishingBoatState.js.map