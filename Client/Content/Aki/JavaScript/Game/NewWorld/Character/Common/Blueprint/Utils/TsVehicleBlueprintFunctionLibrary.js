"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsVehicleBlueprintFunctionLibrary = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Log_1 = require("../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../../Global");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const LogReportController_1 = require("../../../../../Module/LogReport/LogReportController");
const LogReportDefine_1 = require("../../../../../Module/LogReport/LogReportDefine");
const UiCameraAnimationManager_1 = require("../../../../../Module/UiCameraAnimation/UiCameraAnimationManager");
const TsBaseVehicle_1 = require("../../../../Vehicle/TsBaseVehicle");
const FollowUtils_1 = require("../../Component/Abilities/Follow/FollowUtils");
const photographTagId = 2108050602;
const disableMotorcycleTagId = 379437700;
class TsVehicleBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static UpdateVehiclePerformData(e, t, r, i) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 260);
    if (e) {
      (0, puerts_1.$set)(t, e.IsBeingImpacted);
      (0, puerts_1.$set)(r, e.CollisionDirection);
      (0, puerts_1.$set)(i, e.CollisionStrength);
    }
  }
  static UpdateDrivedVehiclePerformData(e, t, r, i) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 242)?.VehicleEntity?.GetComponent(260);
    if (e) {
      (0, puerts_1.$set)(t, e.IsBeingImpacted);
      (0, puerts_1.$set)(r, e.CollisionDirection);
      (0, puerts_1.$set)(i, e.CollisionStrength);
    }
  }
  static GetVehicleImpactInfo(e, t, r, i) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 268);
    if (e) {
      TsVehicleBlueprintFunctionLibrary.GetVehicleImpactInfoInternal(e, t, r, i);
    }
  }
  static GetDrivingVehicleImpactInfo(e, t, r, i) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 242)?.VehicleEntity?.GetComponent(268);
    if (e) {
      TsVehicleBlueprintFunctionLibrary.GetVehicleImpactInfoInternal(e, t, r, i);
    }
  }
  static GetVehicleImpactInfoInternal(e, t, r, i) {
    (0, puerts_1.$set)(t, e.IsBeingImpacted);
    (0, puerts_1.$set)(r, e.ImpactedVelocity.ToUeVectorOld());
    (0, puerts_1.$set)(i, e.CacheImpactHitResult);
  }
  static UpdateAnimInfo(e) {
    TsVehicleBlueprintFunctionLibrary.UpdateAnimInfoMove(e);
    TsVehicleBlueprintFunctionLibrary.UpdateAnimInfoUnifiedState(e);
  }
  static UpdateAnimInfoMove(e) {
    var t;
    var r;
    var i;
    var n = EntitySystem_1.EntitySystem.GetComponent(e, 248);
    if (n?.Valid && (t = n.MainAnimInstance?.LogicParams)?.IsValid() && (n = n.AnimLogicParamsSetter, (r = EntitySystem_1.EntitySystem.GetComponent(e, 247))?.Valid && (i = r.InputDirectProxy, n.InputDirect.Equals(i) || (n.InputDirect.DeepCopy(i), t.InputDirectRef = i.ToUeVectorOld()), i = r.InputRotatorProxy, n.InputRotator.Equals(i) || (n.InputRotator.DeepCopy(i), t.InputRotatorRef = i.ToUeRotator())), (r = EntitySystem_1.EntitySystem.GetComponent(e, 249))?.Valid) && (i = r.Acceleration, n.Acceleration.Equals(i) || (n.Acceleration.DeepCopy(i), t.AccelerationRef = i.ToUeVectorOld()), e = r.IsMoving, n.IsMoving !== e && (n.IsMoving = e, t.IsMovingRef = e), i = r.HasMoveInput, n.HasMoveInput !== i && (n.HasMoveInput = i, t.HasMoveInputRef = i), e = r.Speed, n.Speed !== e)) {
      n.Speed = e;
      t.SpeedRef = e;
    }
  }
  static UpdateAnimInfoUnifiedState(e) {
    var t;
    var r;
    var e = EntitySystem_1.EntitySystem.GetComponent(e, 248);
    if (e?.Valid && (t = e.MainAnimInstance?.LogicParams)?.IsValid() && (e = e.AnimLogicParamsSetter, r = ModelManager_1.ModelManager.PlotModel.IsInInteraction || ModelManager_1.ModelManager.PlotModel.IsInPlot && ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !== "LevelD", e.IsInPerformingPlot !== r && (e.IsInPerformingPlot = r, t.bIsInPerformingPlot = r), r = ModelManager_1.ModelManager.PlotModel.IsInPlot && (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelA" || ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelB"), e.IsInSequence !== r && (e.IsInSequence = r, t.bIsInSequence = r), r = UiCameraAnimationManager_1.UiCameraAnimationManager.IsDisablePlayer(), e.IsInUiCamera !== r)) {
      e.IsInUiCamera = r;
      t.bIsInUiCamera = r;
    }
  }
  static GetAndResetEnterSprint(e) {
    var t;
    var e = EntitySystem_1.EntitySystem.GetComponent(e, 260);
    return !!e && (t = e.IsEnterSprint, e.IsEnterSprint = false, t);
  }
  static GetDrivedVehicleSeatRot(e, t) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 242);
    if (!e?.VehicleEntity) {
      return false;
    }
    var r = e.Seat;
    if (r === -1) {
      return false;
    }
    e = e.VehicleEntity.GetComponent(260);
    if (!e?.IsWaterfallMove) {
      MathUtils_1.MathUtils.CommonTempRotator.Reset();
      if (!e?.GetDrivedVehicleSeatLocalRot(r, MathUtils_1.MathUtils.CommonTempRotator)) {
        return false;
      }
      e = (0, puerts_1.$unref)(t);
      e.Pitch = MathUtils_1.MathUtils.CommonTempRotator.Pitch;
      e.Yaw = MathUtils_1.MathUtils.CommonTempRotator.Yaw;
      e.Roll = MathUtils_1.MathUtils.CommonTempRotator.Roll;
    }
    return true;
  }
  static ConvertAngleToPassengerSpace(e, t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(e, 242);
    if (e?.IsOnVehicle) {
      e = -e.SeatReletiveTrans.GetRotation().Rotator().Yaw;
      return MathUtils_1.MathUtils.WrapAngle(t + e);
    } else {
      return 0;
    }
  }
  static GetVehicleVelocity(e, t) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 247);
    if (!e?.Actor?.IsValid()) {
      return false;
    }
    var r = MathUtils_1.MathUtils.CommonTempVector;
    r.Reset();
    e.Entity.GetComponent(246)?.GetVehicleVelocity(r);
    e = (0, puerts_1.$unref)(t);
    e.X = r.X;
    e.Y = r.Y;
    e.Z = r.Z;
    return true;
  }
  static GetDrivedVehicleVelocity(e, t) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 242);
    if (!e?.IsOnVehicle) {
      return false;
    }
    if (!e.VehicleEntity.GetComponent(247)?.Actor?.IsValid()) {
      return false;
    }
    var r = MathUtils_1.MathUtils.CommonTempVector;
    r.Reset();
    e.VehicleEntity.GetComponent(246)?.GetVehicleVelocity(r);
    e = (0, puerts_1.$unref)(t);
    e.X = r.X;
    e.Y = r.Y;
    e.Z = r.Z;
    return true;
  }
  static GetVehicleRotiationSpeed(e) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 247);
    if (e?.Actor?.IsValid()) {
      return e.SimulatedRotYawSpeed;
    } else {
      return 0;
    }
  }
  static GetDrivedVehicleRotiationSpeed(e) {
    var e = EntitySystem_1.EntitySystem.GetComponent(e, 242);
    if (e?.IsOnVehicle && (e = e.VehicleEntity.GetComponent(247))?.Actor?.IsValid()) {
      return e.SimulatedRotYawSpeed;
    } else {
      return 0;
    }
  }
  static SmoothVehicleRotation(e, t, r, i) {
    EntitySystem_1.EntitySystem.GetComponent(e, 249)?.SmoothVehicleRotation(t, r, Time_1.Time.DeltaTimeSeconds, false, i);
  }
  static AddBuffToVehicleFromGA(e, t, r, i, n) {
    var o;
    var l;
    var a = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e);
    if (a && (o = (e = EntitySystem_1.EntitySystem.GetComponent(e, 42)?.GetSkill(Number(i)))?.MNc, e = e?.AbilityClass?.GetName(), t instanceof TsBaseVehicle_1.default)) {
      if (l = t.VehicleActorComponent.Entity.CheckGetComponent(185)) {
        l.AddBuff(Number(r), {
          InstigatorId: a,
          Reason: `技能${i}GA${e}的buff添加`,
          PreMessageId: o,
          OuterStackCount: n
        });
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 82, "添加buff对象没有BuffComponent", ["Target", t.GetName()], ["BuffId", r]);
      }
    }
  }
  static IsSpecificVehicle(e, t) {
    e = e.CheckGetComponent(242);
    return !!e && !!e.VehicleEntity?.Valid && e.VehicleType === t;
  }
  static TryGetPlayerMotorEntityId() {
    var e = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (e) {
      return (TsVehicleBlueprintFunctionLibrary.IsSpecificVehicle(e.Entity, "Motorcycle") ? e.Entity.CheckGetComponent(242)?.VehicleEntity : (e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), FollowUtils_1.FollowUtils.GetPlayerFollowVehicle(e, "Motorcycle")?.Entity))?.Id;
    }
  }
  static ClearMotorTimer() {
    if (TimerSystem_1.TimerSystem.Has(TsVehicleBlueprintFunctionLibrary.MotorCheckDistanceTimerHandle)) {
      TimerSystem_1.TimerSystem.Remove(TsVehicleBlueprintFunctionLibrary.MotorCheckDistanceTimerHandle);
    }
    if (TimerSystem_1.TimerSystem.Has(TsVehicleBlueprintFunctionLibrary.MotorDisappearTimerHandle)) {
      TimerSystem_1.TimerSystem.Remove(TsVehicleBlueprintFunctionLibrary.MotorDisappearTimerHandle);
    }
    if (TimerSystem_1.TimerSystem.Has(TsVehicleBlueprintFunctionLibrary.MotorHangTimerHandle)) {
      TimerSystem_1.TimerSystem.Remove(TsVehicleBlueprintFunctionLibrary.MotorHangTimerHandle);
    }
    var e;
    var t = TsVehicleBlueprintFunctionLibrary.CurrentMotor?.deref();
    if (t?.IsValid() && t.CharRenderingComponent?.IsValid()) {
      if (EventSystem_1.EventSystem.HasWithTarget(t.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, TsVehicleBlueprintFunctionLibrary.OnAddMaterialController)) {
        EventSystem_1.EventSystem.RemoveWithTarget(t.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, TsVehicleBlueprintFunctionLibrary.OnAddMaterialController);
      }
      if (EventSystem_1.EventSystem.HasWithTarget(t.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, TsVehicleBlueprintFunctionLibrary.OnRemoveMaterialController)) {
        EventSystem_1.EventSystem.RemoveWithTarget(t.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, TsVehicleBlueprintFunctionLibrary.OnRemoveMaterialController);
      }
      if ((e = t.VehicleActorComponent?.Entity.CheckGetComponent(0)?.GetPlayerId()) && (e = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(e)?.CheckGetComponent(212))) {
        e.RemoveTagAddOrRemoveListener(disableMotorcycleTagId, TsVehicleBlueprintFunctionLibrary.OnDisableMotorcycleTagChanged);
      }
      TsVehicleBlueprintFunctionLibrary.MotorDisapperBuffContext = undefined;
      t.SetDitherEffect(1, 1);
    }
  }
  static ClearMotorAppearanceTag(e) {
    if (e instanceof TsBaseVehicle_1.default && (e = e.VehicleActorComponent.Entity.CheckGetComponent(217))?.HasTag(photographTagId)) {
      e?.RemoveTag(photographTagId);
    }
  }
  static ExitMotorAppearance(e, t, r) {
    TsVehicleBlueprintFunctionLibrary.ClearMotorTimer();
    var i = TsVehicleBlueprintFunctionLibrary.CurrentMotor?.deref();
    if (i?.IsValid() && i.VehicleActorComponent) {
      TsVehicleBlueprintFunctionLibrary.ClearMotorAppearanceTag(i);
      if (EventSystem_1.EventSystem.HasWithTarget(i.VehicleActorComponent.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, TsVehicleBlueprintFunctionLibrary.OnVehicleBeenEntered)) {
        EventSystem_1.EventSystem.RemoveWithTarget(i.VehicleActorComponent.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, TsVehicleBlueprintFunctionLibrary.OnVehicleBeenEntered);
      }
      if (t > 0 && i.CharRenderingComponent) {
        if (EventSystem_1.EventSystem.HasWithTarget(i.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, TsVehicleBlueprintFunctionLibrary.OnAddMaterialController)) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Motor", 72, "ExitMotorAppearance OnAddMaterialController 事件已存在");
          }
        } else {
          EventSystem_1.EventSystem.AddWithTarget(i.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, TsVehicleBlueprintFunctionLibrary.OnAddMaterialController);
        }
        if (EventSystem_1.EventSystem.HasWithTarget(i.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, TsVehicleBlueprintFunctionLibrary.OnRemoveMaterialController)) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Motor", 72, "ExitMotorAppearance OnRemoveMaterialController 事件已存在");
          }
        } else {
          EventSystem_1.EventSystem.AddWithTarget(i.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, TsVehicleBlueprintFunctionLibrary.OnRemoveMaterialController);
        }
        TsVehicleBlueprintFunctionLibrary.AddBuffToVehicleFromGA(e, i, t, r, 1);
      } else {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(i.VehicleActorComponent.Entity, false, "OnRemoveMaterialController", true);
        TsVehicleBlueprintFunctionLibrary.CurrentMotor = undefined;
      }
    } else {
      TsVehicleBlueprintFunctionLibrary.CurrentMotor = undefined;
    }
  }
  static MotorAppearance(i, t, n, e = true, r = 2, o = BigInt(0), l = 1000, a = 60, c = BigInt(0)) {
    if (t instanceof TsBaseVehicle_1.default && t.VehicleActorComponent) {
      TsVehicleBlueprintFunctionLibrary.ClearMotorTimer();
      var s = r * CommonDefine_1.MILLIONSECOND_PER_SECOND;
      var u = a * CommonDefine_1.MILLIONSECOND_PER_SECOND;
      if (s < TimerSystem_1.MIN_TIME || u < TimerSystem_1.MIN_TIME) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Motor", 72, "MotorAppearance 时间设置 太小了", ["hangTime", r], ["disappearTime", a]);
        }
      } else {
        if (e && (r = t.VehicleActorComponent.Entity.CheckGetComponent(217))?.HasTag(photographTagId)) {
          r?.AddTag(photographTagId);
        }
        TsVehicleBlueprintFunctionLibrary.CurrentMotor = new WeakRef(t);
        const _ = t.VehicleActorComponent.Entity.CheckGetComponent(265);
        _?.SetForceSpeed(Vector_1.Vector.ZeroVector);
        _?.DisableUeMovementTick("MotorAppearance");
        t.SetDitherEffect(1, 1);
        if (EventSystem_1.EventSystem.HasWithTarget(t.VehicleActorComponent.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, TsVehicleBlueprintFunctionLibrary.OnVehicleBeenEntered)) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Motor", 72, "MotorAppearance 重复添加事件", ["entityId", i], ["motor", t], ["skillId", n]);
          }
        } else {
          EventSystem_1.EventSystem.OnceWithTarget(t.VehicleActorComponent.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, TsVehicleBlueprintFunctionLibrary.OnVehicleBeenEntered);
        }
        var a = t.VehicleActorComponent.Entity.CheckGetComponent(0)?.GetPlayerId();
        if (a && ((r = (e = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(a))?.CheckGetComponent(212)) && r.AddTagAddOrRemoveListener(disableMotorcycleTagId, TsVehicleBlueprintFunctionLibrary.OnDisableMotorcycleTagChanged), a = e?.GetComponent(1))) {
          (r = new LogReportDefine_1.MotorSummonGetOnLogEvent()).pos_x = a.ActorLocationProxy.X;
          r.pos_y = a.ActorLocationProxy.Y;
          r.pos_z = a.ActorLocationProxy.Z;
          r.operation_type = 1;
          LogReportController_1.LogReportController.LogReport(r);
        }
        TsVehicleBlueprintFunctionLibrary.MotorDisapperBuffContext = {
          EntityId: i,
          BuffId: c,
          SkillId: n
        };
        TsVehicleBlueprintFunctionLibrary.MotorHangTimerHandle = TimerSystem_1.TimerSystem.Delay(e => {
          if (t?.IsValid() && (_?.EnableUeMovementTick("MotorAppearance"), o > 0)) {
            TsVehicleBlueprintFunctionLibrary.AddBuffToVehicleFromGA(i, t, o, n, 1);
          }
        }, s);
        TsVehicleBlueprintFunctionLibrary.MotorDisappearTimerHandle = TimerSystem_1.TimerSystem.Delay(e => {
          TsVehicleBlueprintFunctionLibrary.ExitMotorAppearance(i, c, n);
        }, u);
        TsVehicleBlueprintFunctionLibrary.MotorCheckDistanceTimerHandle = TimerSystem_1.TimerSystem.Forever(e => {
          var t;
          var r = TsVehicleBlueprintFunctionLibrary.CurrentMotor?.deref();
          if (r?.IsValid() && (t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.CheckGetComponent(1)?.ActorLocationProxy, r = r.VehicleActorComponent?.Entity.CheckGetComponent(1)?.ActorLocationProxy, t) && r && (t.Subtraction(r, MathUtils_1.MathUtils.CommonTempVector), MathUtils_1.MathUtils.CommonTempVector.SizeSquared() > l * l)) {
            TsVehicleBlueprintFunctionLibrary.ExitMotorAppearance(i, c, n);
          }
        }, CommonDefine_1.MILLIONSECOND_PER_SECOND * 0.5);
      }
    }
  }
  static SummonAndRideMotorcycle(e, t, r) {
    const i = EntitySystem_1.EntitySystem.GetComponent(e, 3);
    if (i) {
      var n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      const a = FollowUtils_1.FollowUtils.GetPlayerFollowVehicle(n, "Motorcycle");
      if (a?.Valid && a.Entity) {
        var o = a.Entity.GetComponent(265);
        if (o) {
          o = o.GetMotorcycleSummonTrans(e, t);
          if (o) {
            r = Number(r);
            if (r !== 0) {
              if (!a.Entity.GetComponent(42)?.BeginSkill(r, {
                Reason: "SummonAndRideMotorcycle"
              })) {
                if (Log_1.Log.CheckWarn()) {
                  Log_1.Log.Warn("Vehicle", 67, "SummonAndRideMotorcycle Error. Begin Skill Failed");
                }
                return;
              }
            }
            var r = a.Entity.GetComponent(247);
            r.SetActorTransform(o.ToUeTransform(), "SummonAndRideMotorcycle", false, 1);
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(a.Entity, true, "SummonAndRideMotorcycle", false);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Vehicle", 6, "SummonAndRideMotorcycle Step1", ["Actor", i.Actor.GetName()], ["tmpTrans", o]);
            }
            TimerSystem_1.TimerSystem.Next(() => {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Vehicle", 6, "SummonAndRideMotorcycle Step2", ["motorHandle.Valid", a.Valid], ["actorComp.Entity.Active", i.Entity.Active]);
              }
              if (a.Valid && i.Entity.Active) {
                a.Entity.GetComponent(250)?.Enter(i.Entity, 0);
              }
            });
            var o = Protocol_1.Aki.Protocol.Fxg.create();
            o.F4n = 0;
            o.lxg = MathUtils_1.MathUtils.NumberToLong(r.CreatureData.GetCreatureDataId());
            o.wn1 = Protocol_1.Aki.Protocol.wn1.create();
            o.wn1.l8n = Protocol_1.Aki.Protocol.Gks.create();
            var l = t.GetLocation();
            o.wn1.l8n.X = l.X;
            o.wn1.l8n.Y = l.Y;
            o.wn1.l8n.Z = l.Z;
            o.wn1._8n = Protocol_1.Aki.Protocol.D2s.create();
            var l = t.GetRotation().Rotator();
            o.wn1._8n.Roll = l.Roll;
            o.wn1._8n.Pitch = l.Pitch;
            o.wn1._8n.Yaw = l.Yaw;
            CombatMessage_1.CombatNet.Send(15615, i.Entity, o);
            var t = new LogReportDefine_1.MotorSummonGetOnLogEvent();
            t.pos_x = i.ActorLocationProxy.X;
            t.pos_y = i.ActorLocationProxy.Y;
            t.pos_z = i.ActorLocationProxy.Z;
            t.operation_type = 3;
            LogReportController_1.LogReportController.LogReport(t);
            return r?.Actor;
          }
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Vehicle", 67, "SummonAndRideMotorcycle Error. SummonTrans Undefined");
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Vehicle", 6, "SummonAndRideMotorcycle Error. Not a Motor.", ["Actor", i.Actor.GetName()], ["follower", a.Entity.GetComponent(1)?.Owner?.GetName()]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Vehicle", 6, "SummonAndRideMotorcycle Error. No Follower.", ["Actor", i.Actor.GetName()], ["PlayerId", n]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Vehicle", 6, "SummonAndRideMotorcycle Error. No ActorComp.", ["ActorEntityId", e]);
    }
  }
  static GetPassengerOnVehicle(e, t) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 250);
    if (e) {
      e = e.SeatInfoMap.get(t);
      if (e) {
        return e.PassengerEntity?.GetComponent(3)?.Actor;
      }
    }
  }
  static SetMotorAndroidInitParams(t) {
    if (Info_1.Info.IsAndroidPlatform()) {
      var r = new UE.MotorShapeConfig();
      r.BodyShape = t.MotorShapeConfig.BodyShape;
      r.FrontWheelShape = t.MotorShapeConfig.FrontWheelShape;
      r.BackWheelShape = t.MotorShapeConfig.BackWheelShape;
      for (let e = 0; e < t.MotorShapeConfig.BodyOtherShapes.Num(); ++e) {
        r.BodyOtherShapes.Add(t.MotorShapeConfig.BodyOtherShapes.Get(e));
      }
      r.FrontWheelShape.AccurateCheckCount = 3;
      r.BackWheelShape.AccurateCheckCount = 3;
      t.MotorShapeConfig = r;
      t.MaxSimulationIterations = 1;
    }
  }
  static NeedSimulateMotorIk(e) {
    return !Info_1.Info.IsAndroidPlatform() && !Info_1.Info.IsIosPlatform() && (e = EntitySystem_1.EntitySystem.GetComponent(e, 0)) !== undefined && e.GetPlayerId() !== ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
  }
}
(exports.TsVehicleBlueprintFunctionLibrary = TsVehicleBlueprintFunctionLibrary).MotorHangTimerHandle = undefined;
TsVehicleBlueprintFunctionLibrary.MotorDisappearTimerHandle = undefined;
TsVehicleBlueprintFunctionLibrary.MotorCheckDistanceTimerHandle = undefined;
TsVehicleBlueprintFunctionLibrary.CurrentMotor = undefined;
TsVehicleBlueprintFunctionLibrary.MotorDisapperBuffContext = undefined;
TsVehicleBlueprintFunctionLibrary.OnVehicleBeenEntered = e => {
  TsVehicleBlueprintFunctionLibrary.ClearMotorTimer();
  e = e.VehicleEntity?.CheckGetComponent(217);
  if (e?.HasTag(photographTagId)) {
    e?.RemoveTag(photographTagId);
  }
  TsVehicleBlueprintFunctionLibrary.CurrentMotor = undefined;
  ModelManager_1.ModelManager.VehicleModel.MaterialControllerHandles.clear();
};
TsVehicleBlueprintFunctionLibrary.OnAddMaterialController = (e, t, r) => {
  ModelManager_1.ModelManager.VehicleModel.MaterialControllerHandles.add(r);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Motor", 72, "OnAddMaterialController", ["handle", r], ["handles", ModelManager_1.ModelManager.VehicleModel.MaterialControllerHandles]);
  }
};
TsVehicleBlueprintFunctionLibrary.OnRemoveMaterialController = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Motor", 72, "OnRemoveMaterialController", ["handle", e], ["CurrentHandles", ModelManager_1.ModelManager.VehicleModel.MaterialControllerHandles]);
  }
  if (ModelManager_1.ModelManager.VehicleModel.MaterialControllerHandles.delete(e) && ModelManager_1.ModelManager.VehicleModel.MaterialControllerHandles.size === 0 && (e = TsVehicleBlueprintFunctionLibrary.CurrentMotor?.deref(), TsVehicleBlueprintFunctionLibrary.CurrentMotor = undefined, e?.IsValid()) && e.VehicleActorComponent && e.CharRenderingComponent) {
    ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(e.VehicleActorComponent.Entity, false, "OnRemoveMaterialController", true);
    if (EventSystem_1.EventSystem.HasWithTarget(e.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, TsVehicleBlueprintFunctionLibrary.OnAddMaterialController)) {
      EventSystem_1.EventSystem.RemoveWithTarget(e.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, TsVehicleBlueprintFunctionLibrary.OnAddMaterialController);
    }
    EventSystem_1.EventSystem.RemoveWithTarget(e.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, TsVehicleBlueprintFunctionLibrary.OnRemoveMaterialController);
  }
};
TsVehicleBlueprintFunctionLibrary.OnDisableMotorcycleTagChanged = (e, t) => {
  if (e === disableMotorcycleTagId) {
    e = TsVehicleBlueprintFunctionLibrary.MotorDisapperBuffContext ?? {
      EntityId: 0,
      BuffId: BigInt(0),
      SkillId: ""
    };
    TsVehicleBlueprintFunctionLibrary.ExitMotorAppearance(e.EntityId, e.BuffId, e.SkillId);
  }
};
exports.default = TsVehicleBlueprintFunctionLibrary; //# sourceMappingURL=TsVehicleBlueprintFunctionLibrary.js.map