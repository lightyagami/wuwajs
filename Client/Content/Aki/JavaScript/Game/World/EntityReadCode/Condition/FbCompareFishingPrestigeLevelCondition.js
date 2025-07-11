"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareFishingPrestigeLevelCondition = undefined;
class FbCompareFishingPrestigeLevelCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.LKl = false;
    this.AKl = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCompareFishingPrestigeLevelCondition(t);
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
  get PrestigeLevel() {
    if (!this.LKl) {
      this.LKl = true;
      this.AKl = this.FbDataInternal.prestigeLevel();
    }
    return this.AKl;
  }
}
exports.FbCompareFishingPrestigeLevelCondition = FbCompareFishingPrestigeLevelCondition;
//# sourceMappingURL=FbCompareFishingPrestigeLevelCondition.js.map