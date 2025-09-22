"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../../Core/Define/QueryTypeDefine");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const Quat_1 = require("../../../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../../../Utils/ColorUtils");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const CharacterSwimComponent_1 = require("../../Component/CharacterSwimComponent");
const MIN_ROTATOR_ANGLE = 10;
const MAX_SIMPLE_SWIM_DELTA = 0.15;
const tmpVector = Vector_1.Vector.Create();
const tmpVector2 = Vector_1.Vector.Create();
const tmpQuat = Quat_1.Quat.Create();
const tmpRotator = Rotator_1.Rotator.Create();
class TsMoveBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static SetActorRotationWithPriority(t, e, i = false, r = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    return !!t && t.SetActorRotationWithPriority(e, "BlueprintAPI." + r, 0, true, i);
  }
  static SetActorLocationWithContext(t, e, i = false, r = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    return !!t && t.SetActorLocation(e, "BlueprintAPI." + r, i);
  }
  static SetActorLocationAndRotationWithContext(t, e, i, r = false, n = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (t) {
      t.SetActorLocationAndRotation(e, i, "BlueprintAPI." + n, r);
    }
  }
  static SetActorRotationWithContext(t, e, i, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    return !!t && t.SetActorRotation(e, "BlueprintAPI." + r, i);
  }
  static AddActorWorldOffsetWithContext(t, e, i = true, r = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (t) {
      t.AddActorWorldOffset(e, "BlueprintAPI." + r, i);
    }
  }
  static AddActorWorldOffsetWithContextAndReset(t, e, i = true, r = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (t) {
      t.AddActorWorldOffsetWithReset(e, "BlueprintAPI." + r, i);
    }
  }
  static AddActorLocalOffsetWithContext(t, e, i = true, r = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (t) {
      t.AddActorLocalOffset(e, "BlueprintAPI." + r, i);
    }
  }
  static AddActorWorldRotationWithContext(t, e, i = false, r = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (t) {
      t.AddActorWorldRotation(e, "BlueprintAPI." + r, i);
    }
  }
  static AddActorLocalRotationWithContext(t, e, i = false, r = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (t) {
      t.AddActorLocalRotation(e, "BlueprintAPI." + r, i);
    }
  }
  static ActorTeleportToWithContext(t, e, i, r = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (t) {
      t.TeleportTo(e, i, "BlueprintAPI." + r);
    }
  }
  static SetActorLookAtWithContext(t, e, i) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    return !!t && (tmpVector.FromUeVector(e), tmpVector.SubtractionEqual(t.ActorLocationProxy), MathUtils_1.MathUtils.LookRotationUpFirst(tmpVector, t.MoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy, tmpQuat), tmpQuat.Rotator(tmpRotator), t.SetActorRotation(tmpRotator.ToUeRotator(), `BlueprintAPI.${i}.LookAt`, false));
  }
  static ActorKuroMoveAlongFloorWithContext(t, e, i, r = "unknown") {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (t) {
      t.KuroMoveAlongFloor(e, i, "BlueprintAPI." + r);
    }
  }
  static GetInputDirect(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 3)?.InputDirect ?? Vector_1.Vector.ZeroVectorDouble;
  }
  static SetInputDirect(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 3)?.SetInputDirect(e);
  }
  static GetInputRotator(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 3)?.InputRotatorProxy.ToUeRotator() ?? Rotator_1.Rotator.ZeroRotator;
  }
  static SetInputRotator(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 3)?.SetInputRotator(e);
  }
  static SetCharacterHidden(t, e, i, r) {
    if (i?.IsValid()) {
      i = `[蓝图:${i.GetName()}] ${r}`;
      if ((r = EntitySystem_1.EntitySystem.Get(t))?.Valid) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(r, !e, !e, !e, i, true);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 3, "调用SetCharacterHidden失败，因为callObject为空");
    }
  }
  static SetHiddenMovementMode(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.SetHiddenMovementMode(e);
  }
  static CanResponseInput(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.CanResponseInput() ?? false;
  }
  static CanJumpPress(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.CanJumpPress() ?? false;
  }
  static CanWalkPress(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.CanWalkPress() ?? false;
  }
  static GetHeightAboveGround(t, e) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.GetHeightAboveGround(e > 500 ? e : undefined);
  }
  static GetAcceleration(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.Acceleration.ToUeVectorOld();
  }
  static GetAimYawRate(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.AimYawRate;
  }
  static GetMovementData(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.MovementData;
  }
  static SmoothCharacterRotation(t, e, i, r) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.SmoothCharacterRotation(e, i, Time_1.Time.DeltaTimeSeconds, false, r);
  }
  static HasMoveInput(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.HasMoveInput ?? false;
  }
  static HasMoveInputOrTickIntervalAndModelBuffer(t) {
    var e;
    return !!EntitySystem_1.EntitySystem.GetComponent(t, 45)?.HasMoveInput || !!(e = EntitySystem_1.EntitySystem.Get(t)) && !(e.GetTickInterval() <= 1) && (EntitySystem_1.EntitySystem.GetComponent(t, 178)?.HasLocationModelBuffer() ?? false);
  }
  static HasRotatorInput(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    return GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(t) > MIN_ROTATOR_ANGLE;
  }
  static IsMoving(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.IsMoving ?? false;
  }
  static IsJump(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.IsJump ?? false;
  }
  static GetSpeed(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.Speed;
  }
  static GetGroundedTime(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.GroundedTimeUe;
  }
  static IsFallingIntoWater(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.IsFallingIntoWater ?? false;
  }
  static SetForceSpeed(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.SetForceSpeed(e);
  }
  static SetAddMove(t, e, i, r, n) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.SetAddMoveWithMesh(e, i, r, n);
  }
  static StopAddMove(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.StopAddMoveWithMesh(e);
  }
  static FixActorLocation(t, e, i) {
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    var r = new UE.HitResult();
    if (t?.Valid) {
      var n = MathUtils_1.MathUtils.CommonTempVector;
      n.FromUeVector(e);
      var e = t.FixActorLocation(i, true, n, "TsMoveBlueprintFunctionLibrary.FixActorLocation");
      if (e[0]) {
        r.bBlockingHit = true;
        r.Location = new UE.Vector(e[1].X, e[1].Y, e[1].Z);
        return r;
      }
    }
    r.bBlockingHit = false;
    return r;
  }
  static StopAllAddMove(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.StopAllAddMove();
  }
  static SetAddMoveWorld(t, e, i, r, n) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.SetAddMoveWorldWithMesh(e, i, r, n);
  }
  static SetAddMoveWorldSpeed(t, e, i) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.SetAddMoveWorldSpeedWithMesh(e, i);
  }
  static SetAddMoveOffset(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.SetAddMoveOffset(e);
  }
  static SetAddMoveRotation(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.SetAddMoveRotation(e);
  }
  static SetEnterWaterState(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 77)?.SetEnterWaterState(e);
  }
  static GetClimbState(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 34)?.GetClimbState();
  }
  static GetClimbRadius(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 34)?.GetClimbRadius();
  }
  static GetClimbInfo(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 34)?.GetClimbInfo();
  }
  static KickExitCheck(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 34)?.KickExitCheck();
  }
  static CanClimbPress(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 34)?.CanClimbPress() ?? false;
  }
  static OnEnterClimb(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 34)?.OnEnterClimb();
  }
  static OnExitClimb(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 34)?.OnExitClimb();
  }
  static DealClimbUpStart(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 34)?.DealClimbUpStart();
  }
  static FinishClimbDown(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 34)?.FinishClimbDown();
  }
  static DealClimbUpFinish(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 34)?.DealClimbUpFinish();
  }
  static SetClimbState(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 34)?.SetClimbState(e);
  }
  static SetEnterClimbType(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 34)?.SetEnterClimbType(e);
  }
  static SetExitClimbType(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 34)?.SetExitClimbType(e);
  }
  static GetSwimLocation(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 77)?.GetSwimLocation();
  }
  static GetWaterLocation(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 77)?.GetWaterLocation();
  }
  static GetWaterVolume(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 77)?.GetWaterVolume() ?? false;
  }
  static GetClimbOnWallAngle(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 34)?.GetOnWallAngle();
  }
  static SetUseDebugMovementSetting(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.SetUseDebugMovementSetting(e);
  }
  static SetDebugMovementSetting(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.SetDebugMovementSetting(e);
  }
  static SetLockedRotation(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.SetLockedRotation(e);
  }
  static GetLockedRotation(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 45)?.LockedRotation ?? false;
  }
  static SetFallingHorizontalMaxSpeed(t, e) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.SetFallingHorizontalMaxSpeed(e);
  }
  static ClearFallingHorizontalMaxSpeed(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 45)?.ClearFallingHorizontalMaxSpeed();
  }
  static DetectClimbWithDirect(t, e, i) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 34)?.DetectClimbWithDirect(e, i) ?? false;
  }
  static TurnToTarget(t, e, i) {
    var r;
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (n && e instanceof TsBaseCharacter_1.default) {
      if (r = EntitySystem_1.EntitySystem.GetComponent(t, 178)) {
        r.MontageManager.StopMontage({
          Method: 0,
          BlendOutTime: 0
        });
      }
      r = n.ActorLocationProxy;
      n = e.CharacterActorComponent.ActorLocationProxy;
      e = MathUtils_1.MathUtils.CommonTempVector;
      n.Subtraction(r, e);
      n = MathUtils_1.MathUtils.CommonTempRotator;
      r = EntitySystem_1.EntitySystem.GetComponent(t, 45);
      e.ToOrientationRotator(n);
      r?.SmoothCharacterRotation(n, i, Time_1.Time.DeltaTimeSeconds, false);
    }
  }
  static GetMonsterMoveDirection(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (!t || t.InputDirectProxy.IsNearlyZero()) {
      return 4;
    } else {
      t.ActorQuatProxy.Inverse(tmpQuat);
      tmpQuat.RotateVector(t.InputDirectProxy, tmpVector);
      if (Math.abs(tmpVector.X) > Math.abs(tmpVector.Y)) {
        if (tmpVector.X > 0) {
          return 0;
        } else {
          return 1;
        }
      } else if (tmpVector.Y > 0) {
        return 3;
      } else {
        return 2;
      }
    }
  }
  static GetRoleBody(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (t && t.CreatureData?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      return t.CreatureData.GetRoleConfig().RoleBody;
    } else {
      return "";
    }
  }
  static GetRacingRightSpeed(t) {
    return EntitySystem_1.EntitySystem.GetComponent(t, 109)?.LastRightSpeed ?? 0;
  }
  static SetPendulumData(t, e, i, r, n, o, a, s, m, y, c, _) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t?.Valid) {
      t.SetPendulumData(e, i, r, n, o, a, s, m, y, c, _);
    }
  }
  static Reset(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t?.Valid) {
      t.Reset();
    }
  }
  static SetGrabPoint(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t?.Valid) {
      t.GrabPoint = e;
    }
  }
  static GetGrabPoint(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t?.Valid) {
      return t.GrabPoint;
    } else {
      return new UE.VectorDouble();
    }
  }
  static SetHooked(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t?.Valid) {
      t.Hooked = e;
    }
  }
  static GetHooked(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    return !!t?.Valid && t.Hooked;
  }
  static SetSocketName(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t?.Valid) {
      t.SocketName = e;
    }
  }
  static SetRopeForce(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t?.Valid) {
      t.RopeForce = e;
    }
  }
  static GetRopeForce(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t?.Valid) {
      return t.RopeForce;
    } else {
      return 0;
    }
  }
  static SetDistanceRopeToActor(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t?.Valid) {
      t.DistanceRopeToActor = e;
    }
  }
  static GetDistanceRopeToActor(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t?.Valid) {
      return t.DistanceRopeToActor;
    } else {
      return 0;
    }
  }
  static SetAirControl(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t?.Valid) {
      t.AirControl = e;
    }
  }
  static GetAirControl(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t?.Valid) {
      return t.AirControl;
    } else {
      return 0;
    }
  }
  static SetUpLength(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 71);
    if (t?.Valid) {
      t.UpLength = e;
    }
  }
  static SetCanMoveFromInput(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 45);
    if (t?.Valid) {
      t.CanMoveFromInput = e;
    }
  }
  static UpdateAnimInfoMove(t, e) {
    var i;
    var r;
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 178);
    if (n?.Valid && (e = e, n = n.AnimLogicParamsSetter, (i = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid && (r = i.InputDirectProxy, n.InputDirect.Equals(r) || (n.InputDirect.DeepCopy(r), e.InputDirectRef = r.ToUeVectorOld()), r = i.InputRotatorProxy, n.InputRotator.Equals(r) || (n.InputRotator.DeepCopy(r), e.InputRotatorRef = r.ToUeRotator())), (i = EntitySystem_1.EntitySystem.GetComponent(t, 45))?.Valid && (r = i.Acceleration, n.Acceleration.Equals(r) || (n.Acceleration.DeepCopy(r), e.AccelerationRef = r.ToUeVectorOld()), r = i.IsMoving, n.IsMoving !== r && (n.IsMoving = r, e.IsMovingRef = r), r = i.HasMoveInput, n.HasMoveInput !== r && (n.HasMoveInput = r, e.HasMoveInputRef = r), r = i.Speed, n.Speed !== r && (n.Speed = r, e.SpeedRef = r), r = i.IsJump, n.IsJump !== r && (n.IsJump = r, e.IsJumpRef = r), r = i.GroundedTimeUe, n.GroundedTime !== r && (n.GroundedTime = r, e.GroundedTimeRef = r), r = i.IsFallingIntoWater, n.IsFallingIntoWater !== r && (n.IsFallingIntoWater = r, e.IsFallingIntoWaterRef = r), r = i.JumpUpRate, n.JumpUpRate !== r) && (n.JumpUpRate = r, e.JumpUpRateRef = r), (i = EntitySystem_1.EntitySystem.GetComponent(t, 34))?.Valid && (r = i.GetTsClimbInfo(), n.ClimbInfo.Equals(r) || (n.ClimbInfo.DeepCopy(r), e.ClimbInfoRef = i.GetClimbInfo()), r = i.GetTsClimbState(), n.ClimbState.Equals(r) || (n.ClimbState.DeepCopy(r), e.ClimbStateRef = i.GetClimbState()), r = i.GetClimbRadius(), n.ClimbRadius !== r && (n.ClimbRadius = r, e.ClimbRadiusRef = r), r = i.GetOnWallAngle(), n.ClimbOnWallAngle !== r) && (n.ClimbOnWallAngle = r, e.ClimbOnWallAngleRef = r), (i = EntitySystem_1.EntitySystem.GetComponent(t, 77))?.Valid && (r = i.SprintSwimOffset, n.SprintSwimOffset !== r && (n.SprintSwimOffset = r, e.SprintSwimOffsetRef = r), r = i.SprintSwimOffsetLerpSpeed, n.SprintSwimOffsetLerpSpeed !== r) && (n.SprintSwimOffsetLerpSpeed = r, e.SprintSwimOffsetLerpSpeedRef = r), (i = EntitySystem_1.EntitySystem.GetComponent(t, 35))?.Valid) && (r = i.SlideForward, n.SlideForward.Equals(r) || (n.SlideForward.DeepCopy(r), e.SlideForwardRef = r.ToUeVectorOld()), t = i.SlideSwitchThisFrame, n.SlideSwitchThisFrame !== t && (n.SlideSwitchThisFrame = t, e.SlideSwitchThisFrameRef = t), r = i.StandMode, n.SlideStandMode !== r)) {
      n.SlideStandMode = r;
      e.SlideStandModeRef = r;
    }
  }
  static UpdateAnimInfoMoveMonster(t, e) {
    var i;
    var r = EntitySystem_1.EntitySystem.GetComponent(t, 178);
    if (r?.Valid && (e = e, r = r.AnimLogicParamsSetter, (i = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid && (i = i.InputDirectProxy, r.InputDirect.Equals(i) || (r.InputDirect.DeepCopy(i), e.InputDirectRef = i.ToUeVectorOld())), (i = EntitySystem_1.EntitySystem.GetComponent(t, 45))?.Valid) && (t = i.IsMoving, r.IsMoving !== t && (r.IsMoving = t, e.IsMovingRef = t), t = i.HasMoveInput, r.HasMoveInput !== t)) {
      r.HasMoveInput = t;
      e.HasMoveInputRef = t;
    }
  }
  static UpdateAnimInfoMoveRoleNpc(t, e) {
    var i;
    var r;
    var n = EntitySystem_1.EntitySystem.GetComponent(t, 178);
    if (n?.Valid && (e = e, n = n.AnimLogicParamsSetter, (i = EntitySystem_1.EntitySystem.GetComponent(t, 3))?.Valid && (i = i.InputDirectProxy, n.InputDirect.Equals(i) || (n.InputDirect.DeepCopy(i), e.InputDirectRef = i.ToUeVectorOld())), (i = EntitySystem_1.EntitySystem.GetComponent(t, 45))?.Valid && (r = i.Acceleration, n.Acceleration.Equals(r) || (n.Acceleration.DeepCopy(r), e.AccelerationRef = r.ToUeVectorOld()), r = i.IsMoving, n.IsMoving !== r && (n.IsMoving = r, e.IsMovingRef = r), r = i.HasMoveInput, n.HasMoveInput !== r && (n.HasMoveInput = r, e.HasMoveInputRef = r), r = i.Speed, n.Speed !== r) && (n.Speed = r, e.SpeedRef = r), (i = EntitySystem_1.EntitySystem.GetComponent(t, 230))?.Valid) && (r = i.IsOnVehicle, n.IsOnVehicle !== r)) {
      n.IsOnVehicle = r;
      e.IsOnVehicle = r;
    }
  }
  static TurnOnAutomaticFlightMode(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 62);
    if (t?.Valid) {
      t.TurnOnAutomaticFlightMode(e);
    }
  }
  static TurnOffAutomaticFlightMode(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 62);
    if (t?.Valid) {
      t.TurnOffAutomaticFlightMode();
    }
  }
  static TurnOnCameraDrivenAutoFlightMode(t, e) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 62);
    if (t?.Valid) {
      t.TurnOnCameraDrivenAutoFlightMode(e);
    }
  }
  static TurnOffCameraDrivenAutoFlightMode(t) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 62);
    if (t?.Valid) {
      t.TurnOffCameraDrivenAutoFlightMode();
    }
  }
  static get WaterTrace() {
    var t;
    if (!TsMoveBlueprintFunctionLibrary.WaterTraceInternal) {
      (t = UE.NewObject(UE.TraceLineElement.StaticClass())).bIsSingle = true;
      t.bIgnoreSelf = true;
      t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(t, ColorUtils_1.ColorUtils.LinearGreen);
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(t, ColorUtils_1.ColorUtils.LinearRed);
      TsMoveBlueprintFunctionLibrary.WaterTraceInternal = t;
    }
    return TsMoveBlueprintFunctionLibrary.WaterTraceInternal;
  }
  static get GroundTrace() {
    var t;
    if (!TsMoveBlueprintFunctionLibrary.GroundTraceInternal) {
      (t = UE.NewObject(UE.TraceLineElement.StaticClass())).bIsSingle = true;
      t.bIgnoreSelf = true;
      t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(t, ColorUtils_1.ColorUtils.LinearGreen);
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(t, ColorUtils_1.ColorUtils.LinearRed);
      TsMoveBlueprintFunctionLibrary.GroundTraceInternal = t;
    }
    return TsMoveBlueprintFunctionLibrary.GroundTraceInternal;
  }
  static SimpleSwim(t, e, i, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (!t?.Valid) {
      return Vector_1.Vector.ZeroVectorDouble;
    }
    var e = MathUtils_1.MathUtils.Clamp(e, 0, MAX_SIMPLE_SWIM_DELTA);
    var n = TsMoveBlueprintFunctionLibrary.WaterTrace;
    n.WorldContextObject = t.Actor;
    t.ActorUpProxy.Multiply(i, tmpVector);
    tmpVector.AdditionEqual(t.ActorLocationProxy);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(n, tmpVector);
    t.ActorUpProxy.Multiply(-t.ScaledHalfHeight, tmpVector);
    tmpVector.AdditionEqual(t.ActorLocationProxy);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, tmpVector);
    let o = 0;
    if (TraceElementCommon_1.TraceElementCommon.LineTrace(n, "SimpleSwim")) {
      i = TsMoveBlueprintFunctionLibrary.GroundTrace;
      i.WorldContextObject = t.Actor;
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(n.HitResult, 0, tmpVector);
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, tmpVector);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, t.ActorLocationProxy);
      if (!TraceElementCommon_1.TraceElementCommon.LineTrace(i, "SimpleSwim_Ground")) {
        tmpVector.SubtractionEqual(t.ActorLocationProxy);
        o = MathUtils_1.MathUtils.Clamp(tmpVector.DotProduct(t.ActorUpProxy) / t.ScaledHalfHeight * 0.5 + 0.5, 0, 1);
      }
    } else {
      n = TsMoveBlueprintFunctionLibrary.GroundTrace;
      n.WorldContextObject = t.Actor;
      t.ActorUpProxy.Multiply(-t.ScaledHalfHeight - 2, tmpVector);
      tmpVector.AdditionEqual(t.ActorLocationProxy);
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(n, t.ActorLocationProxy);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(n, tmpVector);
      if (TraceElementCommon_1.TraceElementCommon.LineTrace(n, "SimpleSwim_Ground")) {
        return Vector_1.Vector.ZeroVectorDouble;
      }
    }
    i = t.Entity.GetComponent(45);
    tmpVector.FromUeVector(r);
    n = GravityUtils_1.GravityUtils.GetZnInGravityForActor(t, tmpVector);
    let a = n;
    if (i?.Valid) {
      a += i.CharacterMovement.GetGravityZ() * e * (1 - o * CharacterSwimComponent_1.SWIMMING_BUOYANCY);
    } else {
      a += e * 1960 * (1 - o * CharacterSwimComponent_1.SWIMMING_BUOYANCY);
    }
    r = (n + (a *= Math.pow(CharacterSwimComponent_1.SWIMMING_DECELERATION, e))) / 2 * e;
    r = MathUtils_1.MathUtils.Clamp(r, (o - 1) * 2 * t.ScaledHalfHeight, o * 2 * t.ScaledHalfHeight);
    tmpVector.Reset();
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, tmpVector, r);
    if (i?.Valid) {
      i.MoveCharacter(tmpVector, e, "SimpleSwim");
    } else {
      t.AddActorWorldOffset(tmpVector.ToUeVector(), "SimpleSwim", true);
    }
    tmpVector2.Reset();
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, tmpVector2, a);
    return tmpVector2.ToUeVector();
  }
  static EnterRoll(t, e, i, r, n, o, a) {
    EntitySystem_1.EntitySystem.GetComponent(t, 37)?.EnterRoll(e, i, r, n, o, a);
  }
  static LeaveRoll(t) {
    EntitySystem_1.EntitySystem.GetComponent(t, 37)?.LeaveRoll();
  }
  static EnterKite(t) {
    var e = EntitySystem_1.EntitySystem.GetComponent(t, 38);
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 100);
    return !!e?.Valid && !!t?.Valid && e.EnterKite(t.GetCurrentTarget());
  }
  static LerpVelocityBlend(t, e, i) {
    t.Forward = MathUtils_1.MathUtils.Lerp(t.Forward, e.Forward, i);
    t.Backward = MathUtils_1.MathUtils.Lerp(t.Backward, e.Backward, i);
    t.Left = MathUtils_1.MathUtils.Lerp(t.Left, e.Left, i);
    t.Right = MathUtils_1.MathUtils.Lerp(t.Right, e.Right, i);
    e = 1 / (t.Forward + t.Backward + t.Left + t.Right);
    if (e < 1) {
      t.Forward = t.Forward * e;
      t.Backward = t.Backward * e;
      t.Left = t.Left * e;
      t.Right = t.Right * e;
    }
    return t;
  }
  static MoveCharacterDetectFloor(t, e) {
    var i = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    i.WorldContextObject = t.Owner;
    i.Radius = t.ScaledRadius;
    for (const n of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      i.ActorsToIgnore.Add(n);
    }
    tmpVector.DeepCopy(e);
    tmpVector.AdditionEqual(t.ActorLocationProxy);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, tmpVector);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, tmpVector, -t.ScaledHalfHeight);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, tmpVector);
    var r = "MoveCharacterDetectFloor";
    if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(t.Actor.CapsuleComponent, i, r, r)) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(i.HitResult, 0, e);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, e, t.ScaledHalfHeight);
      e.SubtractionEqual(t.ActorLocationProxy);
    }
  }
  static MoveCharacter(t, e, i, r) {
    t = EntitySystem_1.EntitySystem.GetComponent(t, 179);
    if (t?.ActorComp) {
      MathUtils_1.MathUtils.CommonTempVector.DeepCopy(e);
      MathUtils_1.MathUtils.CommonTempVector.SubtractionEqual(t.ActorComp.ActorLocationProxy);
      e = i * Time_1.Time.DeltaTimeSeconds;
      i = Math.max(0, MathUtils_1.MathUtils.CommonTempVector.Size() - r);
      MathUtils_1.MathUtils.CommonTempVector.Normalize();
      if (e < i) {
        MathUtils_1.MathUtils.CommonTempVector.MultiplyEqual(e);
        TsMoveBlueprintFunctionLibrary.MoveCharacterDetectFloor(t.ActorComp, MathUtils_1.MathUtils.CommonTempVector);
        t?.MoveCharacter(MathUtils_1.MathUtils.CommonTempVector, Time_1.Time.DeltaTimeSeconds, "TsMoveBlueprintFunctionLibrary.MoveCharacter");
        return false;
      }
      if (i > 0) {
        MathUtils_1.MathUtils.CommonTempVector.MultiplyEqual(i);
        TsMoveBlueprintFunctionLibrary.MoveCharacterDetectFloor(t.ActorComp, MathUtils_1.MathUtils.CommonTempVector);
        t?.MoveCharacter(MathUtils_1.MathUtils.CommonTempVector, Time_1.Time.DeltaTimeSeconds, "TsMoveBlueprintFunctionLibrary.MoveCharacter");
      }
    }
    return true;
  }
}
TsMoveBlueprintFunctionLibrary.WaterTraceInternal = undefined;
TsMoveBlueprintFunctionLibrary.GroundTraceInternal = undefined;
exports.default = TsMoveBlueprintFunctionLibrary; //# sourceMappingURL=TsMoveBlueprintFunctionLibrary.js.map