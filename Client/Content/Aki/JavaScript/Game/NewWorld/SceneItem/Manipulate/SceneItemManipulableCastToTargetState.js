"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableCastToTargetState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController");
const SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
class SceneItemManipulableCastToTargetState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor() {
    super(...arguments);
    this.NHo = undefined;
    this.znr = Vector_1.Vector.Create();
  }
  SetTarget(t) {
    this.NHo = t;
  }
  SetEnterCallback(t) {
    this.EnterCallback = t;
  }
  OnEnter() {
    var t;
    if (this.NHo?.Valid) {
      super.OnEnter();
      this.SceneItem.IsCanBeHeld = false;
      t = this.NHo.GetComponent(1);
      this.SceneItem.TargetActorComponent = t;
      this.SceneItem.TargetOutletComponent = undefined;
      if (this.NeedNotifyServer) {
        LevelGamePlayController_1.LevelGamePlayController.ManipulatableBeCastOrDrop2Server(this.SceneItem.Entity.Id, Protocol_1.Aki.Protocol.Zw_.Proto_EControlStateLockEntityThrowing);
      }
      this.StartCast();
      this.CalcDirection();
      if (this.EnterCallback) {
        this.EnterCallback();
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 31, "被控物没有进入CastToTarget时,没有设置目标");
    }
  }
  OnTick(t) {
    this.Timer += t;
    let e = MathUtils_1.MathUtils.Clamp(this.Timer / this.CastDuration, 0, 1);
    if (this.SceneItem.CastCurve) {
      e = this.SceneItem.CastCurve.GetFloatValue(e);
    }
    this.znr.DeepCopy(this.SceneItem.ActorComp.ActorLocation);
    this.UpdateLocation(e);
    this.UpdateRotation();
    this.UpdateRotationAccordingToVelocity();
    this.kxe();
    return true;
  }
  OnExit() {
    super.OnExit();
    this.NHo = undefined;
  }
  UpdateRotation() {
    let t = 0;
    var e = this.SceneItem.Config.ThrowCfg.MotionConfig;
    var e = (t = e.Type === IComponent_1.EThrowMotion.Projectile ? e.AngularVelocity : t) * this.Timer;
    var e = UE.KismetMathLibrary.RotatorFromAxisAndAngle(this.CastRotAxis.ToUeVectorOld(), e);
    this.SceneItem.ActorComp.SetActorRotation(e, "[SceneItemManipulableCastToTargetState.UpdateLocation]", this.HitCallback !== undefined);
  }
  UpdateRotationAccordingToVelocity() {
    var t;
    if (this.SceneItem.ManipulateBaseConfig.随速度调整朝向 && !this.AfterHit) {
      t = Vector_1.Vector.Create();
      this.SceneItem.ActorComp.ActorLocationProxy.Subtraction(this.znr, t);
      t.Normalize();
      t = UE.KismetMathLibrary.D_FindLookAtRotation(this.SceneItem.ActorComp.ActorLocation, this.SceneItem.ActorComp.ActorLocation.op_Addition(t.ToUeVector()));
      this.SceneItem.ActorComp.SetActorRotation(t, "[ManipulableCastState.UpdateRotationAccordingToVelocity]", false);
    }
  }
  kxe() {
    var t;
    var e;
    if (this.Timer >= this.CastDuration && this.CastDuration > 0) {
      this.SceneItem.ActorComp.PhysicsMode = 3;
      (t = Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocation)).SubtractionEqual(this.znr);
      t.Normalize();
      if ((e = this.SceneItem.Config.ThrowCfg.MotionConfig).Type !== IComponent_1.EThrowMotion.FreeFall) {
        t.MultiplyEqual(e.Velocity);
      }
      this.SceneItem.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(t.ToUeVectorOld());
    }
  }
}
exports.SceneItemManipulableCastToTargetState = SceneItemManipulableCastToTargetState;
//# sourceMappingURL=SceneItemManipulableCastToTargetState.js.map