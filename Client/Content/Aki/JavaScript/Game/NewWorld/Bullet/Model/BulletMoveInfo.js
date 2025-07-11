"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletMoveInfo = undefined;
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const BulletTraceElementPool_1 = require("./BulletTraceElementPool");
class BulletMoveInfo {
  constructor() {
    this.SocketTransform = Transform_1.Transform.Create();
    this.BulletSpeedDir = Vector_1.Vector.Create();
    this.UpdateDirVector = Vector_1.Vector.Create();
    this.BulletSpeedRatio = -0;
    this.BulletSpeed = -0;
    this.GravityMoveRotator = Rotator_1.Rotator.Create();
    this.GravityMoveForward = Vector_1.Vector.Create();
    this.BulletSpeedZ = -0;
    this.BulletSpeed2D = -0;
    this.Gravity = -0;
    this.BeginSpeedRotator = Rotator_1.Rotator.Create();
    this.TraceRotator = Rotator_1.Rotator.Create();
    this.RoundCenterLastLocation = Vector_1.Vector.Create();
    this.RoundCenter = Vector_1.Vector.Create();
    this.RoundOnceAxis = Vector_1.Vector.Create();
    this.IsOnBaseMovement = false;
    this.LastBaseMovementSpeed = Vector_1.Vector.Create();
    this.FollowBoneBulletRotator = Rotator_1.Rotator.Create();
    this.BaseAdditiveAccelerate = Vector_1.Vector.Create();
    this.AdditiveAccelerate = Vector_1.Vector.Create();
    this.AdditiveAccelerateCurve = undefined;
    this.V0 = Vector_1.Vector.Create();
    this.MinFollowHeight = 0;
    this.SpeedFollowTarget = 1;
    this.FollowTargetBottom = true;
    this.LocationFollowTarget = Vector_1.Vector.Create();
    this.ObstaclesOffset = Vector_1.Vector.Create();
    this.LastFramePosition = Vector_1.Vector.Create();
    this.AimedLineTraceElement = undefined;
    this.ActorRotateParabola = false;
    this.AroundAngle = 0;
  }
  Clear() {
    this.SocketTransform.Reset();
    this.BulletSpeedDir.Reset();
    this.UpdateDirVector.Reset();
    this.BulletSpeedRatio = 0;
    this.BulletSpeed = 0;
    this.GravityMoveRotator.Reset();
    this.GravityMoveForward.Reset();
    this.BulletSpeedZ = 0;
    this.BulletSpeed2D = 0;
    this.Gravity = 0;
    this.BeginSpeedRotator.Reset();
    this.TraceRotator.Reset();
    this.RoundCenterLastLocation.Reset();
    this.RoundCenter.Reset();
    this.RoundOnceAxis.Reset();
    this.IsOnBaseMovement = false;
    this.LastBaseMovementSpeed.Reset();
    this.Gravity = 0;
    this.FollowBoneBulletRotator.Reset();
    this.BaseAdditiveAccelerate.Reset();
    this.AdditiveAccelerate.Reset();
    this.AdditiveAccelerateCurve = undefined;
    this.V0.Reset();
    this.MinFollowHeight = 0;
    this.SpeedFollowTarget = 0;
    this.FollowTargetBottom = true;
    this.ObstaclesOffset.Reset();
    this.LastFramePosition.Reset();
    BulletTraceElementPool_1.BulletTraceElementPool.RecycleTraceLineElement(this.AimedLineTraceElement);
    this.AimedLineTraceElement = undefined;
    this.ActorRotateParabola = false;
    this.AroundAngle = 0;
  }
}
(exports.BulletMoveInfo = BulletMoveInfo).TempTransform1 = Transform_1.Transform.Create();
BulletMoveInfo.StickGroundLineTrace = undefined;
BulletMoveInfo.StickWaterLineTrace = undefined;
BulletMoveInfo.StickWaterSphereTrace = undefined; //# sourceMappingURL=BulletMoveInfo.js.map