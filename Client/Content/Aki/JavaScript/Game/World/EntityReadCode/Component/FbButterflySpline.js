"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbButterflySpline = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbButterflySplinePoint_1 = require("./FbButterflySplinePoint");
class FbButterflySpline {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.NEh = false;
    this.VEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbButterflySpline(t);
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
      var e = this.FbDataInternal.pointsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.points(t, new fb_component_1.ButterflySplinePoint());
          this.VEh.push(FbButterflySplinePoint_1.FbButterflySplinePoint.Create(i));
        }
      }
    }
    return this.VEh;
  }
}
exports.FbButterflySpline = FbButterflySpline;
//# sourceMappingURL=FbButterflySpline.js.map