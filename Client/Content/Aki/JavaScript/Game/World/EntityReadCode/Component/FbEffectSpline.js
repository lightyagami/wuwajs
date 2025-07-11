"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEffectSpline = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCommonSplinePoint_1 = require("./FbCommonSplinePoint");
const UnionEffectSplineCreateOptionHelper_1 = require("./UnionEffectSplineCreateOptionHelper");
class FbEffectSpline {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.sUh = false;
    this.aUh = undefined;
    this.h9h = false;
    this.l9h = undefined;
    this.NEh = false;
    this.VEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEffectSpline(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Effect() {
    if (!this.sUh) {
      this.sUh = true;
      this.aUh = this.FbDataInternal.effect();
    }
    return this.aUh;
  }
  get CreateOption() {
    var t;
    var e;
    if (!this.h9h && (this.h9h = true, t = this.FbDataInternal.createOptionType(), e = UnionEffectSplineCreateOptionHelper_1.UnionEffectSplineCreateOptionHelper.GetUnionEffectSplineCreateOptionObject(t))) {
      this.l9h = UnionEffectSplineCreateOptionHelper_1.UnionEffectSplineCreateOptionHelper.ReadUnionEffectSplineCreateOption(t, this.FbDataInternal.createOption(e));
    }
    return this.l9h;
  }
  get Points() {
    if (!this.NEh) {
      this.NEh = true;
      this.VEh = new Array();
      var e = this.FbDataInternal.pointsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.points(t, new fb_component_1.CommonSplinePoint());
          this.VEh.push(FbCommonSplinePoint_1.FbCommonSplinePoint.Create(i));
        }
      }
    }
    return this.VEh;
  }
}
exports.FbEffectSpline = FbEffectSpline;
//# sourceMappingURL=FbEffectSpline.js.map