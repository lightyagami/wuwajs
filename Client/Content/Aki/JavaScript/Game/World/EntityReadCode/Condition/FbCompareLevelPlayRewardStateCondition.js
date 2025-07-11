"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareLevelPlayRewardStateCondition = undefined;
class FbCompareLevelPlayRewardStateCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCompareLevelPlayRewardStateCondition(t);
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
}
exports.FbCompareLevelPlayRewardStateCondition = FbCompareLevelPlayRewardStateCondition;
//# sourceMappingURL=FbCompareLevelPlayRewardStateCondition.js.map