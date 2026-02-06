"use strict";

var MotorcyclePerformComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var r;
  var h = arguments.length;
  var o = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (r = t[n]) {
        o = (h < 3 ? r(o) : h > 3 ? r(e, i, o) : r(e, i)) || o;
      }
    }
  }
  if (h > 3 && o) {
    Object.defineProperty(e, i, o);
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
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LogReportController_1 = require("../../../Module/LogReport/LogReportController");
const LogReportDefine_1 = require("../../../Module/LogReport/LogReportDefine");
const PhantomUtil_1 = require("../../../Module/Phantom/PhantomUtil");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const VehiclePerformComponent_1 = require("../Common/VehiclePerformComponent");
const MIN_NPC_DITHER_RADIUS = 20;
const MAX_NPC_DITHER_RADIUS = 200;
const REMOVE_DITHER_ENTITY_DIST_SQUARED = 250000;
let MotorcyclePerformComponent = MotorcyclePerformComponent_1 = class MotorcyclePerformComponent extends VehiclePerformComponent_1.VehiclePerformComponent {
  constructor() {
    super(...arguments);
    this.$zo = undefined;
    this.SetNoDriverFrame = 0;
    this.lJf = new Array();
    this.ehf = false;
    this.thf = new Map();
    this.ihf = new Array();
    this.k1h = -1;
    this.rhf = 0;
    this.yUf = 0;
    this.VNf = 1;
    this.SUf = undefined;
    this.a4g = 0;
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
    this.OnComponentBeginOverlap = (t, e, i, s, r, h) => {
      var o;
      if (e?.IsA(TsBaseCharacter_1.default.StaticClass()) && ((o = (e = e).GetEntityNoBlueprint()?.GetComponent(0))?.IsNpc() || o?.IsAnimal())) {
        this.PendingDitherActorSet.add(e);
      }
    };
  }
  get DrivingBuffActivating() {
    return this.ehf;
  }
  set DrivingBuffActivating(t) {
    if (this.ehf !== t) {
      if (this.ehf = t) {
        for (const e of this.lJf) {
          this.$zo.AddBuff(e, {
            InstigatorId: this.$zo.CreatureDataId,
            Reason: "常驻buffs"
          });
        }
      } else {
        for (const i of this.lJf) {
          this.$zo?.RemoveBuff(i, -1, "常驻buffs");
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
        for (var [e, i] of this.ihf) {
          if (t < e) {
            this.CurrentHourEffect = i;
            return;
          }
        }
      }
    }
  }
  get CurrentHourEffect() {
    return this.rhf;
  }
  set CurrentHourEffect(t) {
    if (this.rhf !== t && (this.rhf > 0 && this.$zo?.RemoveBuff(this.rhf, -1, "时间buff"), this.rhf = t, this.rhf > 0)) {
      this.$zo?.AddBuff(this.rhf, {
        InstigatorId: this.$zo.CreatureDataId,
        Reason: "时间buff"
      });
    }
  }
  get LaunchSpeedFadeTime() {
    return this.yUf;
  }
  get LaunchVehicleSpeedAddRatio() {
    return this.VNf;
  }
  get LaunchSpeedFadeCurve() {
    return this.SUf;
  }
  OnStart() {
    var t = super.OnStart();
    this.$zo = this.Entity.GetComponent(257);
    this.InitMotorcycleDither();
    var i = this.Entity.GetComponent(246)?.Config?.Asset;
    if (i) {
      var s = i.常驻buffs;
      this.lJf.length = 0;
      for (let t = s.Num() - 1; t >= 0; --t) {
        this.lJf.push(Number(s.Get(t)));
      }
      let e = i.撞击buff.Num();
      this.thf.clear();
      for (let t = 0; t < e; ++t) {
        var r = i.撞击buff.GetKey(t);
        var h = i.撞击buff.Get(r);
        this.thf.set(r, Number(h));
      }
      e = i.时段buff.Num();
      for (let t = this.ihf.length = 0; t < e; ++t) {
        var o = i.时段buff.Get(t);
        this.ihf.push([o.Threshold, Number(o.BuffId)]);
      }
      this.yUf = i.叠加速度衰减时间;
      this.SUf = i.叠加速度衰减曲线;
      this.VNf = i.载具速度叠加比例;
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
    if (this.a4g < Time_1.Time.Now) {
      this.a4g = Time_1.Time.Now + 3000;
      for (var [, e] of this.PassengerInfoMap) {
        if (!e.PassengerEntity?.GetComponent(124)?.Active) {
          if (e = e.PassengerEntity?.GetComponent(242)) {
            e.MotorCheckAndResetRelativeTransform();
          }
        }
      }
    }
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
  RefreshSummonedEntity(t, e) {
    var i = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantMotorcycle);
    if (i && (t = t.PassengerEntity?.CheckGetComponent(0)?.GetPlayerId())) {
      ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(t)?.CheckGetComponent(237)?.UpdatePlayerFollowers([{
        h5n: 666,
        F4n: e ? i.CreatureDataId : 0
      }]);
    }
  }
  EnterVehiclePerform(t) {
    super.EnterVehiclePerform(t);
    this.RefreshSummonedEntity(t, true);
    this.SetDitherEnable(t, true);
  }
  LeaveVehiclePerform(t) {
    super.LeaveVehiclePerform(t);
    this.SetDitherEnable(t, false);
    this.RefreshSummonedEntity(t, false);
  }
  OnHit(t) {
    super.OnHit(t);
    var e;
    var i = this.ActorComp?.Actor.VehicleMovementComponent;
    if (i && (e = this.thf.get(i.LastMotorHitPart)) && e > 0) {
      this.$zo?.AddBuff(e, {
        InstigatorId: this.$zo.CreatureDataId,
        Reason: "撞击buff"
      });
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.MotorOnHit, i.LastMotorHitPart, t);
    }
  }
  SetDitherEnable(t, e) {
    var i;
    var s;
    if (this.EnableDither !== e) {
      this.EnableDither = e;
      this.SetDitherCollisionEnable(e);
      if (!e) {
        this.ResetAllPendingDitherActor();
      }
      i = this.CreatureData?.GetCreatureDataId();
      s = t.PassengerEntity?.CheckGetComponent(0)?.GetCreatureDataId();
      if (i && s) {
        if (e) {
          ModelManager_1.ModelManager.CameraModel.DitherEntityGroups.Union(i, s);
          if ((e = this.Entity.CheckGetComponent(247)?.Actor?.DitherEffectController?.CurrentDitherValue) !== undefined) {
            t.PassengerEntity?.CheckGetComponent(3)?.Actor?.SetDitherEffect(e, 1);
          }
        } else {
          ModelManager_1.ModelManager.CameraModel.DitherEntityGroups.Delete(i);
          ModelManager_1.ModelManager.CameraModel.DitherEntityGroups.Delete(s);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 72, "MotorcyclePerformComponent.SetDitherEnable: 载具或乘客不存在", ["vehicleCreatureDataId", i], ["passengerCreatureDataId", s]);
      }
    }
  }
  SetDitherCollisionEnable(t) {
    var e;
    if (this.ActorComp?.Owner?.IsA(UE.BP_Motor_BaseVehicle_C.StaticClass())) {
      (e = this.ActorComp.Owner).CapsuleForDither.SetCollisionEnabled(t ? 1 : 0);
      e.CapsuleForDither.SetGenerateOverlapEvents(t);
    }
  }
  InitMotorcycleDither() {
    var t;
    var e;
    var i;
    if (this.ActorComp?.Owner?.IsA(UE.BP_Motor_BaseVehicle_C.StaticClass())) {
      (t = this.ActorComp.Owner).CapsuleForDither.OnComponentBeginOverlap.Add(this.OnComponentBeginOverlap);
      this.DitherCapsuleHalfHeight = t.CapsuleForDither.CapsuleHalfHeight;
      this.DitherCapsuleRadius = t.CapsuleForDither.CapsuleRadius;
      this.DitherDepthCurve = t.深度虚化值曲线;
      this.DitherNpcRadius = Math.max(MIN_NPC_DITHER_RADIUS, Math.min(t.虚化碰撞NPC半径, MAX_NPC_DITHER_RADIUS));
      this.TmpTrans1.FromUeTransform(this.ActorComp.ActorTransform);
      this.TmpTrans2.FromUeTransform(t.CapsuleForDither.D_K2_GetComponentToWorld());
      this.DitherCapsuleRelativeTrans.FromUeTransform(this.TmpTrans2.ToUeTransform().GetRelativeTransform(this.TmpTrans1.ToUeTransform()));
      e = (this.DitherNpcRadius + this.DitherCapsuleHalfHeight) / this.DitherCapsuleHalfHeight;
      i = (this.DitherNpcRadius + this.DitherCapsuleRadius) / this.DitherCapsuleRadius;
      this.TmpVector1.Set(i, i, e);
      t.CapsuleForDither.SetWorldScale3D(this.TmpVector1.ToUeVectorOld());
      i = this.DitherCapsuleHalfHeight + this.DitherNpcRadius + 100;
      this.DitherRemoveDistSquared = Math.max(this.DitherRemoveDistSquared, i * i);
    }
  }
  HandlePendingDitherActor() {
    if (this.PendingDitherActorSet.size) {
      this.CalculateCapsuleTransform();
      var t;
      var e;
      var i = [];
      for (const s of this.PendingDitherActorSet) {
        if (s.IsValid()) {
          if ((t = (e = s.GetEntityNoBlueprint())?.GetComponent(2))?.Valid) {
            if (e.GetComponent(242)?.VehicleEntity === this.Entity || Vector_1.Vector.DistSquared(t.ActorLocationProxy, this.ActorComp.ActorLocationProxy) > this.DitherRemoveDistSquared) {
              i.push(s);
              s.SetDitherEffect(1, 1);
            } else {
              e = this.CalcDitherValue(t);
              s.SetDitherEffect(e, 1);
            }
          } else {
            i.push(s);
          }
        } else {
          i.push(s);
        }
      }
      for (const r of i) {
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
    var e;
    if (MotorcyclePerformComponent_1.DitherDebugMode) {
      t = (this.DitherNpcRadius + this.DitherCapsuleHalfHeight) / this.DitherCapsuleHalfHeight;
      e = (this.DitherNpcRadius + this.DitherCapsuleRadius) / this.DitherCapsuleRadius;
      this.CapsulePointA.Addition(this.CapsulePointB, MathUtils_1.MathUtils.CommonTempVector);
      MathUtils_1.MathUtils.CommonTempVector.MultiplyEqual(0.5);
      UE.KismetSystemLibrary.D_DrawDebugCapsule(this.ActorComp?.Actor, MathUtils_1.MathUtils.CommonTempVector.ToUeVector(), this.DitherCapsuleHalfHeight, this.DitherCapsuleRadius, this.TmpTrans2.GetRotation().Rotator().ToUeRotator(), new UE.LinearColor(1, 0, 0, 1), 0, 5);
      UE.KismetSystemLibrary.D_DrawDebugCapsule(this.ActorComp?.Actor, MathUtils_1.MathUtils.CommonTempVector.ToUeVector(), this.DitherCapsuleHalfHeight * t, this.DitherCapsuleRadius * e, this.TmpTrans2.GetRotation().Rotator().ToUeRotator(), new UE.LinearColor(0, 1, 0, 1), 0, 5);
    }
  }
  FixBornLocation(t, e) {
    super.FixBornLocation();
    this.ActorComp?.SetActorLocation(t.ToUeVector(), e, false);
  }
  TryEnter(t, e) {
    e = super.TryEnter(t, e);
    if (e && t.Id === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()) {
      this.SendGetOnLogEvent(t);
    }
    return e;
  }
  TryEnterAtOnce(t, e, i = "") {
    e = super.TryEnterAtOnce(t, e, i);
    if (e > 0 && t.Id === Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint()) {
      this.SendGetOnLogEvent(t);
    }
    return e;
  }
  SendGetOnLogEvent(t) {
    var e;
    var t = t.GetComponent(1);
    if (t) {
      (e = new LogReportDefine_1.MotorSummonGetOnLogEvent()).pos_x = t.ActorLocationProxy.X;
      e.pos_y = t.ActorLocationProxy.Y;
      e.pos_z = t.ActorLocationProxy.Z;
      e.operation_type = 2;
      LogReportController_1.LogReportController.LogReport(e);
    }
  }
};
MotorcyclePerformComponent.DitherDebugMode = false;
MotorcyclePerformComponent = MotorcyclePerformComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(268)], MotorcyclePerformComponent);
exports.MotorcyclePerformComponent = MotorcyclePerformComponent; //# sourceMappingURL=MotorcyclePerformComponent.js.map