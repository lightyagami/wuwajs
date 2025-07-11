"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletDataMove = undefined;
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
class BulletDataMove {
  constructor(t) {
    this.B8o = undefined;
    this.b8o = undefined;
    this.q8o = undefined;
    this.G8o = undefined;
    this.N8o = undefined;
    this.O8o = undefined;
    this.k8o = undefined;
    this.F8o = undefined;
    this.V8o = undefined;
    this.H8o = undefined;
    this.j8o = undefined;
    this.W8o = false;
    this.K8o = undefined;
    this.Q8o = undefined;
    this.X8o = undefined;
    this.$8o = undefined;
    this.Y8o = undefined;
    this.J8o = undefined;
    this.z8o = undefined;
    this.Z8o = undefined;
    this.e9o = undefined;
    this.t9o = undefined;
    this.i9o = undefined;
    this.o9o = undefined;
    this.r9o = undefined;
    this.Pe = t;
  }
  get InitVelocityDirStandard() {
    if (this.B8o === undefined) {
      this.B8o = this.Pe.出生初速度方向基准;
    }
    return this.B8o;
  }
  get InitVelocityKeepUp() {
    if (this.b8o === undefined) {
      this.b8o = this.Pe.初速度仅Z轴朝向;
    }
    return this.b8o;
  }
  get InitVelocityDirParam() {
    if (this.q8o === undefined) {
      this.q8o = this.Pe.出生初速度方向基准参数;
    }
    return this.q8o;
  }
  get InitVelocityRot() {
    this.G8o ||= Rotator_1.Rotator.Create(this.Pe.初速度偏移方向);
    return this.G8o;
  }
  get InitVelocityDirRandom() {
    this.N8o ||= Vector_1.Vector.Create(this.Pe.初速度方向随机);
    return this.N8o;
  }
  get UpDownAngleLimit() {
    if (this.O8o === undefined) {
      this.O8o = this.Pe.发射上下角度限制;
    }
    return this.O8o;
  }
  get FollowType() {
    if (this.k8o === undefined) {
      this.k8o = this.Pe.子弹跟随类型;
    }
    return this.k8o;
  }
  get IsLockScale() {
    if (this.F8o === undefined) {
      this.F8o = this.Pe.是否锁定缩放;
    }
    return this.F8o;
  }
  get IsDetachOnSkillEnd() {
    if (this.V8o === undefined) {
      this.V8o = this.Pe.技能结束解除跟随骨骼;
    }
    return this.V8o;
  }
  get Speed() {
    if (this.H8o === undefined) {
      this.H8o = this.Pe.移动速度;
    }
    return this.H8o;
  }
  get SpeedCurve() {
    if (!this.W8o) {
      this.W8o = true;
      this.j8o = this.Pe.移动速度曲线;
    }
    return this.j8o;
  }
  get FollowSkeletonRotLimit() {
    this.K8o ||= Vector_1.Vector.Create(this.Pe.跟随骨骼限制旋转);
    return this.K8o;
  }
  get TrackParams() {
    if (!this.Q8o) {
      this.Q8o = new Array();
      var i = this.Pe.运动轨迹参数数据;
      for (let t = 0; t < i.Num(); t++) {
        var s = i.Get(t);
        this.Q8o.push(Vector_1.Vector.Create(s));
      }
    }
    return this.Q8o;
  }
  get TrackCurves() {
    if (this.X8o === undefined) {
      this.X8o = new Array();
      var i = this.Pe.运动轨迹参数曲线;
      for (let t = 0; t < i.Num(); t++) {
        this.X8o.push(i.Get(t));
      }
    }
    return this.X8o;
  }
  get TrackTarget() {
    if (this.$8o === undefined) {
      this.$8o = this.Pe.运动轨迹参数目标;
    }
    return this.$8o;
  }
  get TrackTargetBlackboardKey() {
    if (this.Y8o === undefined) {
      this.Y8o = this.Pe.运动轨迹目标黑板Key值;
    }
    return this.Y8o;
  }
  get Trajectory() {
    if (this.J8o === undefined) {
      this.J8o = this.Pe.运动轨迹类型;
    }
    return this.J8o;
  }
  get BoneName() {
    if (this.z8o === undefined) {
      this.z8o = this.Pe.骨骼名字;
    }
    return this.z8o;
  }
  get BoneNameString() {
    if (this.Z8o === undefined) {
      this.Z8o = this.BoneName.toString();
    }
    return this.Z8o;
  }
  get SkeletonComponentName() {
    if (this.e9o === undefined) {
      this.e9o = this.Pe.骨骼网格体名字;
    }
    return this.e9o;
  }
  get BeginVelocityLimitMap() {
    if (this.t9o === undefined) {
      var i = this.Pe.初速度角度限制;
      var s = i.Num();
      this.t9o = new Map();
      for (let t = 0; t < s; t++) {
        var h = i.GetKey(t);
        var e = i.Get(h);
        this.t9o.set(h, e);
      }
    }
    return this.t9o;
  }
  get DestOffsetForward() {
    if (this.i9o === undefined) {
      this.i9o = this.Pe.终点偏移基准朝向;
    }
    return this.i9o;
  }
  get DestOffset() {
    if (this.o9o === undefined) {
      this.o9o = Vector_1.Vector.Create(this.Pe.终点偏移);
    }
    return this.o9o;
  }
  get TrackTargetBone() {
    if (this.r9o === undefined) {
      this.r9o = this.Pe.运动轨迹目标骨骼;
    }
    return this.r9o;
  }
  Preload() {
    this.InitVelocityDirStandard;
    this.InitVelocityDirParam;
    this.InitVelocityRot;
    this.FollowType;
    this.Speed;
    this.SpeedCurve;
    this.TrackParams;
    this.TrackCurves;
    this.TrackTarget;
    this.Trajectory;
    this.BoneName;
    this.SkeletonComponentName;
    return true;
  }
}
exports.BulletDataMove = BulletDataMove;
//# sourceMappingURL=BulletDataMove.js.map