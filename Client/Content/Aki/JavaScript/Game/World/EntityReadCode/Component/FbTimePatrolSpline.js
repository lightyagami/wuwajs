"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTimePatrolSpline = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbTimePatrolSplinePoint_1 = require("./FbTimePatrolSplinePoint");
class FbTimePatrolSpline {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.NEh = false;
    this.VEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTimePatrolSpline(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Points() {
    if (!this.NEh) {
      this.NEh = true;
      this.VEh = new Array();
      var i = this.FbDataInternal.pointsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.points(t, new fb_component_1.TimePatrolSplinePoint());
          this.VEh.push(FbTimePatrolSplinePoint_1.FbTimePatrolSplinePoint.Create(e));
        }
      }
    }
    return this.VEh;
  }
}
exports.FbTimePatrolSpline = FbTimePatrolSpline;
//# sourceMappingURL=FbTimePatrolSpline.js.map