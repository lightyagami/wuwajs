"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNotifyMonsterPlayStandbyTags = undefined;
class FbNotifyMonsterPlayStandbyTags {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.bvh = false;
    this.Lvh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNotifyMonsterPlayStandbyTags(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get StandbyTags() {
    if (!this.bvh) {
      this.bvh = true;
      this.Lvh = new Array();
      var s = this.FbDataInternal.standbyTagsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.Lvh.push(this.FbDataInternal.standbyTags(t));
        }
      }
    }
    return this.Lvh;
  }
}
exports.FbNotifyMonsterPlayStandbyTags = FbNotifyMonsterPlayStandbyTags;
//# sourceMappingURL=FbNotifyMonsterPlayStandbyTags.js.map