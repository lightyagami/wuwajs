"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLevelAISpline = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbLevelAISplinePoint_1 = require("./FbLevelAISplinePoint");
const UnionLevelAiCycleOptionHelper_1 = require("./UnionLevelAiCycleOptionHelper");
class FbLevelAISpline {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.a_h = false;
    this.I9o = 0;
    this.u9h = false;
    this.d9h = undefined;
    this.m9h = false;
    this.C9h = false;
    this.g9h = false;
    this.f9h = false;
    this.NEh = false;
    this.VEh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLevelAISpline(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get CycleOption() {
    var t;
    var i;
    if (!this.u9h && (this.u9h = true, t = this.FbDataInternal.cycleOptionType(), i = UnionLevelAiCycleOptionHelper_1.UnionLevelAiCycleOptionHelper.GetUnionLevelAiCycleOptionObject(t))) {
      this.d9h = UnionLevelAiCycleOptionHelper_1.UnionLevelAiCycleOptionHelper.ReadUnionLevelAiCycleOption(t, this.FbDataInternal.cycleOption(i));
    }
    return this.d9h;
  }
  get UsePathFinding() {
    if (!this.m9h) {
      this.m9h = true;
      this.C9h = this.FbDataInternal.usePathFinding();
    }
    return this.C9h;
  }
  get IsPassEveryKeyPoint() {
    if (!this.g9h) {
      this.g9h = true;
      this.f9h = this.FbDataInternal.isPassEveryKeyPoint();
    }
    return this.f9h;
  }
  get Points() {
    if (!this.NEh) {
      this.NEh = true;
      this.VEh = new Array();
      var i = this.FbDataInternal.pointsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.points(t, new fb_component_1.LevelAISplinePoint());
          this.VEh.push(FbLevelAISplinePoint_1.FbLevelAISplinePoint.Create(e));
        }
      }
    }
    return this.VEh;
  }
}
exports.FbLevelAISpline = FbLevelAISpline;
//# sourceMappingURL=FbLevelAISpline.js.map