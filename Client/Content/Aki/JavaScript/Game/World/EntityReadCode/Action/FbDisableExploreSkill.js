"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDisableExploreSkill = undefined;
class FbDisableExploreSkill {
  constructor(t) {
    this.FbDataInternal = t;
    this.eSh = false;
    this.tSh = false;
    this.Sh_ = false;
    this.Mh_ = false;
    this.Eh_ = false;
    this.Ih_ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDisableExploreSkill(t);
    }
  }
  get PlaceTemporaryTeleport() {
    if (!this.eSh) {
      this.eSh = true;
      this.tSh = this.FbDataInternal.placeTemporaryTeleport();
    }
    return this.tSh;
  }
  get IsComplementary() {
    if (!this.Sh_) {
      this.Sh_ = true;
      this.Mh_ = this.FbDataInternal.isComplementary();
    }
    return this.Mh_;
  }
  get ExploreSkillList() {
    if (!this.Eh_) {
      this.Eh_ = true;
      this.Ih_ = new Array();
      var i = this.FbDataInternal.exploreSkillListLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.Ih_.push(this.FbDataInternal.exploreSkillList(t));
        }
      }
    }
    return this.Ih_;
  }
}
exports.FbDisableExploreSkill = FbDisableExploreSkill;
//# sourceMappingURL=FbDisableExploreSkill.js.map