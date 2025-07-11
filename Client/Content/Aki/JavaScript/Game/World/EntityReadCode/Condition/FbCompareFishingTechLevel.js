"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompareFishingTechLevel = undefined;
class FbCompareFishingTechLevel {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.eF_ = false;
    this.tF_ = 0;
    this._ch = false;
    this.cch = undefined;
    this.iF_ = false;
    this.rF_ = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCompareFishingTechLevel(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TechId() {
    if (!this.eF_) {
      this.eF_ = true;
      this.tF_ = this.FbDataInternal.techId();
    }
    return this.tF_;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get TechLevel() {
    if (!this.iF_) {
      this.iF_ = true;
      this.rF_ = this.FbDataInternal.techLevel();
    }
    return this.rF_;
  }
}
exports.FbCompareFishingTechLevel = FbCompareFishingTechLevel;
//# sourceMappingURL=FbCompareFishingTechLevel.js.map