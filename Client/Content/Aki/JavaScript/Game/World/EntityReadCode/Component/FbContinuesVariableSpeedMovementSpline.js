"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbContinuesVariableSpeedMovementSpline = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbContinuesVariableSpeedSplinePoint_1 = require("./FbContinuesVariableSpeedSplinePoint");
const FbTimePathConfig_1 = require("./FbTimePathConfig");
class FbContinuesVariableSpeedMovementSpline {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.e9h = false;
    this.t9h = 0;
    this.i9h = false;
    this.r9h = undefined;
    this.Ec1 = false;
    this.Ic1 = undefined;
    this.NEh = false;
    this.VEh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbContinuesVariableSpeedMovementSpline(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TransitionSpeed() {
    if (!this.e9h) {
      this.e9h = true;
      this.t9h = this.FbDataInternal.transitionSpeed();
    }
    return this.t9h;
  }
  get EntireTimePathConfig() {
    if (!this.i9h) {
      this.i9h = true;
      this.r9h = FbTimePathConfig_1.FbTimePathConfig.Create(this.FbDataInternal.entireTimePathConfig());
    }
    return this.r9h;
  }
  get CircleMode() {
    if (!this.Ec1) {
      this.Ec1 = true;
      this.Ic1 = this.FbDataInternal.circleMode();
    }
    return this.Ic1;
  }
  get Points() {
    if (!this.NEh) {
      this.NEh = true;
      this.VEh = new Array();
      var t = this.FbDataInternal.pointsLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          var e = this.FbDataInternal.points(i, new fb_component_1.ContinuesVariableSpeedSplinePoint());
          this.VEh.push(FbContinuesVariableSpeedSplinePoint_1.FbContinuesVariableSpeedSplinePoint.Create(e));
        }
      }
    }
    return this.VEh;
  }
}
exports.FbContinuesVariableSpeedMovementSpline = FbContinuesVariableSpeedMovementSpline;
//# sourceMappingURL=FbContinuesVariableSpeedMovementSpline.js.map