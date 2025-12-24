"use strict";

var __decorate = this && this.__decorate || function (t, i, s, h) {
  var e;
  var o = arguments.length;
  var r = o < 3 ? i : h === null ? h = Object.getOwnPropertyDescriptor(i, s) : h;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, s, h);
  } else {
    for (var _ = t.length - 1; _ >= 0; _--) {
      if (e = t[_]) {
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
exports.MotorcycleSplineMoveComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const BaseSplineMoveComponent_1 = require("../../Common/Component/BaseSplineMoveComponent");
const VehicleSplineMoveComponent_1 = require("../Common/VehicleSplineMoveComponent");
const greenColor = new UE.LinearColor(0, 1, 0, 1);
const AUTOPILOT_BRAKING_THRESHOLD_MIN = 30;
const AUTOPILOT_BRAKING_THRESHOLD_MAX = 90;
const ROAD_BLOCK_DETECT_RADIUS = 15;
const ROAD_BLOCK_DETECT_DIS = 4000;
const ROAD_BLOCK_DETECT_MAX_ANGLE = 10;
const ROAD_BLOCK_DETECT_HEIGHT = 100;
const ROAD_BLOCK_RIGHT_OFFSET = -500;
const ROAD_BLOCK_NEW_PREDICT_DIST = 1000;
const PROFILE_KEY = "Motor SplineMove RoadBlock";
let MotorcycleSplineMoveComponent = class MotorcycleSplineMoveComponent extends VehicleSplineMoveComponent_1.VehicleSplineMoveComponent {
  constructor() {
    super(...arguments);
    this.QuatDelta = Quat_1.Quat.Create();
    this.MoveDelta = Vector_1.Vector.Create();
    this.AutopilotBrakingInternal = false;
    this.AutopilotSprintInternal = false;
    this.IsForward = true;
    this.IsDebug = false;
  }
  get AutopilotBraking() {
    return this.AutopilotBrakingInternal;
  }
  set AutopilotBraking(t) {
    var i;
    if (this.AutopilotBrakingInternal !== t && (this.AutopilotBrakingInternal = t, i = this.Entity.GetComponent(265))) {
      i.BackBraking = t;
    }
  }
  get AutopilotSprint() {
    return this.AutopilotSprintInternal;
  }
  set AutopilotSprint(t) {
    if (this.AutopilotSprintInternal !== t) {
      if (this.AutopilotSprintInternal = t) {
        this.TagComp?.AddTag(-105723823);
      } else {
        this.TagComp?.RemoveTag(-105723823);
      }
    }
  }
  PositionAdjust(t, i) {
    this.CalAdjustRotation(t, i);
    this.PositionAdjustCommon(t, i);
  }
  MoveToTargetLocation(t) {
    var i;
    var s;
    if (this.IsDebug && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Test", 6, "SplineMove MoveToTargetLocation", ["TimeKey", this.SplineTimeKey], ["Current", this.CharActorComp.ActorLocationProxy], ["Target", this.TargetLocation], ["QuatDelta", this.QuatDelta]);
    }
    if (!this.TargetLocation.Equals(this.CharActorComp.ActorLocationProxy) || !this.QuatDelta.Equals(Quat_1.Quat.IdentityProxy)) {
      if (i = this.ActorComp?.Actor?.VehicleMovementComponent) {
        this.TargetLocation.Subtraction(this.ActorComp.ActorLocationProxy, this.TmpVector);
        this.TmpVector1.FromUeVector(i.GetMotorNormal());
        if ((s = this.TmpVector.DotProduct(this.TmpVector1)) < 0) {
          this.MoveDelta.DeepCopy(this.TmpVector);
        } else {
          Vector_1.Vector.VectorPlaneProject(this.TmpVector, this.TmpVector1, this.MoveDelta);
        }
        if (this.IsDebug && Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Test", 6, "SplineMove MoveToTargetLocation2", ["dot", s], ["Offset", this.TmpVector], ["Normal", this.TmpVector1], ["MoveDelta", this.MoveDelta]);
        }
        i.MoveMotorcycle(this.MoveDelta.ToUeVectorOld(), this.QuatDelta.ToUeQuat(), true);
        if (this.ActorComp?.DebugMovementComp) {
          this.ActorComp.DebugMovementComp.MarkDebugRecord("SplineMove.SetActorLocation", 1);
        }
        this.ActorComp.ResetLocationCachedTime();
      } else {
        super.MoveToTargetLocation(t);
        this.ActorComp.AddActorWorldRotation(this.QuatDelta.Rotator().ToUeRotator(), "MotorSplineMove");
      }
      this.ActorComp.ResetRotationCachedTime();
    }
  }
  CalAdjustRotation(t, i) {
    var s = this.ActorComp.ActorForwardProxy;
    let h = this.CurrentSplineMoveParams.PredictDist;
    if (!this.IsForward) {
      h *= -1;
    }
    var e = this.CurrentSplineMoveParams.Spline;
    var o = e.GetDistanceAlongSplineAtSplineInputKey(this.SplineTimeKey);
    this.TmpVector.FromUeVector(e.D_GetLocationAtDistanceAlongSpline(o + h, 1));
    this.TmpVector.SubtractionEqual(this.ActorComp.ActorLocationProxy);
    var e = this.CharActorComp?.MoveComp;
    if (e) {
      MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector, e.GravityUp, this.TmpQuat);
    } else {
      MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector, Vector_1.Vector.UpVectorProxy, this.TmpQuat);
    }
    this.TmpQuat.UnRotateVector(s, this.TmpVector);
    let r = false;
    if (Math.abs(this.TmpVector.Z) > this.CurrentSplineMoveParams.AdjustFacingLimitPitchSin) {
      this.TmpVector.Z = Math.sign(this.TmpVector.Z) * this.CurrentSplineMoveParams.AdjustFacingLimitPitchSin;
      r = true;
    }
    o = Math.sqrt(1 - this.TmpVector.Z * this.TmpVector.Z);
    if (MathUtils_1.MathUtils.IsNearlyZero(this.TmpVector.X) && MathUtils_1.MathUtils.IsNearlyZero(this.TmpVector.Y)) {
      this.TmpVector.X = o;
      this.TmpVector.Y = 0;
    } else {
      let t = this.CurrentSplineMoveParams.AdjustFacingLimit * MathUtils_1.MathUtils.DegToRad;
      if (this.CurrentSplineMoveParams?.AdjustFacingLimitCurve) {
        this.ActorComp.ActorLocationProxy.Subtraction(this.SplineLocation, this.TmpVector1);
        this.TmpQuat.UnRotateVector(this.TmpVector1, this.TmpVector1);
        e = this.TmpVector1.Y / this.CurrentSplineMoveParams.MaxOffsetDist;
        t *= this.CurrentSplineMoveParams.AdjustFacingLimitCurve.GetFloatValue(Math.abs(e));
      }
      e = Math.atan2(this.TmpVector.Y, this.TmpVector.X);
      if (e > t) {
        this.TmpVector.X = Math.cos(t);
        this.TmpVector.Y = Math.sin(t);
        r = true;
      } else if (e < -t) {
        this.TmpVector.X = Math.cos(-t);
        this.TmpVector.Y = Math.sin(-t);
        r = true;
      } else {
        this.TmpVector.X = Math.cos(e);
        this.TmpVector.Y = Math.sin(e);
      }
      this.TmpVector.X *= o;
      this.TmpVector.Y *= o;
    }
    if (r) {
      if (this.IsDebug && (this.TmpQuat.UnRotateVector(this.ActorComp.ActorForwardProxy, this.TmpVector1), Log_1.Log.CheckWarn())) {
        Log_1.Log.Warn("Test", 6, "Motor SplineMove CalAdjustRotation", ["TimeKey", this.SplineTimeKey], ["OnlyForward", this.CurrentSplineMoveParams.OnlyForward], ["Local", this.TmpVector1], ["NewLocal", this.TmpVector], ["Limit", this.CurrentSplineMoveParams.AdjustFacingLimit], ["PitchCos", this.CurrentSplineMoveParams.AdjustFacingLimitPitchSin]);
      }
      this.TmpQuat.RotateVector(this.TmpVector, this.TmpVector1);
      Quat_1.Quat.FindBetween(s, this.TmpVector1, this.QuatDelta);
    } else {
      this.QuatDelta.Reset();
    }
  }
  InputAdjust() {
    var t;
    var i;
    var s;
    if (this.CurrentSplineMoveParams) {
      if (this.CurrentSplineMoveParams.AutopilotRoute) {
        if (this.uKm()) {
          this.KSm(0, 0, true, ROAD_BLOCK_RIGHT_OFFSET, ROAD_BLOCK_NEW_PREDICT_DIST);
        } else {
          this.KSm(0, 0, true);
        }
      } else if (this.CurrentSplineMoveParams.AutoDriveStandbyTime >= 0 && this.Entity.GetComponent(264).LastInputSeconds + this.CurrentSplineMoveParams.AutoDriveStandbyTime <= Time_1.Time.NowSeconds) {
        this.KSm(0, 0);
      } else if (s = this.CurrentSplineMoveParams.InputCorrectionCurve) {
        this.TmpVector.DeepCopy(this.SplineDirection);
        t = this.ActorComp.ActorForwardProxy;
        t = this.TmpVector.DotProduct(t);
        if (!this.CurrentSplineMoveParams.OnlyForward) {
          if (t < 0) {
            t = -t;
            this.TmpVector.MultiplyEqual(-1);
          }
        }
        if (t = this.CharActorComp?.MoveComp) {
          MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector, t.GravityUp, this.TmpQuat);
        } else {
          MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector, Vector_1.Vector.UpVectorProxy, this.TmpQuat);
        }
        this.ActorComp.ActorLocationProxy.Subtraction(this.SplineLocation, this.TmpVector1);
        this.TmpQuat.UnRotateVector(this.TmpVector1, this.TmpVector1);
        t = this.TmpVector1.Y / this.CurrentSplineMoveParams.MaxOffsetDist;
        i = s.GetFloatValue(t);
        s = -s.GetFloatValue(-t);
        this.KSm(s, i);
      } else {
        this.KSm(-1, 1);
      }
    }
  }
  KSm(t, i, s = false, h = 0, e = 0) {
    let o = e > 0 ? e : this.CurrentSplineMoveParams.PredictDist;
    if (!this.IsForward) {
      o *= -1;
    }
    var e = this.CurrentSplineMoveParams.Spline;
    var r = e.GetDistanceAlongSplineAtSplineInputKey(this.SplineTimeKey);
    this.TmpVector.FromUeVector(e.D_GetLocationAtDistanceAlongSpline(r + o, 1));
    if (h !== 0) {
      MathUtils_1.MathUtils.LookRotationUpFirst(this.SplineDirection, this.ActorComp.VehicleMoveComp.GravityUp, this.TmpQuat);
      this.TmpQuat.GetRightVector(this.TmpVector1);
      this.TmpVector1.MultiplyEqual(h);
      this.TmpVector.AdditionEqual(this.TmpVector1);
    }
    if (this.IsDebug) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 6, "Motor auto pilot", ["TimeKey", this.SplineTimeKey], ["location", this.SplineLocation], ["dist", r], ["WithOffset", this.TmpVector]);
      }
      UE.KismetSystemLibrary.D_DrawDebugArrow(this.ActorComp.Owner, this.ActorComp.ActorLocation, this.TmpVector.ToUeVector(), 5, greenColor, undefined, 10);
    }
    this.TmpVector.SubtractionEqual(this.ActorComp.ActorLocationProxy);
    this.TmpVector.Normalize();
    var e = GravityUtils_1.GravityUtils.GetAngleOffsetInGravityForActor(this.ActorComp, this.ActorComp.ActorForwardProxy, this.TmpVector);
    let _ = e / this.CurrentSplineMoveParams.InputCorrectionBaseAngle;
    if (_ + i < this.CharActorComp.InputDirectProxy.Y) {
      _ += i;
    } else if (_ + t > this.CharActorComp.InputDirectProxy.Y) {
      _ += t;
    } else {
      _ = this.CharActorComp.InputDirectProxy.Y;
    }
    this.ActorComp.SetInputDirectByNumber(1, MathUtils_1.MathUtils.Clamp(_, -1, 1), 0);
    if (s) {
      if (Math.abs(e) > (this.AutopilotBraking ? AUTOPILOT_BRAKING_THRESHOLD_MIN : AUTOPILOT_BRAKING_THRESHOLD_MAX)) {
        this.AutopilotBraking = true;
      } else {
        this.AutopilotBraking = false;
      }
      this.AutopilotSprint = !this.AutopilotBraking && this.CurrentSplineMoveParams.AutoSprint && MathUtils_1.MathUtils.IsNearlyZero(h) && this.TagComp.HasTag(886886086);
    } else {
      this.AutopilotBraking = false;
      this.AutopilotSprint = false;
    }
  }
  UpdateSplineLocationAndDirection() {
    var s = this.CurrentSplineMoveParams.Spline;
    let h = 0;
    var e;
    var o;
    var r = s.GetNumberOfSplinePoints() - 1;
    if (this.LastTimeKey === BaseSplineMoveComponent_1.INVALID_TIME_KEY || r < 5) {
      h = s.D_FindInputKeyClosestToWorldLocationInGravity(this.ActorComp.ActorLocationProxy.ToUeVector(), this.ActorComp.ActorGravityDirectProxy.ToUeVectorOld(), this.CurrentSplineMoveParams.LayerVerticalLimit);
      if (this.IsDebug && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 6, "MotorSplineMove Start", ["ActorLocation", this.ActorComp?.ActorLocationProxy], ["timeKey", h]);
      }
    } else {
      let t = this.LastTimeKey;
      let i = this.LastTimeKey;
      i = this.IsForward ? (t = this.LastTimeKey - 1, this.LastTimeKey + 3) : (t = this.LastTimeKey - 3, this.LastTimeKey + 1);
      h = s.IsClosedLoop() ? t < 0 ? (o = s.D_FindInputKeyClosestToWorldLocationInRange(this.ActorComp.ActorLocation, t + r, r), e = s.D_FindInputKeyClosestToWorldLocationInRange(this.ActorComp.ActorLocation, 0, i), this.TmpVector.FromUeVector(s.D_GetLocationAtSplineInputKey(o, 1)), this.TmpVector1.FromUeVector(s.D_GetLocationAtSplineInputKey(e, 1)), Vector_1.Vector.DistSquared(this.ActorComp.ActorLocationProxy, this.TmpVector) < Vector_1.Vector.DistSquared(this.ActorComp.ActorLocationProxy, this.TmpVector1) ? o : e) : i > r ? (o = s.D_FindInputKeyClosestToWorldLocationInRange(this.ActorComp.ActorLocation, 0, i - r), e = s.D_FindInputKeyClosestToWorldLocationInRange(this.ActorComp.ActorLocation, t, r), this.TmpVector.FromUeVector(s.D_GetLocationAtSplineInputKey(o, 1)), this.TmpVector1.FromUeVector(s.D_GetLocationAtSplineInputKey(e, 1)), Vector_1.Vector.DistSquared(this.ActorComp.ActorLocationProxy, this.TmpVector) < Vector_1.Vector.DistSquared(this.ActorComp.ActorLocationProxy, this.TmpVector1) ? o : e) : s.D_FindInputKeyClosestToWorldLocationInRange(this.ActorComp.ActorLocation, t, i) : s.D_FindInputKeyClosestToWorldLocationInRange(this.ActorComp.ActorLocation, t, i);
      if (this.IsDebug && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 6, "MotorSplineMove Update", ["LastSplineLocation", this.LastSplineLocation], ["LastTimeKey", this.LastTimeKey], ["ActorLocation", this.ActorComp?.ActorLocationProxy], ["timeKey", h], ["Points", s.GetNumberOfSplinePoints()]);
      }
    }
    this.SplineTimeKey = h;
    this.SplineLocation.FromUeVector(s.D_GetLocationAtSplineInputKey(h, 1));
    this.SplineDirection.DeepCopy(s.GetDirectionAtSplineInputKey(h, 1));
    if (this.CurrentSplineMoveParams.OnlyForward || this.CurrentSplineMoveParams.PositiveMove) {
      this.IsForward = true;
    } else {
      r = this.ActorComp.ActorForwardProxy;
      o = this.SplineDirection.DotProduct(r);
      this.IsForward = o >= 0;
    }
    if (this.IsPlannerMove()) {
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.SplineDirection);
    }
    this.SplineDirection.Normalize();
    this.TmpVector.DeepCopy(this.ActorComp.ActorGravityDirectProxy);
    this.TmpVector.UnaryNegation(this.TmpVector);
    MathUtils_1.MathUtils.LookRotationUpFirst(this.SplineDirection, this.TmpVector, this.SplineQuat);
    this.CurrentSplineMoveParams?.UpdateParamsByTimeKey(this.SplineTimeKey);
  }
  uKm(t = ROAD_BLOCK_DETECT_DIS) {
    let i = t;
    if (!this.IsForward) {
      i *= -1;
    }
    var s = this.CurrentSplineMoveParams.Spline;
    var h = s.GetDistanceAlongSplineAtSplineInputKey(this.SplineTimeKey);
    this.TmpVector.FromUeVector(s.D_GetLocationAtDistanceAlongSpline(h + i, 1));
    this.TmpVector.Subtraction(this.SplineLocation, this.TmpVector1);
    var t = this.TmpVector1.Size();
    if (t < 10) {
      return false;
    }
    var e = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    e.WorldContextObject = this.ActorComp.Owner;
    e.Radius = ROAD_BLOCK_DETECT_RADIUS;
    e.ActorsToIgnore.Empty();
    if (this.IsDebug) {
      e.SetDrawDebugTrace(1);
    }
    var o = this.PerformComp?.Driver?.GetComponent(1)?.Owner;
    if (o) {
      e.ActorsToIgnore.Add(o);
    }
    var r = this.ActorComp.Actor.CapsuleComponent;
    var o = Math.acos(this.TmpVector1.DotProduct(this.SplineDirection) / t) * MathUtils_1.MathUtils.RadToDeg;
    var _ = Math.max(1, Math.ceil(o / ROAD_BLOCK_DETECT_MAX_ANGLE));
    var a = i / _;
    this.TmpVector.DeepCopy(this.SplineLocation);
    var n = this.ActorComp?.MoveComp?.GravityDirect ?? Vector_1.Vector.DownVectorProxy;
    GravityUtils_1.GravityUtils.AddZnInGravity(n, this.TmpVector, ROAD_BLOCK_DETECT_HEIGHT);
    let l = false;
    for (let t = 0; t < _; ++t) {
      this.TmpVector1.DeepCopy(s.D_GetLocationAtDistanceAlongSpline(h + (t + 1) * a, 1));
      GravityUtils_1.GravityUtils.AddZnInGravity(n, this.TmpVector1, ROAD_BLOCK_DETECT_HEIGHT);
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, this.TmpVector);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, this.TmpVector1);
      if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(r, e, PROFILE_KEY, PROFILE_KEY)) {
        if (this.IsDebug) {
          e.SetDrawDebugTrace(0);
        }
        l = true;
        break;
      }
      this.TmpVector.DeepCopy(this.TmpVector1);
    }
    if (this.IsDebug) {
      e.SetDrawDebugTrace(0);
    }
    return l;
  }
  OnSelectNextSplineMoveEnd() {
    super.OnSelectNextSplineMoveEnd();
    this.Entity.GetComponent(264)?.ForceRefreshBraking();
  }
  EndSplineMove(t) {
    super.EndSplineMove(t);
    this.AutopilotBraking = false;
    this.AutopilotSprint = false;
  }
  ForceClearUpdate() {
    this.LastTimeKey = BaseSplineMoveComponent_1.INVALID_TIME_KEY;
  }
};
MotorcycleSplineMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(119)], MotorcycleSplineMoveComponent);
exports.MotorcycleSplineMoveComponent = MotorcycleSplineMoveComponent; //# sourceMappingURL=MotorcycleSplineMoveComponent.js.map