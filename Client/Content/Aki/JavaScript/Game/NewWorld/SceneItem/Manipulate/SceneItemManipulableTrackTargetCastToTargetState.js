"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableTrackTargetCastToTargetState = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const CameraController_1 = require("../../../Camera/CameraController");
const LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController");
const SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableTrackTargetCastToTargetState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor() {
    super(...arguments);
    this.FPo = undefined;
    this.$oi = undefined;
    this.Yoi = undefined;
    this.Ist = undefined;
    this.qsr = undefined;
    this.Gsr = undefined;
    this.Nsr = undefined;
    this.Knr = undefined;
  }
  SetTargetActorWithPart(t, e) {
    this.FPo = t;
    if (e !== undefined) {
      this.$oi = t?.Actor.Mesh;
      this.Yoi = e.PartSocketName;
    }
  }
  OnEnter() {
    var t;
    var e;
    super.OnEnter();
    if (this.FPo && (t = this.SceneItem.Config.ThrowCfg.MotionConfig, this.Ist = t.Velocity, StringUtils_1.StringUtils.IsEmpty(t.VelocityCurve) || ResourceSystem_1.ResourceSystem.LoadAsync(t.VelocityCurve, UE.CurveFloat, t => {
      this.qsr = t;
    }), this.Gsr = t.AngularVelocity, StringUtils_1.StringUtils.IsEmpty(t.AngularVelocityCurve) || ResourceSystem_1.ResourceSystem.LoadAsync(t.AngularVelocityCurve, UE.CurveFloat, t => {
      this.Nsr = t;
    }), this.Knr = Vector_1.Vector.Create(), (t.VelocityOffset !== undefined ? (t = Rotator_1.Rotator.Create(t.VelocityOffset.Y ?? 0, t.VelocityOffset.Z ?? 0, t.VelocityOffset.X ?? 0), e = Rotator_1.Rotator.Create(CameraController_1.CameraController.CameraRotator), MathUtils_1.MathUtils.ComposeRotator(e, t, e), e) : CameraController_1.CameraController.CameraRotator).Vector(this.Knr), this.Knr.Normalize(), this.NeedNotifyServer)) {
      LevelGamePlayController_1.LevelGamePlayController.ManipulatableBeCastOrDrop2Server(this.SceneItem.Entity.Id, Protocol_1.Aki.Protocol.Zw_.Proto_EControlStateLockEntityThrowing);
    }
  }
  OnTick(t) {
    super.OnTick(t);
    this.Timer += t;
    let e = this.Gsr;
    if (this.Nsr?.IsValid) {
      e *= this.Nsr.GetFloatValue(this.Timer);
    }
    let i = this.Ist;
    if (this.qsr?.IsValid) {
      i *= this.qsr.GetFloatValue(this.Timer);
    }
    this.Knr.Normalize();
    var r = Vector_1.Vector.Create();
    if (this.Yoi !== undefined) {
      r.DeepCopy(this.$oi.D_GetSocketLocation(this.Yoi));
    } else {
      r.DeepCopy(this.FPo.ActorLocationProxy);
    }
    var s = Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocationProxy);
    var r = Vector_1.Vector.Create(r);
    r.SubtractionEqual(s);
    r.Normalize();
    var o = Vector_1.Vector.DotProduct(this.Knr, r);
    var o = Math.acos(o) * MathCommon_1.MathCommon.RadToDeg;
    var o = MathUtils_1.MathUtils.Clamp(o, -e * t, e * t);
    var a = Vector_1.Vector.Create();
    Vector_1.Vector.CrossProduct(this.Knr, r, a);
    this.Knr.RotateAngleAxis(o, a, this.Knr);
    var r = Vector_1.Vector.Create(s);
    var o = Vector_1.Vector.Create(this.Knr);
    o.MultiplyEqual(i * t);
    r.AdditionEqual(o);
    this.SceneItem.ActorComp.SetActorLocation(r.ToUeVector());
    if (this.SceneItem.ManipulateBaseConfig.随速度调整朝向 && !this.AfterHit) {
      a = UE.KismetMathLibrary.D_FindLookAtRotation(this.SceneItem.ActorComp.ActorLocation, this.SceneItem.ActorComp.ActorLocation.op_Addition(this.Knr.ToUeVector()));
      this.SceneItem.ActorComp.SetActorRotation(a, "[ManipulableCastState.UpdateRotationAccordingToVelocity]", false);
    }
    return true;
  }
}
exports.SceneItemManipulableTrackTargetCastToTargetState = SceneItemManipulableTrackTargetCastToTargetState;
//# sourceMappingURL=SceneItemManipulableTrackTargetCastToTargetState.js.map