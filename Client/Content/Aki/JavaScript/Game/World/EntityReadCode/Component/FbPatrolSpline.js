"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPatrolSpline = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbPatrolRange_1 = require("./FbPatrolRange");
const FbPatrolSplinePoint_1 = require("./FbPatrolSplinePoint");
const UnionPatrolCycleOptionHelper_1 = require("./UnionPatrolCycleOptionHelper");
class FbPatrolSpline {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.u9h = false;
    this.d9h = undefined;
    this.Q9h = false;
    this.K9h = false;
    this.$9h = false;
    this.X9h = 0;
    this.Y9h = false;
    this.z9h = false;
    this.NEh = false;
    this.VEh = undefined;
    this.J9h = false;
    this.Z9h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPatrolSpline(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CycleOption() {
    var t;
    var i;
    if (!this.u9h && (this.u9h = true, t = this.FbDataInternal.cycleOptionType(), i = UnionPatrolCycleOptionHelper_1.UnionPatrolCycleOptionHelper.GetUnionPatrolCycleOptionObject(t))) {
      this.d9h = UnionPatrolCycleOptionHelper_1.UnionPatrolCycleOptionHelper.ReadUnionPatrolCycleOption(t, this.FbDataInternal.cycleOption(i));
    }
    return this.d9h;
  }
  get IsNavigation() {
    if (!this.Q9h) {
      this.Q9h = true;
      this.K9h = this.FbDataInternal.isNavigation();
    }
    return this.K9h;
  }
  get TurnSpeed() {
    if (!this.$9h) {
      this.$9h = true;
      this.X9h = this.FbDataInternal.turnSpeed();
    }
    return this.X9h;
  }
  get IsFloating() {
    if (!this.Y9h) {
      this.Y9h = true;
      this.z9h = this.FbDataInternal.isFloating();
    }
    return this.z9h;
  }
  get Points() {
    if (!this.NEh) {
      this.NEh = true;
      this.VEh = new Array();
      var i = this.FbDataInternal.pointsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.points(t, new fb_component_1.PatrolSplinePoint());
          this.VEh.push(FbPatrolSplinePoint_1.FbPatrolSplinePoint.Create(e));
        }
      }
    }
    return this.VEh;
  }
  get PatrolRange() {
    if (!this.J9h) {
      this.J9h = true;
      this.Z9h = FbPatrolRange_1.FbPatrolRange.Create(this.FbDataInternal.patrolRange());
    }
    return this.Z9h;
  }
}
exports.FbPatrolSpline = FbPatrolSpline;
//# sourceMappingURL=FbPatrolSpline.js.map