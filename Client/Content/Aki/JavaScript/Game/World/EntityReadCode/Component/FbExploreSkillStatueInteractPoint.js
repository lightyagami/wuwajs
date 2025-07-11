"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbExploreSkillStatueInteractPoint = undefined;
class FbExploreSkillStatueInteractPoint {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.FWh = false;
    this.NWh = 0;
    this.HWh = false;
    this.WWh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbExploreSkillStatueInteractPoint(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get PullTime() {
    if (!this.FWh) {
      this.FWh = true;
      this.NWh = this.FbDataInternal.pullTime();
    }
    return this.NWh;
  }
  get HangingPointList() {
    if (!this.HWh) {
      this.HWh = true;
      this.WWh = new Array();
      var i = this.FbDataInternal.hangingPointListLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.WWh.push(this.FbDataInternal.hangingPointList(t));
        }
      }
    }
    return this.WWh;
  }
}
exports.FbExploreSkillStatueInteractPoint = FbExploreSkillStatueInteractPoint;
//# sourceMappingURL=FbExploreSkillStatueInteractPoint.js.map