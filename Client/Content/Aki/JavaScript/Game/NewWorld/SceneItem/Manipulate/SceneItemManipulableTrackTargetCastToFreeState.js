"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemManipulableTrackTargetCastToFreeState = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const CameraController_1 = require("../../../Camera/CameraController");
const SceneItemManipulableCastState_1 = require("./SceneItemManipulableCastState");
const LevelGamePlayController_1 = require("../../../LevelGamePlay/LevelGamePlayController");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const PROFILE_KEY = "[SceneItemManipulableTrackTargetCastToFreeState.OnEnter]";
const MAX_DISTANCE = 5000;
const SPHERE_TRACE_RADIUS = 1;
class SceneItemManipulableTrackTargetCastToFreeState extends SceneItemManipulableCastState_1.SceneItemManipulableCastState {
  constructor() {
    super(...arguments);
    this.Usr = undefined;
    this.Asr = undefined;
    this.Psr = undefined;
    this.xsr = undefined;
    this.wsr = undefined;
    this.Bsr = false;
    this.jnr = 0;
  }
  SetStartCameraLocation(e) {
    this.Usr = e;
  }
  OnEnter() {
    var e;
    var t;
    super.OnEnter();
    if (this.Usr !== undefined) {
      this.Bsr = false;
      this.Asr = Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocationProxy);
      t = this.SceneItem.Config.ThrowCfg.MotionConfig;
      this.jnr = t.Velocity;
      this.wsr = MAX_DISTANCE;
      t = Vector_1.Vector.Create(0, 0, 0);
      CameraController_1.CameraController.CameraRotator.Vector(t);
      if (SceneItemManipulableTrackTargetCastToFreeState.bsr === undefined) {
        this.koe();
      }
      (e = Vector_1.Vector.Create(this.Usr)).AdditionEqual(t.MultiplyEqual(MAX_DISTANCE));
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(SceneItemManipulableTrackTargetCastToFreeState.bsr, this.Usr);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(SceneItemManipulableTrackTargetCastToFreeState.bsr, e);
      t = TraceElementCommon_1.TraceElementCommon.SphereTrace(SceneItemManipulableTrackTargetCastToFreeState.bsr, PROFILE_KEY);
      this.Psr = Vector_1.Vector.Create(e);
      if (t && SceneItemManipulableTrackTargetCastToFreeState.bsr.HitResult.bBlockingHit) {
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(SceneItemManipulableTrackTargetCastToFreeState.bsr.HitResult, 0, this.Psr);
        this.wsr = Vector_1.Vector.Dist(this.Asr, this.Psr);
      }
      this.xsr = Vector_1.Vector.Create(this.Psr);
      this.xsr.SubtractionEqual(this.Asr);
      this.xsr.Normalize();
      if (this.NeedNotifyServer) {
        LevelGamePlayController_1.LevelGamePlayController.ManipulatableBeCastOrDrop2Server(this.SceneItem.Entity.Id, Protocol_1.Aki.Protocol.Zw_.Proto_EControlStateFreeThrowing);
      }
      if (this.EnterCallback) {
        this.EnterCallback();
      }
      this.SceneItem.ActorComp.PhysicsMode = 0;
    }
  }
  koe() {
    SceneItemManipulableTrackTargetCastToFreeState.bsr = UE.NewObject(UE.TraceSphereElement.StaticClass());
    SceneItemManipulableTrackTargetCastToFreeState.bsr.WorldContextObject = this.SceneItem.ActorComp.Owner;
    SceneItemManipulableTrackTargetCastToFreeState.bsr.bIsSingle = true;
    SceneItemManipulableTrackTargetCastToFreeState.bsr.bIgnoreSelf = true;
    var e = UE.NewArray(UE.BuiltinByte);
    e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn);
    e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
    e.Add(QueryTypeDefine_1.KuroObjectTypeQuery.Destructible);
    var e = (0, puerts_1.$ref)(e);
    SceneItemManipulableTrackTargetCastToFreeState.bsr.SetObjectTypesQuery(e);
    SceneItemManipulableTrackTargetCastToFreeState.bsr.Radius = SPHERE_TRACE_RADIUS;
    SceneItemManipulableTrackTargetCastToFreeState.bsr.DrawTime = 5;
  }
  OnExit() {
    super.OnExit();
    this.Usr = undefined;
  }
  OnTick(e) {
    var t = Vector_1.Vector.Create(this.SceneItem.ActorComp.ActorLocationProxy);
    var t = Vector_1.Vector.Create(t);
    let a = Vector_1.Vector.Create(this.xsr);
    t.AdditionEqual(a.MultiplyEqual(this.jnr * e));
    if (!this.Bsr) {
      this.SceneItem.ActorComp.SetActorLocation(t.ToUeVector(), "[SceneItemManipulableTrackTargetCastToFreeState.UpdateLocation]");
    }
    this.wsr -= this.jnr * e;
    if (!this.Bsr && this.wsr <= 0) {
      if (this.SceneItem?.CurrentState !== this) {
        return true;
      }
      this.Bsr = true;
      this.SceneItem.TryEnableTick();
      this.SceneItem.ActorComp.PhysicsMode = 3;
      a = Vector_1.Vector.Create(this.xsr);
      this.SceneItem.ActorComp.GetPrimitiveComponent().SetPhysicsLinearVelocity(a.MultiplyEqual(this.jnr).ToUeVectorOld());
    }
    if (this.SceneItem.ManipulateBaseConfig.随速度调整朝向 && !this.AfterHit) {
      t = Vector_1.Vector.Create(this.xsr.ToUeVector()).ToUeVector();
      e = UE.KismetMathLibrary.D_FindLookAtRotation(this.SceneItem.ActorComp.ActorLocation, this.SceneItem.ActorComp.ActorLocation.op_Addition(t));
      this.SceneItem.ActorComp.SetActorRotation(e, "[ManipulableCastState.UpdateRotationAccordingToVelocity]", false);
    }
    return true;
  }
  IsNoLockCasting() {
    return true;
  }
}
(exports.SceneItemManipulableTrackTargetCastToFreeState = SceneItemManipulableTrackTargetCastToFreeState).bsr = undefined;
//# sourceMappingURL=SceneItemManipulableTrackTargetCastToFreeState.js.map