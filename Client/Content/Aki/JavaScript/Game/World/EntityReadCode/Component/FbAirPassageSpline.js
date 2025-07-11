"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAirPassageSpline = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCommonSplinePoint_1 = require("./FbCommonSplinePoint");
class FbAirPassageSpline {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.IHh = false;
    this.THh = undefined;
    this.bHh = false;
    this.LHh = undefined;
    this.AHh = false;
    this.xHh = undefined;
    this.RHh = false;
    this.wHh = undefined;
    this.PHh = false;
    this.UHh = 0;
    this.DHh = false;
    this.BHh = 0;
    this.qHh = false;
    this.kHh = 0;
    this.GHh = false;
    this.OHh = 0;
    this.FHh = false;
    this.NHh = 0;
    this.DHl = false;
    this.BHl = 0;
    this.NEh = false;
    this.VEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAirPassageSpline(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get MiddleLineEffect() {
    if (!this.IHh) {
      this.IHh = true;
      this.THh = this.FbDataInternal.middleLineEffect();
    }
    return this.THh;
  }
  get TailCircleEffect() {
    if (!this.bHh) {
      this.bHh = true;
      this.LHh = this.FbDataInternal.tailCircleEffect();
    }
    return this.LHh;
  }
  get MiddleCircleEffect() {
    if (!this.AHh) {
      this.AHh = true;
      this.xHh = this.FbDataInternal.middleCircleEffect();
    }
    return this.xHh;
  }
  get MiddleCircleOverlyingEffect() {
    if (!this.RHh) {
      this.RHh = true;
      this.wHh = this.FbDataInternal.middleCircleOverlyingEffect();
    }
    return this.wHh;
  }
  get MiddleCircleSpace() {
    if (!this.PHh) {
      this.PHh = true;
      this.UHh = this.FbDataInternal.middleCircleSpace();
    }
    return this.UHh;
  }
  get MiddleCircleRadius() {
    if (!this.DHh) {
      this.DHh = true;
      this.BHh = this.FbDataInternal.middleCircleRadius();
    }
    return this.BHh;
  }
  get MovableRadius() {
    if (!this.qHh) {
      this.qHh = true;
      this.kHh = this.FbDataInternal.movableRadius();
    }
    return this.kHh;
  }
  get Resistance() {
    if (!this.GHh) {
      this.GHh = true;
      this.OHh = this.FbDataInternal.resistance();
    }
    return this.OHh;
  }
  get SpeedLimit() {
    if (!this.FHh) {
      this.FHh = true;
      this.NHh = this.FbDataInternal.speedLimit();
    }
    return this.NHh;
  }
  get SprintSpeedLimit() {
    if (!this.DHl) {
      this.DHl = true;
      this.BHl = this.FbDataInternal.sprintSpeedLimit();
    }
    return this.BHl;
  }
  get Points() {
    if (!this.NEh) {
      this.NEh = true;
      this.VEh = new Array();
      var i = this.FbDataInternal.pointsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.points(t, new fb_component_1.CommonSplinePoint());
          this.VEh.push(FbCommonSplinePoint_1.FbCommonSplinePoint.Create(s));
        }
      }
    }
    return this.VEh;
  }
}
exports.FbAirPassageSpline = FbAirPassageSpline;
//# sourceMappingURL=FbAirPassageSpline.js.map