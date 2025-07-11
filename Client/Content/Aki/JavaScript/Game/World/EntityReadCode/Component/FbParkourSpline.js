"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbParkourSpline = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbParkourSplinePoint_1 = require("./FbParkourSplinePoint");
class FbParkourSpline {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.y9h = false;
    this.S9h = false;
    this.M9h = false;
    this.E9h = 0;
    this.I9h = false;
    this.T9h = undefined;
    this.b9h = false;
    this.L9h = undefined;
    this.A9h = false;
    this.x9h = undefined;
    this.R9h = false;
    this.w9h = undefined;
    this.NEh = false;
    this.VEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbParkourSpline(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get IsRequireToEnd() {
    if (!this.y9h) {
      this.y9h = true;
      this.S9h = this.FbDataInternal.isRequireToEnd();
    }
    return this.S9h;
  }
  get CheckPointsRequire() {
    if (!this.M9h) {
      this.M9h = true;
      this.E9h = this.FbDataInternal.checkPointsRequire();
    }
    return this.E9h;
  }
  get CheckPointResource() {
    if (!this.I9h) {
      this.I9h = true;
      this.T9h = this.FbDataInternal.checkPointResource();
    }
    return this.T9h;
  }
  get CheckPointsDestroyRes() {
    if (!this.b9h) {
      this.b9h = true;
      this.L9h = this.FbDataInternal.checkPointsDestroyRes();
    }
    return this.L9h;
  }
  get StartResource() {
    if (!this.A9h) {
      this.A9h = true;
      this.x9h = this.FbDataInternal.startResource();
    }
    return this.x9h;
  }
  get EndResource() {
    if (!this.R9h) {
      this.R9h = true;
      this.w9h = this.FbDataInternal.endResource();
    }
    return this.w9h;
  }
  get Points() {
    if (!this.NEh) {
      this.NEh = true;
      this.VEh = new Array();
      var i = this.FbDataInternal.pointsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var s = this.FbDataInternal.points(t, new fb_component_1.ParkourSplinePoint());
          this.VEh.push(FbParkourSplinePoint_1.FbParkourSplinePoint.Create(s));
        }
      }
    }
    return this.VEh;
  }
}
exports.FbParkourSpline = FbParkourSpline;
//# sourceMappingURL=FbParkourSpline.js.map