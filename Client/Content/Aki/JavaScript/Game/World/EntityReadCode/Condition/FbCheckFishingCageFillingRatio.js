"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckFishingCageFillingRatio = undefined;
class FbCheckFishingCageFillingRatio {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.jP_ = false;
    this.HP_ = 0;
  }
  static Create(i) {
    if (i) {
      return new FbCheckFishingCageFillingRatio(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get Ratio() {
    if (!this.jP_) {
      this.jP_ = true;
      this.HP_ = this.FbDataInternal.ratio();
    }
    return this.HP_;
  }
}
exports.FbCheckFishingCageFillingRatio = FbCheckFishingCageFillingRatio;
//# sourceMappingURL=FbCheckFishingCageFillingRatio.js.map