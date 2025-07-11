"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbMoveWithSpline = undefined;
const FbCheckClimb_1 = require("./FbCheckClimb");
const FbNpcFollowConfig_1 = require("./FbNpcFollowConfig");
const UnionSplineMoveTargetHelper_1 = require("./UnionSplineMoveTargetHelper");
class FbMoveWithSpline {
  constructor(t) {
    this.FbDataInternal = t;
    this.Buh = false;
    this.quh = undefined;
    this.kuh = false;
    this.Guh = 0;
    this.Ouh = false;
    this.Fuh = undefined;
    this.Nuh = false;
    this.Vuh = undefined;
    this.juh = false;
    this.Huh = 0;
    this.Wuh = false;
    this.Quh = 0;
    this.Kuh = false;
    this.$uh = false;
    this.Xuh = false;
    this.Yuh = false;
    this.zuh = false;
    this.Juh = false;
    this.Zuh = false;
    this.edh = undefined;
    this.Uj_ = false;
    this.Dj_ = false;
  }
  static Create(t) {
    if (t) {
      return new FbMoveWithSpline(t);
    }
  }
  get MoveTarget() {
    var t;
    var i;
    if (!this.Buh && (this.Buh = true, t = this.FbDataInternal.moveTargetType(), i = UnionSplineMoveTargetHelper_1.UnionSplineMoveTargetHelper.GetUnionSplineMoveTargetObject(t))) {
      this.quh = UnionSplineMoveTargetHelper_1.UnionSplineMoveTargetHelper.ReadUnionSplineMoveTarget(t, this.FbDataInternal.moveTarget(i));
    }
    return this.quh;
  }
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
  get CheckClimb() {
    if (!this.Ouh) {
      this.Ouh = true;
      this.Fuh = FbCheckClimb_1.FbCheckClimb.Create(this.FbDataInternal.checkClimb());
    }
    return this.Fuh;
  }
  get MoveState() {
    if (!this.Nuh) {
      this.Nuh = true;
      this.Vuh = this.FbDataInternal.moveState();
    }
    return this.Vuh;
  }
  get StartPointIndex() {
    if (!this.juh) {
      this.juh = true;
      this.Huh = this.FbDataInternal.startPointIndex();
    }
    return this.Huh;
  }
  get EndPointIndex() {
    if (!this.Wuh) {
      this.Wuh = true;
      this.Quh = this.FbDataInternal.endPointIndex();
    }
    return this.Quh;
  }
  get IsFollowStrictly() {
    if (!this.Kuh) {
      this.Kuh = true;
      this.$uh = this.FbDataInternal.isFollowStrictly();
    }
    return this.$uh;
  }
  get IsForceToFirstPoint() {
    if (!this.Xuh) {
      this.Xuh = true;
      this.Yuh = this.FbDataInternal.isForceToFirstPoint();
    }
    return this.Yuh;
  }
  get IsLookDir() {
    if (!this.zuh) {
      this.zuh = true;
      this.Juh = this.FbDataInternal.isLookDir();
    }
    return this.Juh;
  }
  get NpcFollow() {
    if (!this.Zuh) {
      this.Zuh = true;
      this.edh = FbNpcFollowConfig_1.FbNpcFollowConfig.Create(this.FbDataInternal.npcFollow());
    }
    return this.edh;
  }
  get NpcCollisionEnabled() {
    if (!this.Uj_) {
      this.Uj_ = true;
      this.Dj_ = this.FbDataInternal.npcCollisionEnabled();
    }
    return this.Dj_;
  }
}
exports.FbMoveWithSpline = FbMoveWithSpline;
//# sourceMappingURL=FbMoveWithSpline.js.map