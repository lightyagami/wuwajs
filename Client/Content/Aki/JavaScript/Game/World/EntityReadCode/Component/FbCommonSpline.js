"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCommonSpline = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCommonSplinePoint_1 = require("./FbCommonSplinePoint");
class FbCommonSpline {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.NEh = false;
    this.VEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCommonSpline(t);
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
          var e = this.FbDataInternal.points(t, new fb_component_1.CommonSplinePoint());
          this.VEh.push(FbCommonSplinePoint_1.FbCommonSplinePoint.Create(e));
        }
      }
    }
    return this.VEh;
  }
}
exports.FbCommonSpline = FbCommonSpline;
//# sourceMappingURL=FbCommonSpline.js.map