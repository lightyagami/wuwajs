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
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../../Global");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiCameraAnimationManager_1 = require("../../../../../Module/UiCameraAnimation/UiCameraAnimationManager");
const TsBaseVehicle_1 = require("../../../../Vehicle/TsBaseVehicle");
const FollowFunctionLibrary_1 = require("../../Component/Abilities/Follow/FollowFunctionLibrary");
const photographTagId = 2108050602;
const disableMotorcycleTagId = 379437700;
class TsVehicleBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static UpdateVehiclePerformData(e, t, i, r) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 260);
    if (e) {
      (0, puerts_1.$set)(t, e.IsBeingImpacted);
      (0, puerts_1.$set)(i, e.CollisionDirection);
      (0, puerts_1.$set)(r, e.CollisionStrength);
    }
  }
  static UpdateDrivedVehiclePerformData(e, t, i, r) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 242)?.VehicleEntity?.GetComponent(260);
    if (e) {
      (0, puerts_1.$set)(t, e.IsBeingImpacted);
      (0, puerts_1.$set)(i, e.CollisionDirection);
      (0, puerts_1.$set)(r, e.CollisionStrength);
    }
  }
  static GetVehicleImpactInfo(e, t, i, r) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 267);
    if (e) {
      TsVehicleBlueprintFunctionLibrary.GetVehicleImpactInfoInternal(e, t, i, r);
    }
  }
  static GetDrivingVehicleImpactInfo(e, t, i, r) {
    e = EntitySystem_1.EntitySystem.GetComponent(e, 242)?.VehicleEntity?.GetComponent(267);
    if (e) {
      TsVehicleBlueprintFunctionLibrary.GetVehicleImpactInfoInternal(e, t, i, r);
    }
  }
  static GetVehicleImpactInfoInternal(e, t, i, r) {
    (0, puerts_1.$set)(t, e.IsBeingImpacted);
    (0, puerts_1.$set)(i, e.ImpactedVelocity.ToUeVectorOld());
    (0, puerts_1.$set)(r, e.CacheImpactHitResult);
  }
  static UpdateAnimInfo(e) {
    TsVehicleBlueprintFunctionLibrary.UpdateAnimInfoMove(e);
    TsVehicleBlueprintFunctionLibrary.UpdateAnimInfoUnifiedState(e);
  }
  static UpdateAnimInfoMove(e) {
    var t;
    var i;
    var r;
    var n = EntitySystem_1.EntitySystem.GetComponent(e, 248);
    if (n?.Valid && (t = n.MainAnimInstance?.LogicParams)?.IsValid() && (n = n.AnimLogicParamsSetter, (i = EntitySystem_1.EntitySystem.GetComponent(e, 247))?.Valid && (r = i.InputDirectProxy, n.InputDirect.Equals(r) || (n.InputDirect.DeepCopy(r), t.InputDirectRef = r.ToUeVectorOld()), r = i.InputRotatorProxy, n.InputRotator.Equals(r) || (n.InputRotator.DeepCopy(r), t.InputRotatorRef = r.ToUeRotator())), (i = EntitySystem_1.EntitySystem.GetComponent(e, 249))?.Valid) && (r = i.Acceleration, n.Acceleration.Equals(r) || (n.Acceleration.DeepCopy(r), t.AccelerationRef = r.ToUeVectorOld()), e = i.IsMoving, n.IsMoving !== e && (n.IsMoving = e, t.IsMovingRef = e), r = i.HasMoveInput, n.HasMoveInput !== r && (n.HasMoveInput = r, t.HasMoveInputRef = r), e = i.Speed, n.Speed !== e)) {
      n.Speed = e;
      t.SpeedRef = e;
    }
  }
  static UpdateAnimInfoUnifiedState(e) {
    var t;
    var i;
    var e = EntitySystem_1.EntitySystem.GetComponent(e, 248);
    if (e?.Valid && (t = e.MainAnimInstance?.LogicParams)?.IsValid() && (e = e.AnimLogicParamsSetter, i = ModelManager_1.ModelManager.PlotModel.IsInInteraction || ModelManager_1.ModelManager.PlotModel.IsInPlot && ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !== "LevelD", e.IsInPerformingPlot !== i && (e.IsInPerformingPlot = i, t.bIsInPerformingPlot = i), i = ModelManager_1.ModelManager.PlotModel.IsInPlot && (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelA" || ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelB"), e.IsInSequence !== i && (e.IsInSequence = i, t.bIsInSequence = i), i = UiCameraAnimationManager_1.UiCameraAnimationManager.IsDisablePlayer(), e.IsInUiCamera !== i)) {
      e.IsInUiCamera = i;
      t.bIsInUiCamera = i;
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
    var i = e.Seat;
    if (i === -1) {
      return false;
    }
    e = e.VehicleEntity.GetComponent(260);
    if (!e?.IsWaterfallMove) {
      MathUtils_1.MathUtils.CommonTempRotator.Reset();
      if (!e?.GetDrivedVehicleSeatLocalRot(i, MathUtils_1.MathUtils.CommonTempRotator)) {
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
    var i = MathUtils_1.MathUtils.CommonTempVector;
    i.Reset();
    e.Entity.GetComponent(246)?.GetVehicleVelocity(i);
    e = (0, puerts_1.$unref)(t);
    e.X = i.X;
    e.Y = i.Y;
    e.Z = i.Z;
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
    var i = MathUtils_1.MathUtils.CommonTempVector;
    i.Reset();
    e.VehicleEntity.GetComponent(246)?.GetVehicleVelocity(i);
    e = (0, puerts_1.$unref)(t);
    e.X = i.X;
    e.Y = i.Y;
    e.Z = i.Z;
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
  static SmoothVehicleRotation(e, t, i, r) {
    EntitySystem_1.EntitySystem.GetComponent(e, 249)?.SmoothVehicleRotation(t, i, Time_1.Time.DeltaTimeSeconds, false, r);
  }
  static AddBuffToVehicleFromGA(e, t, i, r, n) {
    var o;
    var l;
    var a = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e);
    if (a && (o = (e = EntitySystem_1.EntitySystem.GetComponent(e, 40)?.GetSkill(Number(r)))?.MNc, e = e?.AbilityClass?.GetName(), t instanceof TsBaseVehicle_1.default)) {
      if (l = t.VehicleActorComponent.Entity.CheckGetComponent(183)) {
        l.AddBuff(Number(i), {
          InstigatorId: a,
          Reason: `技能${r}GA${e}的buff添加`,
          PreMessageId: o,
          OuterStackCount: n
        });
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 82, "添加buff对象没有BuffComponent", ["Target", t.GetName()], ["BuffId", i]);
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
      return (TsVehicleBlueprintFunctionLibrary.IsSpecificVehicle(e.Entity, "Motorcycle") ? e.Entity.CheckGetComponent(242)?.VehicleEntity : (e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), FollowFunctionLibrary_1.FollowFunctionLibrary.GetPlayerFollowVehicle(e, "Motorcycle")?.Entity))?.Id;
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
    var e = TsVehicleBlueprintFunctionLibrary.CurrentMotor?.deref();
    if (e?.IsValid() && e.CharRenderingComponent?.IsValid()) {
      if (EventSystem_1.EventSystem.HasWithTarget(e.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, TsVehicleBlueprintFunctionLibrary.OnAddMaterialController)) {
        EventSystem_1.EventSystem.RemoveWithTarget(e.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, TsVehicleBlueprintFunctionLibrary.OnAddMaterialController);
      }
      if (EventSystem_1.EventSystem.HasWithTarget(e.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, TsVehicleBlueprintFunctionLibrary.OnRemoveMaterialController)) {
        EventSystem_1.EventSystem.RemoveWithTarget(e.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, TsVehicleBlueprintFunctionLibrary.OnRemoveMaterialController);
      }
      e.SetDitherEffect(1, 1);
    }
  }
  static ClearMotorAppearanceTag(e) {
    if (e instanceof TsBaseVehicle_1.default && (e = e.VehicleActorComponent.Entity.CheckGetComponent(215))?.HasTag(photographTagId)) {
      e?.RemoveTag(photographTagId);
    }
  }
  static ExitMotorAppearance(e, t, i) {
    TsVehicleBlueprintFunctionLibrary.ClearMotorTimer();
    var r;
    var n = TsVehicleBlueprintFunctionLibrary.CurrentMotor?.deref();
    if (n?.IsValid() && n.VehicleActorComponent) {
      TsVehicleBlueprintFunctionLibrary.ClearMotorAppearanceTag(n);
      if (EventSystem_1.EventSystem.HasWithTarget(n.VehicleActorComponent.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, TsVehicleBlueprintFunctionLibrary.OnVehicleBeenEntered)) {
        EventSystem_1.EventSystem.RemoveWithTarget(n.VehicleActorComponent.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, TsVehicleBlueprintFunctionLibrary.OnVehicleBeenEntered);
      }
      if ((r = n.VehicleActorComponent.Entity.CheckGetComponent(0)?.GetPlayerId()) && (r = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(r)?.CheckGetComponent(210))) {
        r.RemoveTagAddOrRemoveListener(disableMotorcycleTagId, TsVehicleBlueprintFunctionLibrary.OnDisableMotorcycleTagChanged);
      }
      if (t > 0 && n.CharRenderingComponent) {
        if (EventSystem_1.EventSystem.HasWithTarget(n.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, TsVehicleBlueprintFunctionLibrary.OnAddMaterialController)) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Motor", 72, "ExitMotorAppearance OnAddMaterialController 事件已存在");
          }
        } else {
          EventSystem_1.EventSystem.AddWithTarget(n.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, TsVehicleBlueprintFunctionLibrary.OnAddMaterialController);
        }
        if (EventSystem_1.EventSystem.HasWithTarget(n.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, TsVehicleBlueprintFunctionLibrary.OnRemoveMaterialController)) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Motor", 72, "ExitMotorAppearance OnRemoveMaterialController 事件已存在");
          }
        } else {
          EventSystem_1.EventSystem.AddWithTarget(n.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, TsVehicleBlueprintFunctionLibrary.OnRemoveMaterialController);
        }
        TsVehicleBlueprintFunctionLibrary.AddBuffToVehicleFromGA(e, n, t, i, 1);
      } else {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(n.VehicleActorComponent.Entity, false, "OnRemoveMaterialController", true);
        TsVehicleBlueprintFunctionLibrary.CurrentMotor = undefined;
      }
    } else {
      TsVehicleBlueprintFunctionLibrary.CurrentMotor = undefined;
    }
  }
  static MotorAppearance(r, t, n, e = true, i = 2, o = BigInt(0), l = 1000, a = 60, c = BigInt(0)) {
    if (t instanceof TsBaseVehicle_1.default && t.VehicleActorComponent) {
      TsVehicleBlueprintFunctionLibrary.ClearMotorTimer();
      var s = i * CommonDefine_1.MILLIONSECOND_PER_SECOND;
      var u = a * CommonDefine_1.MILLIONSECOND_PER_SECOND;
      if (s < TimerSystem_1.MIN_TIME || u < TimerSystem_1.MIN_TIME) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Motor", 72, "MotorAppearance 时间设置 太小了", ["hangTime", i], ["disappearTime", a]);
        }
      } else {
        if (e && (i = t.VehicleActorComponent.Entity.CheckGetComponent(215))?.HasTag(photographTagId)) {
          i?.AddTag(photographTagId);
        }
        TsVehicleBlueprintFunctionLibrary.CurrentMotor = new WeakRef(t);
        const y = t.VehicleActorComponent.Entity.CheckGetComponent(265);
        y?.SetForceSpeed(Vector_1.Vector.ZeroVector);
        y?.DisableUeMovementTick("MotorAppearance");
        t.SetDitherEffect(1, 1);
        if (EventSystem_1.EventSystem.HasWithTarget(t.VehicleActorComponent.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, TsVehicleBlueprintFunctionLibrary.OnVehicleBeenEntered)) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Motor", 72, "MotorAppearance 重复添加事件", ["entityId", r], ["motor", t], ["skillId", n]);
          }
        } else {
          EventSystem_1.EventSystem.OnceWithTarget(t.VehicleActorComponent.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, TsVehicleBlueprintFunctionLibrary.OnVehicleBeenEntered);
        }
        a = t.VehicleActorComponent.Entity.CheckGetComponent(0)?.GetPlayerId();
        if (a && (e = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(a)?.CheckGetComponent(210))) {
          e.AddTagAddOrRemoveListener(disableMotorcycleTagId, TsVehicleBlueprintFunctionLibrary.OnDisableMotorcycleTagChanged);
        }
        TsVehicleBlueprintFunctionLibrary.MotorHangTimerHandle = TimerSystem_1.TimerSystem.Delay(e => {
          if (t?.IsValid() && (y?.EnableUeMovementTick("MotorAppearance"), o > 0)) {
            TsVehicleBlueprintFunctionLibrary.AddBuffToVehicleFromGA(r, t, o, n, 1);
          }
        }, s);
        TsVehicleBlueprintFunctionLibrary.MotorDisappearTimerHandle = TimerSystem_1.TimerSystem.Delay(e => {
          TsVehicleBlueprintFunctionLibrary.ExitMotorAppearance(r, c, n);
        }, u);
        TsVehicleBlueprintFunctionLibrary.MotorCheckDistanceTimerHandle = TimerSystem_1.TimerSystem.Forever(e => {
          var t;
          var i = TsVehicleBlueprintFunctionLibrary.CurrentMotor?.deref();
          if (i?.IsValid() && (t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.CheckGetComponent(1)?.ActorLocationProxy, i = i.VehicleActorComponent?.Entity.CheckGetComponent(1)?.ActorLocationProxy, t) && i && (t.Subtraction(i, MathUtils_1.MathUtils.CommonTempVector), MathUtils_1.MathUtils.CommonTempVector.SizeSquared() > l * l)) {
            TsVehicleBlueprintFunctionLibrary.ExitMotorAppearance(r, c, n);
          }
        }, CommonDefine_1.MILLIONSECOND_PER_SECOND * 0.5);
      }
    }
  }
  static SummonAndRideMotorcycle(e, t, i) {
    const r = EntitySystem_1.EntitySystem.GetComponent(e, 3);
    if (r) {
      var n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
      const l = FollowFunctionLibrary_1.FollowFunctionLibrary.GetPlayerFollowVehicle(n, "Motorcycle");
      if (l?.Valid && l.Entity) {
        var o = l.Entity.GetComponent(265);
        if (o) {
          o = o.GetMotorcycleSummonTrans(e, t);
          if (o) {
            t = Number(i);
            if (t !== 0) {
              if (!l.Entity.GetComponent(40)?.BeginSkill(t, {
                Reason: "SummonAndRideMotorcycle"
              })) {
                if (Log_1.Log.CheckWarn()) {
                  Log_1.Log.Warn("Vehicle", 67, "SummonAndRideMotorcycle Error. Begin Skill Failed");
                }
                return;
              }
            }
            i = l.Entity.GetComponent(247);
            i?.SetActorTransform(o.ToUeTransform(), "SummonAndRideMotorcycle", false, 1);
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(l.Entity, true, "SummonAndRideMotorcycle", true);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Vehicle", 6, "SummonAndRideMotorcycle Step1", ["Actor", r.Actor.GetName()], ["tmpTrans", o]);
            }
            TimerSystem_1.TimerSystem.Next(() => {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Vehicle", 6, "SummonAndRideMotorcycle Step2", ["motorHandle.Valid", l.Valid], ["actorComp.Entity.Active", r.Entity.Active]);
              }
              if (l.Valid && r.Entity.Active) {
                l.Entity.GetComponent(250)?.TryEnterAtOnce(r.Entity, 0, "SummonAndRideMotorcycle");
              }
            });
            return i?.Actor;
          }
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Vehicle", 67, "SummonAndRideMotorcycle Error. SummonTrans Undefined");
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Vehicle", 6, "SummonAndRideMotorcycle Error. Not a Motor.", ["Actor", r.Actor.GetName()], ["follower", l.Entity.GetComponent(1)?.Owner?.GetName()]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Vehicle", 6, "SummonAndRideMotorcycle Error. No Follower.", ["Actor", r.Actor.GetName()], ["PlayerId", n]);
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
      var i = new UE.MotorShapeConfig();
      i.BodyShape = t.MotorShapeConfig.BodyShape;
      i.FrontWheelShape = t.MotorShapeConfig.FrontWheelShape;
      i.BackWheelShape = t.MotorShapeConfig.BackWheelShape;
      for (let e = 0; e < t.MotorShapeConfig.BodyOtherShapes.Num(); ++e) {
        i.BodyOtherShapes.Add(t.MotorShapeConfig.BodyOtherShapes.Get(e));
      }
      i.FrontWheelShape.AccurateCheckCount = 3;
      i.BackWheelShape.AccurateCheckCount = 3;
      t.MotorShapeConfig = i;
      t.MaxSimulationIterations = 1;
    }
  }
}
(exports.TsVehicleBlueprintFunctionLibrary = TsVehicleBlueprintFunctionLibrary).MotorHangTimerHandle = undefined;
TsVehicleBlueprintFunctionLibrary.MotorDisappearTimerHandle = undefined;
TsVehicleBlueprintFunctionLibrary.MotorCheckDistanceTimerHandle = undefined;
TsVehicleBlueprintFunctionLibrary.CurrentMotor = undefined;
TsVehicleBlueprintFunctionLibrary.OnVehicleBeenEntered = e => {
  TsVehicleBlueprintFunctionLibrary.ClearMotorTimer();
  e = e.VehicleEntity?.CheckGetComponent(215);
  if (e?.HasTag(photographTagId)) {
    e?.RemoveTag(photographTagId);
  }
  TsVehicleBlueprintFunctionLibrary.CurrentMotor = undefined;
  ModelManager_1.ModelManager.VehicleModel.MaterialControllerHandles.clear();
};
TsVehicleBlueprintFunctionLibrary.OnAddMaterialController = (e, t, i) => {
  ModelManager_1.ModelManager.VehicleModel.MaterialControllerHandles.add(i);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Motor", 72, "OnAddMaterialController", ["handle", i], ["handles", ModelManager_1.ModelManager.VehicleModel.MaterialControllerHandles]);
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
    TsVehicleBlueprintFunctionLibrary.ExitMotorAppearance(0, BigInt(0), "");
  }
};
exports.default = TsVehicleBlueprintFunctionLibrary; //# sourceMappingURL=TsVehicleBlueprintFunctionLibrary.js.map