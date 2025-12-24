"use strict";

var MotorcyclePerformComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, s) {
  var r;
  var h = arguments.length;
  var o = h < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, i, e, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (r = t[n]) {
        o = (h < 3 ? r(o) : h > 3 ? r(i, e, o) : r(i, e)) || o;
      }
    }
  }
  if (h > 3 && o) {
    Object.defineProperty(i, e, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcyclePerformComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../Module/Phantom/PhantomUtil");
const GameCommand_1 = require("../../../Utils/Command/GameCommand");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const IFollow_1 = require("../../Character/Common/Component/Abilities/Follow/IFollow");
const VehiclePerformComponent_1 = require("../Common/VehiclePerformComponent");
const MIN_NPC_DITHER_RADIUS = 20;
const MAX_NPC_DITHER_RADIUS = 200;
const REMOVE_DITHER_ENTITY_DIST_SQUARED = 250000;
let MotorcyclePerformComponent = MotorcyclePerformComponent_1 = class MotorcyclePerformComponent extends VehiclePerformComponent_1.VehiclePerformComponent {
  constructor() {
    super(...arguments);
    this.$zo = undefined;
    this.SetNoDriverFrame = 0;
    this.W6f = new Array();
    this.xnf = false;
    this.Bnf = new Map();
    this.knf = new Array();
    this.k1h = -1;
    this.qnf = 0;
    this.Xwf = 0;
    this.JBf = 1;
    this.Ywf = undefined;
    this.DitherNpcRadius = MIN_NPC_DITHER_RADIUS;
    this.DitherDepthCurve = undefined;
    this.DitherCapsuleHalfHeight = 0;
    this.DitherCapsuleRadius = 0;
    this.DitherCapsuleRelativeTrans = Transform_1.Transform.Create();
    this.CapsulePointA = Vector_1.Vector.Create();
    this.CapsulePointB = Vector_1.Vector.Create();
    this.DitherRemoveDistSquared = REMOVE_DITHER_ENTITY_DIST_SQUARED;
    this.PendingDitherActorSet = new Set();
    this.EnableDither = false;
    this.OnComponentBeginOverlap = (t, i, e, s, r, h) => {
      var o;
      if (i?.IsA(TsBaseCharacter_1.default.StaticClass()) && ((o = (i = i).GetEntityNoBlueprint()?.GetComponent(0))?.IsNpc() || o?.IsAnimal())) {
        this.PendingDitherActorSet.add(i);
      }
    };
  }
  get DrivingBuffActivating() {
    return this.xnf;
  }
  set DrivingBuffActivating(t) {
    if (this.xnf !== t) {
      if (this.xnf = t) {
        for (const i of this.W6f) {
          this.$zo.AddBuff(i, {
            InstigatorId: this.$zo.CreatureDataId,
            Reason: "常驻buffs"
          });
        }
      } else {
        for (const e of this.W6f) {
          this.$zo?.RemoveBuff(e, -1, "常驻buffs");
        }
      }
    }
  }
  get Hour() {
    return this.k1h;
  }
  set Hour(t) {
    if (this.k1h !== t) {
      if ((this.k1h = t) < 0) {
        this.CurrentHourEffect = 0;
      } else {
        for (var [i, e] of this.knf) {
          if (t < i) {
            this.CurrentHourEffect = e;
            return;
          }
        }
      }
    }
  }
  get CurrentHourEffect() {
    return this.qnf;
  }
  set CurrentHourEffect(t) {
    if (this.qnf !== t && (this.qnf > 0 && this.$zo?.RemoveBuff(this.qnf, -1, "时间buff"), this.qnf = t, this.qnf > 0)) {
      this.$zo?.AddBuff(this.qnf, {
        InstigatorId: this.$zo.CreatureDataId,
        Reason: "时间buff"
      });
    }
  }
  get LaunchSpeedFadeTime() {
    return this.Xwf;
  }
  get LaunchVehicleSpeedAddRatio() {
    return this.JBf;
  }
  get LaunchSpeedFadeCurve() {
    return this.Ywf;
  }
  OnStart() {
    var t = super.OnStart();
    this.$zo = this.Entity.GetComponent(257);
    this.InitMotorcycleDither();
    var e = this.Entity.GetComponent(246)?.Config?.Asset;
    if (e) {
      var s = e.常驻buffs;
      this.W6f.length = 0;
      for (let t = s.Num() - 1; t >= 0; --t) {
        this.W6f.push(Number(s.Get(t)));
      }
      let i = e.撞击buff.Num();
      this.Bnf.clear();
      for (let t = 0; t < i; ++t) {
        var r = e.撞击buff.GetKey(t);
        var h = e.撞击buff.Get(r);
        this.Bnf.set(r, Number(h));
      }
      i = e.时段buff.Num();
      for (let t = this.knf.length = 0; t < i; ++t) {
        var o = e.时段buff.Get(t);
        this.knf.push([o.Threshold, Number(o.BuffId)]);
      }
      this.Xwf = e.叠加速度衰减时间;
      this.Ywf = e.叠加速度衰减曲线;
      this.JBf = e.载具速度叠加比例;
    }
    return t;
  }
  OnTick(t) {
    super.OnTick(t);
    this.DrivingBuffActivating = !!this.Driver;
    if (this.Driver && ModelManager_1.ModelManager.TimeOfDayModel) {
      this.Hour = Math.floor(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Hour);
    } else {
      this.Hour = -1;
    }
    this.HandlePendingDitherActor();
  }
  OnSetDriver() {
    var t;
    super.OnSetDriver();
    if (this.AnimComp?.MainAnimInstance && this.AnimComp.MainAnimInstance instanceof UE.KuroAnimInstanceVehicle) {
      t = this.DriverInternal?.GetComponent(3);
      this.AnimComp.MainAnimInstance.SetDriver(t ? t.Actor : undefined);
      this.AnimComp.MainAnimInstance.ConsumeExtractedRootMotion(1);
    }
    if (this.Driver === undefined) {
      this.SetNoDriverFrame = Time_1.Time.Frame;
    } else if (Time_1.Time.Frame !== this.SetNoDriverFrame) {
      if (t = this.ActorComp?.Actor.VehicleMovementComponent) {
        t.Velocity = Vector_1.Vector.ZeroVector;
        t.SetMotorRotateSpeed(Vector_1.Vector.ZeroVector, 0);
      }
      this.ActorComp?.Actor.VehicleMovementComponent?.ResetMotorcycle();
    }
  }
  RefreshSummonedEntity(t) {
    var i;
    var e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantMotorcycle);
    if (e && (i = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), i = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(i)?.CheckGetComponent(237)?.GetOrCreateHandler(IFollow_1.EPlayerFollowerHandlerType.FollowShooter))) {
      if (t) {
        (t = GameCommand_1.GameCommandFactory.CreateGameCommandWithReceivers(new IFollow_1.PlayerFollowerInfo(e.CreatureDataId, IFollow_1.PRIORITY_VEHICLE))).AddReceiver(i.AddFollowerReceiver());
        i.CommandInvoker.SubmitCommand(t, false);
      } else {
        (t = GameCommand_1.GameCommandFactory.CreateGameCommandWithReceivers(e.CreatureDataId)).AddReceiver(i.RemoveFollowerReceiver());
        i.CommandInvoker.SubmitCommand(t, false);
      }
      (e = GameCommand_1.GameCommandFactory.CreateGameCommandWithReceivers()).AddReceiver(i.FlushFollowerReceiver());
      i.CommandInvoker.SubmitCommand(e, true);
    }
  }
  EnterVehiclePerform(t) {
    super.EnterVehiclePerform(t);
    this.RefreshSummonedEntity(true);
    this.SetDitherEnable(t, true);
  }
  LeaveVehiclePerform(t) {
    super.LeaveVehiclePerform(t);
    this.SetDitherEnable(t, false);
    this.RefreshSummonedEntity(false);
  }
  OnHit(t) {
    super.OnHit(t);
    var i;
    var e = this.ActorComp?.Actor.VehicleMovementComponent;
    if (e && (i = this.Bnf.get(e.LastMotorHitPart)) && i > 0) {
      this.$zo?.AddBuff(i, {
        InstigatorId: this.$zo.CreatureDataId,
        Reason: "撞击buff"
      });
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.MotorOnHit, e.LastMotorHitPart, t);
    }
  }
  SetDitherEnable(t, i) {
    var e;
    if (this.EnableDither !== i) {
      this.EnableDither = i;
      this.SetDitherCollisionEnable(i);
      if (!i) {
        this.ResetAllPendingDitherActor();
      }
      e = this.CreatureData?.GetCreatureDataId();
      t = t.PassengerEntity?.CheckGetComponent(0)?.GetCreatureDataId();
      if (e && t) {
        if (i) {
          ModelManager_1.ModelManager.CameraModel.DitherEntityGroups.Union(e, t);
        } else {
          ModelManager_1.ModelManager.CameraModel.DitherEntityGroups.Delete(e);
          ModelManager_1.ModelManager.CameraModel.DitherEntityGroups.Delete(t);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 72, "MotorcyclePerformComponent.SetDitherEnable: 载具或乘客不存在", ["vehicleCreatureDataId", e], ["passengerCreatureDataId", t]);
      }
    }
  }
  SetDitherCollisionEnable(t) {
    var i;
    if (this.ActorComp?.Owner?.IsA(UE.BP_Motor_BaseVehicle_C.StaticClass())) {
      (i = this.ActorComp.Owner).CapsuleForDither.SetCollisionEnabled(t ? 1 : 0);
      i.CapsuleForDither.SetGenerateOverlapEvents(t);
    }
  }
  InitMotorcycleDither() {
    var t;
    var i;
    var e;
    if (this.ActorComp?.Owner?.IsA(UE.BP_Motor_BaseVehicle_C.StaticClass())) {
      (t = this.ActorComp.Owner).CapsuleForDither.OnComponentBeginOverlap.Add(this.OnComponentBeginOverlap);
      this.DitherCapsuleHalfHeight = t.CapsuleForDither.CapsuleHalfHeight;
      this.DitherCapsuleRadius = t.CapsuleForDither.CapsuleRadius;
      this.DitherDepthCurve = t.深度虚化值曲线;
      this.DitherNpcRadius = Math.max(MIN_NPC_DITHER_RADIUS, Math.min(t.虚化碰撞NPC半径, MAX_NPC_DITHER_RADIUS));
      this.TmpTrans1.FromUeTransform(this.ActorComp.ActorTransform);
      this.TmpTrans2.FromUeTransform(t.CapsuleForDither.D_K2_GetComponentToWorld());
      this.DitherCapsuleRelativeTrans.FromUeTransform(this.TmpTrans2.ToUeTransform().GetRelativeTransform(this.TmpTrans1.ToUeTransform()));
      i = (this.DitherNpcRadius + this.DitherCapsuleHalfHeight) / this.DitherCapsuleHalfHeight;
      e = (this.DitherNpcRadius + this.DitherCapsuleRadius) / this.DitherCapsuleRadius;
      this.TmpVector1.Set(e, e, i);
      t.CapsuleForDither.SetWorldScale3D(this.TmpVector1.ToUeVectorOld());
      e = this.DitherCapsuleHalfHeight + this.DitherNpcRadius + 100;
      this.DitherRemoveDistSquared = Math.max(this.DitherRemoveDistSquared, e * e);
    }
  }
  HandlePendingDitherActor() {
    if (this.PendingDitherActorSet.size) {
      this.CalculateCapsuleTransform();
      var t;
      var i;
      var e = [];
      for (const s of this.PendingDitherActorSet) {
        if (s.IsValid()) {
          if ((t = (i = s.GetEntityNoBlueprint())?.GetComponent(2))?.Valid) {
            if (i.GetComponent(242)?.VehicleEntity === this.Entity || Vector_1.Vector.DistSquared(t.ActorLocationProxy, this.ActorComp.ActorLocationProxy) > this.DitherRemoveDistSquared) {
              e.push(s);
              s.SetDitherEffect(1, 1);
            } else {
              i = this.CalcDitherValue(t);
              s.SetDitherEffect(i, 1);
            }
          } else {
            e.push(s);
          }
        } else {
          e.push(s);
        }
      }
      for (const r of e) {
        this.PendingDitherActorSet.delete(r);
      }
    }
  }
  CalcDitherValue(t) {
    t = this.GetMinDistFromPointToCapsule(t.ActorLocationProxy) - this.DitherCapsuleRadius;
    t = MathUtils_1.MathUtils.Clamp(Math.max(0, t) / this.DitherNpcRadius, 0, 1);
    if (this.DitherDepthCurve) {
      return MathUtils_1.MathUtils.Clamp(this.DitherDepthCurve.GetFloatValue(t), 0, 1);
    } else {
      return t;
    }
  }
  ResetAllPendingDitherActor() {
    for (const t of this.PendingDitherActorSet) {
      if (t.IsValid() && t.GetEntityNoBlueprint()?.GetComponent(2)?.Valid) {
        t.SetDitherEffect(1, 1);
      }
    }
    this.PendingDitherActorSet.clear();
  }
  CalculateCapsuleTransform() {
    this.TmpTrans1.FromUeTransform(this.ActorComp.ActorTransform);
    this.DitherCapsuleRelativeTrans.ComposeTransforms(this.TmpTrans1, this.TmpTrans2);
    this.TmpVector2.DeepCopy(this.TmpTrans2.GetLocation());
    this.TmpTrans2.GetRotation().GetUpVector(this.TmpVector3);
    this.TmpVector3.MultiplyEqual(this.DitherCapsuleHalfHeight - this.DitherCapsuleRadius);
    this.TmpVector2.Addition(this.TmpVector3, this.CapsulePointA);
    this.TmpVector2.Subtraction(this.TmpVector3, this.CapsulePointB);
    this.TryDebugDraw();
    GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.CapsulePointA);
    GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.CapsulePointB);
  }
  GetMinDistFromPointToCapsule(t) {
    this.TmpVector1.DeepCopy(t);
    GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.TmpVector1);
    if (this.CapsulePointA.Equals(this.CapsulePointB)) {
      return Vector_1.Vector.Dist(this.TmpVector1, this.CapsulePointA);
    }
    this.CapsulePointB.Subtraction(this.CapsulePointA, this.TmpVector3);
    this.TmpVector1.Subtraction(this.CapsulePointA, this.TmpVector5);
    t = Vector_1.Vector.DotProduct(this.TmpVector3, this.TmpVector5) / this.TmpVector3.SizeSquared();
    if (t > 0 && t < 1) {
      this.TmpVector3.MultiplyEqual(t);
      this.TmpVector3.SubtractionEqual(this.TmpVector5);
      return this.TmpVector3.Size();
    } else if (t <= 0) {
      return Vector_1.Vector.Dist(this.TmpVector1, this.CapsulePointA);
    } else {
      return Vector_1.Vector.Dist(this.TmpVector1, this.CapsulePointB);
    }
  }
  TryDebugDraw() {
    var t;
    var i;
    if (MotorcyclePerformComponent_1.DitherDebugMode) {
      t = (this.DitherNpcRadius + this.DitherCapsuleHalfHeight) / this.DitherCapsuleHalfHeight;
      i = (this.DitherNpcRadius + this.DitherCapsuleRadius) / this.DitherCapsuleRadius;
      this.CapsulePointA.Addition(this.CapsulePointB, MathUtils_1.MathUtils.CommonTempVector);
      MathUtils_1.MathUtils.CommonTempVector.MultiplyEqual(0.5);
      UE.KismetSystemLibrary.D_DrawDebugCapsule(this.ActorComp?.Actor, MathUtils_1.MathUtils.CommonTempVector.ToUeVector(), this.DitherCapsuleHalfHeight, this.DitherCapsuleRadius, this.TmpTrans2.GetRotation().Rotator().ToUeRotator(), new UE.LinearColor(1, 0, 0, 1), 0, 5);
      UE.KismetSystemLibrary.D_DrawDebugCapsule(this.ActorComp?.Actor, MathUtils_1.MathUtils.CommonTempVector.ToUeVector(), this.DitherCapsuleHalfHeight * t, this.DitherCapsuleRadius * i, this.TmpTrans2.GetRotation().Rotator().ToUeRotator(), new UE.LinearColor(0, 1, 0, 1), 0, 5);
    }
  }
  FixBornLocation(t, i) {
    super.FixBornLocation();
    this.ActorComp?.SetActorLocation(t.ToUeVector(), i, false);
  }
};
MotorcyclePerformComponent.DitherDebugMode = false;
MotorcyclePerformComponent = MotorcyclePerformComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(267)], MotorcyclePerformComponent);
exports.MotorcyclePerformComponent = MotorcyclePerformComponent; //# sourceMappingURL=MotorcyclePerformComponent.js.map