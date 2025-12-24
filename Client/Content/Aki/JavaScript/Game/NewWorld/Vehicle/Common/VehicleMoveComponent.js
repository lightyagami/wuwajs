"use strict";

var __decorate = this && this.__decorate || function (t, i, s, h) {
  var e;
  var o = arguments.length;
  var r = o < 3 ? i : h === null ? h = Object.getOwnPropertyDescriptor(i, s) : h;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, s, h);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (e = t[n]) {
        r = (o < 3 ? e(r) : o > 3 ? e(i, s, r) : e(i, s)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(i, s, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleMoveComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const VehiclePathMoveController_1 = require("../Controller/VehiclePathMoveController");
const MIN_MOVE_SPEED = 20;
const INVALID_FORCE_SPEED = -100000000;
const cannotResponseInputTag = [-648310348, -2044964178, 1008164187, 191377386];
const splineDebugColor = new UE.LinearColor(1, 0, 0, 1);
let VehicleMoveComponent = class VehicleMoveComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.AnimComp = undefined;
    this.TagComponent = undefined;
    this.AudioComp = undefined;
    this.UeMovementMgrComp = undefined;
    this.VehicleMovement = undefined;
    this.UeMovementDisableHandle = 0;
    this.AutoUpdateUeMovementTickState = true;
    this.IsMoving = false;
    this.HasMoveInput = false;
    this.IsSpecialMove = false;
    this.IsMovePath = false;
    this.DeltaTimeSeconds = 0;
    this.IsStopInternal = false;
    this.ForceSpeed = Vector_1.Vector.Create(INVALID_FORCE_SPEED, INVALID_FORCE_SPEED, INVALID_FORCE_SPEED);
    this.Speed = 0;
    this.AimYawRate = 0;
    this.Acceleration = Vector_1.Vector.Create();
    this.PreviousAimYaw = 0;
    this.PreviousVelocity = Vector_1.Vector.Create();
    this.TurnRate = 1;
    this.CanMoveWithDistanceInternal = true;
    this.CanMoveFromInputInternal = true;
    this.AdditiveTurnYaw = 0;
    this.AdditiveTurnYawCache = 0;
    this.AdditiveTurnDuration = 0;
    this.AdditiveTurnElapsedTime = 0;
    this.CannotResponseInputCount = 0;
    this.CanResponseInputTasks = new Array();
    this.GravityDirectInternal = Vector_1.Vector.Create(0, 0, -1);
    this.GravityUpInternal = Vector_1.Vector.Create(0, 0, 1);
    this.IsStandardGravityInternal = true;
    this.DebugCurve = undefined;
    this.IsSummoningPerform = false;
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
    this.TmpTrans = Transform_1.Transform.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.TmpQuat2 = Quat_1.Quat.Create();
    this.zum = 2;
    this.StopMoveContinuousTime = 0;
    this.MCf = 1000;
    this.OnResponseInputTagsChanged = (t, i) => {
      if (i) {
        if (this.CannotResponseInputCount === 0) {
          this.HasMoveInput = false;
        }
        ++this.CannotResponseInputCount;
      } else {
        --this.CannotResponseInputCount;
      }
    };
    this.OnEnterVehicle = t => {
      if (t.IsDriver && t.IsRolePassenger() && (this.AutoUpdateUeMovementTickState = false, this.UeMovementDisableHandle)) {
        this.UeMovementMgrComp.Enable(this.UeMovementDisableHandle, "进入载具主动启用移动组件Tick");
        this.UeMovementDisableHandle = 0;
      }
    };
    this.OnLeaveVehicle = t => {
      if (t.IsDriver && t.IsRolePassenger()) {
        this.AutoUpdateUeMovementTickState = true;
      }
    };
  }
  get CanMoveFromInput() {
    return this.CanMoveFromInputInternal;
  }
  set CanMoveFromInput(t) {
    this.CanMoveFromInputInternal = t;
  }
  get GravityDirect() {
    return this.GravityDirectInternal;
  }
  get GravityUp() {
    return this.GravityUpInternal;
  }
  get IsStandardGravity() {
    return this.IsStandardGravityInternal;
  }
  OnInit(t) {
    this.IsStandardGravityInternal = true;
    this.GravityDirectInternal.Set(0, 0, -1);
    this.GravityUpInternal.Set(0, 0, 1);
    return true;
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(247);
    this.AnimComp = this.Entity.GetComponent(248);
    this.TagComponent = this.Entity.GetComponent(215);
    this.AudioComp = this.Entity.GetComponent(255);
    this.UeMovementMgrComp = this.Entity.GetComponent(259);
    this.UeMovementDisableHandle = this.UeMovementMgrComp.Disable("载具出生时默认关闭移动组件");
    this.VehicleMovement = this.ActorComp.Actor.GetComponentByClass(UE.KuroVehicleMovementComponent.StaticClass());
    if (!this.VehicleMovement) {
      return false;
    }
    this.GravityDirectInternal.FromUeVector(this.VehicleMovement.Kuro_GetGravityDirect());
    this.IsStandardGravityInternal = Math.abs(this.GravityDirectInternal.Z + 1) < MathUtils_1.MathUtils.SmallNumber;
    if (this.IsStandardGravityInternal) {
      this.GravityDirectInternal.Set(0, 0, -1);
    }
    this.GravityDirectInternal.UnaryNegation(this.GravityUpInternal);
    if (this.ActorComp?.CreatureData.GetBaseInfo()?.Category.VehicleType === "Motorcycle") {
      this.zum = this.VehicleMovement.GravityScale;
    } else {
      this.VehicleMovement.GravityScale = this.zum;
    }
    this.InitGravityDirect();
    this.CannotResponseInputCount = 0;
    if (this.TagComponent) {
      for (const t of cannotResponseInputTag) {
        if (this.TagComponent.HasTag(t)) {
          ++this.CannotResponseInputCount;
        }
        this.CanResponseInputTasks.push(this.TagComponent.ListenForTagAddOrRemove(t, this.OnResponseInputTagsChanged));
      }
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnEnterVehicle);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnLeaveVehicle);
    return true;
  }
  OnActivate() {
    var t = this.ActorComp.CreatureData.ComponentDataMap.get("pAc")?.pAc;
    if (t) {
      ControllerHolder_1.ControllerHolder.SyncSplineMoveController.SyncVehicleMoveAlongPath(this.Entity, t.dTs);
    }
  }
  OnTick(i) {
    this.DrawDebugCurve();
    super.OnTick(i);
    this.CanMoveWithDistanceInternal = this.Entity.DistanceWithCamera <= 7000;
    if (this.ActorComp && (this.DeltaTimeSeconds = i * MathUtils_1.MathUtils.MillisecondToSecond, !this.IsSpecialMove)) {
      if (this.IsStopInternal) {
        this.Speed = 0;
      } else {
        this.Speed = this.ActorComp.ActorVelocityProxy.Size();
      }
      this.IsMoving = this.Speed > MIN_MOVE_SPEED;
      if (!this.IsMovePath) {
        this.AudioComp?.UpdateVehicleMoveSound(this.Speed, this.ActorComp.Owner);
      }
      this.UpdateUeMovementDisableState(i);
      var s = this.Entity.GetTickInterval() > 1 && this.AnimComp?.Valid && this.ActorComp.Owner.WasRecentlyRenderedOnScreen();
      let t = undefined;
      if (s) {
        t = this.AnimComp.GetMeshTransform();
      }
      if (this.CanResponseInput()) {
        this.SetInfoVar();
        this.CacheVar();
      } else {
        this.HasMoveInput = false;
      }
      if (this.ActorComp.IsMoveAutonomousProxy) {
        if (s && this.IsMoving) {
          this.AnimComp.SetModelBuffer(t, i);
        }
        this.SetInputOrder();
      }
    }
  }
  OnEnd() {
    for (const t of this.CanResponseInputTasks) {
      t.EndTask();
    }
    this.CanResponseInputTasks.length = 0;
    this.StopMove();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnEnterVehicle);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnLeaveVehicle);
    return true;
  }
  SetInfoVar() {
    if (this.DeltaTimeSeconds > MathUtils_1.MathUtils.SmallNumber) {
      this.Acceleration.DeepCopy(this.ActorComp.ActorVelocityProxy);
      this.Acceleration.SubtractionEqual(this.PreviousVelocity);
      this.Acceleration.DivisionEqual(this.DeltaTimeSeconds);
      this.AimYawRate = Math.abs(this.ActorComp.ActorRotationProxy.Yaw - this.PreviousAimYaw) / this.DeltaTimeSeconds;
    }
    this.HasMoveInput = GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(this.ActorComp, this.ActorComp.InputDirectProxy) > MathUtils_1.MathUtils.SmallNumber;
  }
  CacheVar() {
    this.PreviousVelocity.DeepCopy(this.ActorComp.ActorVelocityProxy);
    this.PreviousAimYaw = this.ActorComp.ActorRotation.Yaw;
  }
  InitGravityDirect() {
    var t = this.Entity.GetComponent(0);
    this.SetGravityDirect(Vector_1.Vector.Create(t.GetInitGravityDirection()));
  }
  SetGravityDirect(t) {
    this.SetGravityDirectByNumber(t.X, t.Y, t.Z);
  }
  SetGravityDirectByNumber(t, i, s, h = 0) {
    this.TmpVector.X = t;
    this.TmpVector.Y = i;
    this.TmpVector.Z = s;
    if (this.TmpVector.Normalize() && !this.GravityDirectInternal.Equals(this.TmpVector)) {
      t = Math.acos(Vector_1.Vector.DotProduct(this.GravityDirectInternal, this.TmpVector)) / Math.PI * 500;
      Quat_1.Quat.FindBetween(this.GravityDirectInternal, this.TmpVector, this.TmpQuat);
      this.IsStandardGravityInternal = MathUtils_1.MathUtils.IsNearlyEqual(this.TmpVector.Z, -1);
      if (this.IsStandardGravityInternal) {
        this.GravityDirectInternal.Set(0, 0, -1);
      } else {
        this.GravityDirectInternal.DeepCopy(this.TmpVector);
      }
      this.GravityDirectInternal.UnaryNegation(this.GravityUpInternal);
      if (this.VehicleMovement) {
        this.VehicleMovement.Kuro_SetGravityDirect(this.GravityDirectInternal.ToUeVectorOld());
      }
      if (this.ActorComp.ActorUpProxy.DotProduct(this.TmpVector) > MathUtils_1.MathUtils.KindaSmallNumber - 1) {
        this.TmpQuat.RotateVector(Vector_1.Vector.UpVectorProxy, this.TmpVector);
        this.TmpQuat.Multiply(this.ActorComp.ActorQuatProxy, this.TmpQuat2);
        this.TmpQuat2.Rotator(this.TmpRotator);
        if (this.AnimComp) {
          this.AnimComp.SetLocationAndRotatorWithModelBuffer(this.ActorComp.ActorLocationProxy.ToUeVector(), this.TmpRotator.ToUeRotator(), t, "SetGravity");
        } else {
          this.ActorComp.SetActorRotation(this.TmpRotator.ToUeRotator(), "SetGravity");
        }
      }
      this.TmpQuat.RotateVector(this.ActorComp.InputDirectProxy, this.TmpVector);
      this.ActorComp.SetInputDirect(this.TmpVector);
      this.TmpQuat.RotateVector(this.ActorComp.InputFacingProxy, this.TmpVector);
      this.ActorComp.SetInputFacing(this.TmpVector);
      this.ActorComp.ResetGravityRelatedCachedTime();
    }
  }
  SetGravityDirectWithoutRotate(t) {
    this.SetGravityDirectWithoutRotateByNumber(t.X, t.Y, t.Z);
  }
  SetGravityDirectWithoutRotateByNumber(t, i, s, h = 0) {
    this.TmpVector.X = t;
    this.TmpVector.Y = i;
    this.TmpVector.Z = s;
    if (this.TmpVector.Normalize() && !this.GravityDirectInternal.Equals(this.TmpVector)) {
      this.IsStandardGravityInternal = MathUtils_1.MathUtils.IsNearlyEqual(this.TmpVector.Z, -1);
      if (this.IsStandardGravityInternal) {
        this.GravityDirectInternal.Set(0, 0, -1);
      } else {
        this.GravityDirectInternal.DeepCopy(this.TmpVector);
      }
      this.GravityDirectInternal.UnaryNegation(this.GravityUpInternal);
      if (this.VehicleMovement) {
        this.VehicleMovement.Kuro_SetGravityDirect(this.GravityDirectInternal.ToUeVectorOld());
      }
      this.ActorComp.ResetGravityRelatedCachedTime();
    }
  }
  CanResponseInput() {
    return this.CannotResponseInputCount === 0;
  }
  SpeedScaled(t) {
    return t;
  }
  ApplyForceSpeedAndRecordSpeed() {
    if (this.ForceSpeed.X !== INVALID_FORCE_SPEED) {
      if (this.ForceSpeed.ContainsNaN()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Movement", 6, "ForceSpeed Nan.", ["V", this.ForceSpeed]);
        }
      } else {
        this.VehicleMovement.Velocity = this.ForceSpeed.ToUeVectorOld();
      }
      this.ActorComp.ResetCachedVelocityTime();
      this.ForceSpeed.X = INVALID_FORCE_SPEED;
    }
  }
  SetForceSpeed(t) {
    if (t.ContainsNaN() && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Movement", 6, "SetForceSpeed Contains NaN", ["speed", t]);
    }
    this.ForceSpeed.DeepCopy(t);
    if (this.ActorComp) {
      this.ActorComp.SetActorVelocity(this.ForceSpeed);
      this.ActorComp.ResetCachedVelocityTime();
    }
  }
  EnableUeMovementTick(t) {
    if (this.AutoUpdateUeMovementTickState && this.UeMovementMgrComp && this.UeMovementDisableHandle && (this.UeMovementMgrComp.Enable(this.UeMovementDisableHandle, t), this.UeMovementDisableHandle = 0, this.StopMoveContinuousTime = 0, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Vehicle", 50, "开启移动组件Tick", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Reason", t]);
    }
  }
  DisableUeMovementTick(t) {
    if (this.AutoUpdateUeMovementTickState && this.UeMovementMgrComp) {
      if (this.UeMovementDisableHandle) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 72, "关闭移动组件Tick时已经有人Disable了, 保持不变", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Reason", t], ["DisableInfo", this.UeMovementMgrComp?.DumpDisableInfo()]);
        }
      } else {
        this.UeMovementDisableHandle = this.UeMovementMgrComp.Disable(t);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Vehicle", 72, "关闭移动组件Tick", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Reason", t]);
        }
      }
    }
  }
  UpdateUeMovementDisableState(t) {
    if (!!this.AutoUpdateUeMovementTickState && !this.IsSummoningPerform) {
      if (this.UeMovementDisableHandle) {
        if (this.IsMoving) {
          this.EnableUeMovementTick("有速度自动启用移动组件Tick");
        }
      } else if (!this.IsMoving && !(this.StopMoveContinuousTime += t, this.StopMoveContinuousTime - this.MCf < MathUtils_1.MathUtils.KindaSmallNumber)) {
        this.StopMoveContinuousTime = 0;
        this.SetForceSpeed(Vector_1.Vector.ZeroVector);
        this.DisableUeMovementTick("无速度自动关闭移动组件Tick");
      }
    }
  }
  CanMove() {
    return this.CanMoveFromInputInternal && this.CanMoveWithDistanceInternal;
  }
  get CanMoveWithDistance() {
    return this.CanMoveWithDistanceInternal;
  }
  GetMovingSplineId() {
    return VehiclePathMoveController_1.VehiclePathMoveController.GetMovingSplineId(this.Entity);
  }
  MoveAlongPath(i) {
    const s = VehiclePathMoveController_1.VehiclePathMoveController.CreateMoveTaskFromSplineId(this.Entity, i.SplineId);
    var t;
    if (s?.IsValid()) {
      t = i.StartFromNearest ? this.FindNearestNextPoint(s.CurveInfo.SplineCurve) : 0;
      s.JumpToPoint(t);
      if (!i.ForceToFirstPoint && (s.GetTransformAtSplineIndex(t, this.TmpTrans), t = s.CurveInfo.SplineConfig?.TransitionSpeed || s.CurveInfo.SplineCurve.GetSplineLength() / s.CurveInfo.TotalTime, (t = VehiclePathMoveController_1.VehiclePathMoveController.CreateMoveToTask(this.Entity, this.TmpTrans, t))?.IsValid())) {
        t.CurveInfo.SplineId = -i.SplineId;
        t.NeedSync = i.NeedSync ?? true;
        t.SimulateRotation &&= i.SimulateRotation ?? true;
        t.OnMoveEndHandle = t => {
          if (t) {
            VehiclePathMoveController_1.VehiclePathMoveController.AddSplineMoveTask(s);
            this.DebugCurve = s.CurveInfo?.SplineCurve;
            if (i.OnArriveStartPointHandle) {
              i.OnArriveStartPointHandle(t);
            }
          } else if (i.OnMoveEndHandle) {
            i.OnMoveEndHandle(false);
          }
        };
        s.NeedSync = i.NeedSync ?? true;
        s.SimulateRotation = i.SimulateRotation ?? true;
        s.KeepForward = i.KeepForward ?? false;
        s.EnableDynamicGravity(!!i.DynamicGravity);
        s.OnMoveEndHandle = t => {
          if (i.OnMoveEndHandle) {
            i.OnMoveEndHandle(t);
          }
          this.DebugCurve = undefined;
        };
        VehiclePathMoveController_1.VehiclePathMoveController.AddSplineMoveTask(t);
        this.DebugCurve = t.CurveInfo?.SplineCurve;
      } else {
        VehiclePathMoveController_1.VehiclePathMoveController.AddSplineMoveTask(s);
        this.DebugCurve = s.CurveInfo?.SplineCurve;
      }
    }
  }
  StopMove() {
    VehiclePathMoveController_1.VehiclePathMoveController.RemoveSplineMoveTask(this.Entity);
  }
  FindNearestNextPoint(i) {
    let s = 0;
    let h = Number.MAX_VALUE;
    var e = this.ActorComp.ActorLocationProxy;
    var o = Vector_1.Vector.Create();
    var r = Vector_1.Vector.Create();
    for (let t = 0; t < i.WorldPositionList.length - 1; t++) {
      o.DeepCopy(i.WorldPositionList[t]);
      r.DeepCopy(i.WorldPositionList[t + 1]);
      this.TmpVector.Set(r.X, r.Y, r.Z);
      this.TmpVector.SubtractionEqual(o);
      var n = this.TmpVector.Size();
      this.TmpVector2.Set(e.X, e.Y, e.Z);
      this.TmpVector2.SubtractionEqual(r);
      if (!(this.TmpVector.DotProduct(this.TmpVector2) > 0) && !(this.TmpVector2.Set(e.X, e.Y, e.Z), this.TmpVector2.SubtractionEqual(o), this.TmpVector.DotProduct(this.TmpVector2) < 0) && !(this.TmpVector.DotProduct(this.ActorComp.ActorForwardProxy) < 0)) {
        this.TmpVector.CrossProduct(this.TmpVector2, this.TmpVector);
        if ((n = this.TmpVector.Size() / n) < h) {
          h = n;
          s = t + 1;
        }
      }
    }
    return s;
  }
  DrawDebugCurve() {
    if (this.DebugCurve && this.ActorComp?.Actor.CapsuleComponent?.bKuroMoveDebugLog) {
      var i = this.DebugCurve?.GetSplineLength();
      var s = i / 100;
      for (let t = 0; t < i; t += s) {
        this.DebugCurve.GetTransformAtDistanceAlongSpline(t, 1, this.TmpTrans);
        UE.KismetSystemLibrary.D_DrawDebugPoint(this.ActorComp.Actor, this.TmpTrans.GetLocation().ToUeVector(), 10, splineDebugColor, 0.1);
      }
    }
  }
  SetInputOrder() {
    this.ActorComp.Actor.AddMovementInput(this.ActorComp.InputDirect, 1, false);
  }
  GetMotorSubState() {
    if (this.VehicleMovement) {
      return this.VehicleMovement.MotorSubState;
    } else {
      return 0;
    }
  }
  SetMotorSubState(t) {
    if (this.VehicleMovement) {
      this.VehicleMovement.MotorSubState = t;
    }
  }
  SmoothVehicleRotation(t, i, s, h = false, e = "Movement.SmoothCharacterRotation", o = true) {
    var r = this.ActorComp.ActorRotationProxy;
    if (!r.Equals2(t)) {
      this.TmpRotator.DeepCopy(t);
      t = (o ? this.SpeedScaled(i) : i) * this.TurnRate;
      this.InterpRotator(r, this.TmpRotator, s, t, this.TmpRotator);
      if (this.Entity.GetTickInterval() > 1 && this.AnimComp?.Valid && this.ActorComp.Owner.WasRecentlyRenderedOnScreen()) {
        o = this.AnimComp.GetMeshTransform();
        this.ActorComp.SetActorRotationWithPriority(this.TmpRotator.ToUeRotator(), e, 0, h);
        this.AnimComp.SetModelBuffer(o, s * MathUtils_1.MathUtils.SecondToMillisecond * ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
      } else {
        this.ActorComp.SetActorRotationWithPriority(this.TmpRotator.ToUeRotator(), e, 0, h);
      }
    }
  }
  InterpRotator(t, i, s, h, e) {
    if (this.IsStandardGravity) {
      MathUtils_1.MathUtils.RotatorInterpConstantTo(t, i, s, h, e);
    } else {
      GravityUtils_1.GravityUtils.RotatorInterpConstantToForActor(this.ActorComp, t, i, s, h, e);
    }
  }
  ResetGravityScale() {
    this.VehicleMovement.GravityScale = this.zum;
  }
};
VehicleMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(249)], VehicleMoveComponent);
exports.VehicleMoveComponent = VehicleMoveComponent; //# sourceMappingURL=VehicleMoveComponent.js.map