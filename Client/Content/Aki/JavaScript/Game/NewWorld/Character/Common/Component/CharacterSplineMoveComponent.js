"use strict";

var CharacterSplineMoveComponent_1;
var __decorate = this && this.__decorate || function (t, i, s, h) {
  var e;
  var a = arguments.length;
  var r = a < 3 ? i : h === null ? h = Object.getOwnPropertyDescriptor(i, s) : h;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, s, h);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (e = t[n]) {
        r = (a < 3 ? e(r) : a > 3 ? e(i, s, r) : e(i, s)) || r;
      }
    }
  }
  if (a > 3 && r) {
    Object.defineProperty(i, s, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSplineMoveComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const Quat_1 = require("../../../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const CharacterNameDefines_1 = require("../../../Character/Common/CharacterNameDefines");
const CharacterAttributeTypes_1 = require("../../../Character/Common/Component/Abilities/CharacterAttributeTypes");
const CharacterUnifiedStateTypes_1 = require("../../../Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const BaseSplineMoveComponent_1 = require("../../../Common/Component/BaseSplineMoveComponent");
const COSINE_45 = 0.707;
const MAX_INPUT_COS = 0.707;
const FORWARD_BACKWARD_THRESHOLD = 0.5;
const FORECAST_DIST = 500;
const DAMPING = 0.96;
const STANDARD_FPS = 60;
let CharacterSplineMoveComponent = CharacterSplineMoveComponent_1 = class CharacterSplineMoveComponent extends BaseSplineMoveComponent_1.BaseSplineMoveComponent {
  constructor() {
    super(...arguments);
    this.isn = undefined;
    this.rJo = undefined;
    this.Gce = undefined;
    this.oRe = undefined;
    this.osn = undefined;
    this.LastRightSpeed = 0;
    this.LastForward = true;
    this.MinTurnAngle = 0;
    this.MaxTurnAngle = 0;
    this.CurMaxWidth = 0;
    this.CurMaxHeight = 0;
    this.CurLongLen = 0;
    this.CurShortLen = 0;
    this.LocalOffset = Vector_1.Vector.Create();
    this.LocalQuat = Quat_1.Quat.Create();
    this.DebugMode = false;
    this.I3r = (t, i) => {
      var s = t.GetComponent(116);
      if (s?.Active) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Movement", 50, "[CharacterSplineMoveComp] 轨道模式继承", ["LastEntity", t.Id], ["CurEntity", this.Entity.Id]);
        }
        this.InheritThisFrame = true;
        for (const e of s.SplineStack) {
          var h = s.SplineMoveParamsMap.get(e);
          if (h.AllowInherit) {
            this.InheritStartSplineMove(h);
          }
        }
        this.LastTimeKey = s.LastTimeKey;
        this.LastSplineLocation = s.LastSplineLocation;
        this.LastSplineDirection = s.LastSplineDirection;
        this.LastLocation = s.LastLocation;
        this.LastRightSpeed = s.LastRightSpeed;
        this.LastForward = s.LastForward;
        for (const a of s.SplineStack) {
          if (s.SplineMoveParamsMap.get(a).AllowInherit) {
            s.EndSplineMove(a);
          }
        }
        this.InheritThisFrame = false;
      }
    };
  }
  static get SplineMoveConfig() {
    this.msn ||= ResourceSystem_1.ResourceSystem.GetLoadedAsset(this.DaPath, UE.Object);
    return this.msn;
  }
  OnStart() {
    super.OnStart();
    if ((0, RegisterComponent_1.isComponentInstance)(this.ActorComp, 3)) {
      this.isn = this.ActorComp;
    }
    this.Gce = this.Entity.GetComponent(187);
    this.oRe = this.Entity.GetComponent(186);
    this.rJo = this.Entity.GetComponent(184);
    this.osn = this.Entity.GetComponent(182);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.RoleOnStateInherit, this.I3r);
    return super.OnEnd();
  }
  PositionAdjust(t, i) {
    switch (this.CurrentSplineMoveType) {
      case "RacingTrack":
        this.B_c(t, i);
        break;
      case "PathLine":
      case "SlideTrack":
        this.PositionAdjustCommon(t, i);
        break;
      case "AirPassage":
        this.PositionAdjustAirPassage(t, i);
    }
  }
  B_c(t, i) {
    this.TargetLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
    this.gsn(i);
    if (!this.CheckAndLimitOnlyForwardMove() && this.LastSplineDirection.Normalize()) {
      this.k_c();
      this.q_c();
    }
    this.LimitRightAxisMove();
    this.MoveToTargetLocation(i);
  }
  PositionAdjustAirPassage(t, i) {
    if (this.CurrentSplineMoveParamsInternal.NeedLimitSoarTransform && this.rJo?.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar && !this.SplineDirection.Equals(Vector_1.Vector.ZeroVectorProxy)) {
      this.TargetLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
      this.CheckAndLimitOnlyForwardMove();
      this.TargetLocation.Subtraction(this.SplineLocation, this.OffsetVector);
      this.UpdateCrossSectionParamsAirPassage();
      this.RotationAndVelocityAdjustAirPassage();
      this.LimitCircleAxisMove();
      this.MoveToTargetLocation(i);
    }
  }
  RotationAndVelocityAdjustAirPassage() {
    var t = this.CurrentSplineMoveParamsInternal;
    var i = this.CurrentSplineMoveParamsInternal.EdgeLimitCurve;
    var s = this.CurMaxWidth ? i.GetCurrentValue(Math.abs(this.LocalOffset.Y) / this.CurMaxWidth) : 1;
    var i = this.CurMaxHeight ? i.GetCurrentValue(Math.abs(this.LocalOffset.Z) / this.CurMaxHeight) : 1;
    let h = -t.InputLimitAngle;
    let e = t.InputLimitAngle;
    let a = -t.InputLimitAngle;
    let r = t.InputLimitAngle;
    if (this.LocalOffset.Y < 0) {
      h *= 1 - s;
    } else {
      e *= 1 - s;
    }
    this.TmpVector1.DeepCopy(this.ActorComp.ActorForwardProxy);
    GravityUtils_1.GravityUtils.GetBaseQuatInGravityForActor(this.ActorComp, this.TmpQuat);
    this.TmpQuat.Inverse(this.TmpQuat1);
    this.TmpQuat1.RotateVector(this.ActorComp.ActorForwardProxy, this.TmpVector1);
    var t = this.TmpVector1.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg;
    this.TmpQuat1.RotateVector(this.SplineDirection, this.TmpVector1);
    var n = this.TmpVector1.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg;
    var o = n + h;
    var _ = n + e;
    if (!this.InAngleRange(t, o, _)) {
      o = this.ClampAngle(t, o, _);
      _ = this.LerpAngle(t, o, s);
      _ = MathUtils_1.MathUtils.WrapAngle(_ - t);
      this.TmpRotator.Set(0, _, 0);
      this.ActorComp?.AddActorLocalRotation(this.TmpRotator.ToUeRotator(), "轨道模式修正", true);
      this.TmpQuat1.RotateVector(this.isn.ActorVelocityProxy, this.TmpVector1);
      this.TmpRotator.Quaternion().RotateVector(this.TmpVector1, this.TmpVector);
      this.TmpQuat.RotateVector(this.TmpVector, this.TmpVector1);
      this.ActorComp?.MoveComp?.SetForceSpeed(this.TmpVector1);
      if (this.DebugMode && (this.TmpQuat1.RotateVector(this.ActorComp.ActorForwardProxy, this.TmpVector1), l = this.TmpVector1.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Test", 50, "[CharSplineMoveComp] 修改Yaw", ["cur", t], ["target", o], ["Spline", n], ["add", _], ["after", l], ["min", h], ["max", e], ["rate", s]);
      }
    }
    if (this.LocalOffset.Z < 0) {
      a *= 1 - i;
    } else {
      r *= 1 - i;
    }
    this.isn.ActorVelocityProxy.GetSafeNormal(this.TmpVector1);
    var t = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.ActorComp, this.TmpVector1);
    var o = Math.asin(MathUtils_1.MathUtils.Clamp(t, -1, 1)) * MathUtils_1.MathUtils.RadToDeg;
    var n = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.ActorComp, this.SplineDirection);
    var _ = Math.asin(MathUtils_1.MathUtils.Clamp(n, -1, 1)) * MathUtils_1.MathUtils.RadToDeg;
    var l = _ + a;
    var s = _ + r;
    if (!this.InAngleRange(o, l, s)) {
      t = this.ClampAngle(o, l, s);
      n = this.LerpAngle(o, t, i);
      l = MathUtils_1.MathUtils.WrapAngle(n - o);
      s = this.isn.ActorVelocityProxy.Size();
      this.TmpRotator.Set(n, 0, 0);
      this.ActorComp.ActorQuatProxy.Multiply(this.TmpRotator.Quaternion(), this.TmpQuat1);
      this.TmpQuat1.GetForwardVector(this.TmpVector1);
      this.TmpVector1.MultiplyEqual(s);
      this.ActorComp.MoveComp.SetForceSpeed(this.TmpVector1);
      if (this.DebugMode && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 50, "[CharSplineMoveComp] 修改Pitch", ["cur", o], ["target", t], ["Spline", _], ["add", l], ["after", this.TmpQuat1.Rotator().Pitch], ["min", a], ["max", r], ["rate", i]);
      }
    }
  }
  UpdateCrossSectionParamsAirPassage() {
    MathUtils_1.MathUtils.LookRotationUpFirst(this.SplineDirection, this.ActorComp.MoveComp.GravityUp, this.LocalQuat);
    this.LocalQuat.GetForwardVector(this.TmpVector);
    this.TmpVector.Multiply(this.OffsetVector.DotProduct(this.TmpVector), this.TmpVector1);
    this.OffsetVector.SubtractionEqual(this.TmpVector1);
    this.LocalQuat.Inverse(this.TmpQuat1);
    this.TmpQuat1.RotateVector(this.OffsetVector, this.LocalOffset);
    var t;
    var i;
    var s = this.CurrentSplineMoveParamsInternal;
    var h = GravityUtils_1.GravityUtils.GetZnInGravityForActor(this.ActorComp, this.SplineDirection);
    if (Math.abs(h) > COSINE_45) {
      this.CurShortLen = 0;
      this.CurLongLen = 0;
      this.CurMaxWidth = 0;
      this.CurMaxHeight = 0;
    } else {
      this.CurShortLen = s.MaxOffsetDist;
      this.CurLongLen = this.CurShortLen / Math.sqrt(1 - h * h);
      s = this.LocalOffset.Y;
      h = this.LocalOffset.Z;
      t = this.CurShortLen;
      s = (i = this.CurLongLen) * i - i * i * s * s / (t * t);
      this.CurMaxWidth = (h = t * t - t * t * h * h / (i * i)) <= 0 ? 0 : Math.sqrt(h);
      this.CurMaxHeight = s <= 0 ? 0 : Math.sqrt(s);
      if (this.DebugMode) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 50, "[CharSplineMoveComp] 椭圆参数", ["a", t], ["b", i], ["MaxX", this.CurMaxWidth], ["MaxY", this.CurMaxHeight]);
        }
        this.DrawDebugInfo();
      }
    }
  }
  LimitCircleAxisMove() {
    var t;
    var i;
    if (!this.IsInEllipseRange(this.LocalOffset.Y, this.LocalOffset.Z, this.CurShortLen, this.CurLongLen)) {
      if (Math.abs(this.LocalOffset.Y) < 1) {
        t = Math.abs(this.LocalOffset.Z);
        i = (t = Math.sign(this.LocalOffset.Z) * Math.max(this.CurLongLen, t)) - this.LocalOffset.Z;
        GravityUtils_1.GravityUtils.SetZnInGravityForActor(this.ActorComp, this.OffsetVector, t);
        GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.ActorComp, this.TargetLocation, i);
      } else {
        t = this.LocalOffset.Z / this.LocalOffset.Y;
        i = 1 / (1 / ((i = this.CurShortLen) * i) + t * t / ((i = this.CurLongLen) * i));
        i = Math.sign(this.LocalOffset.Y) * Math.sqrt(i);
        this.LocalOffset.Set(0, i, t * i);
        this.LocalQuat.RotateVector(this.LocalOffset, this.TmpVector);
        this.TmpVector.Subtraction(this.OffsetVector, this.TmpVector1);
        this.OffsetVector.DeepCopy(this.TmpVector);
        this.TargetLocation.AdditionEqual(this.TmpVector1);
      }
    }
  }
  DrawDebugInfo() {
    UE.KismetSystemLibrary.DrawDebugArrow(this.ActorComp?.Owner, this.SplineLocation.ToUeVectorOld(), this.TargetLocation.ToUeVectorOld(), 10, new UE.LinearColor(0, 0, 1, 1), 1, 5);
    this.LocalQuat.GetRightVector(this.TmpVector);
    this.TmpVector.MultiplyEqual(this.CurShortLen);
    this.TmpVector.AdditionEqual(this.SplineLocation);
    UE.KismetSystemLibrary.DrawDebugArrow(this.ActorComp?.Owner, this.SplineLocation.ToUeVectorOld(), this.TmpVector.ToUeVectorOld(), 10, new UE.LinearColor(1, 0, 0, 1), 1, 5);
    this.LocalQuat.GetUpVector(this.TmpVector);
    this.TmpVector.MultiplyEqual(this.CurLongLen);
    this.TmpVector.AdditionEqual(this.SplineLocation);
    UE.KismetSystemLibrary.DrawDebugArrow(this.ActorComp?.Owner, this.SplineLocation.ToUeVectorOld(), this.TmpVector.ToUeVectorOld(), 10, new UE.LinearColor(0, 1, 0, 1), 1, 5);
  }
  IsInEllipseRange(t, i, s, h) {
    return !MathUtils_1.MathUtils.IsNearlyZero(s) && !MathUtils_1.MathUtils.IsNearlyZero(h) && t * t / (s * s) + i * i / (h * h) <= 1;
  }
  PositionAdjustCommon(t, i) {
    this.TargetLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
    if (!this.CheckAndLimitOnlyForwardMove() && this.LastSplineDirection.Normalize()) {
      this.k_c();
    }
    this.LimitRightAxisMove();
    this.MoveToTargetLocation(i);
  }
  MoveToTargetLocation(t) {
    if (!(Vector_1.Vector.DistSquared(this.ActorComp.ActorLocationProxy, this.TargetLocation) <= MathUtils_1.MathUtils.SmallNumber)) {
      if (this.Gce) {
        this.TargetLocation.Subtraction(this.ActorComp.ActorLocationProxy, this.OffsetVector);
        this.Gce.MoveCharacter(this.OffsetVector, t);
      } else {
        this.ActorComp.SetActorLocation(this.TargetLocation.ToUeVector(), "样条移动", false);
      }
    }
  }
  k_c() {
    if (this.isn) {
      this.TmpVector.DeepCopy(this.isn.ActorVelocityProxy);
      Quat_1.Quat.FindBetween(this.LastSplineDirection, this.SplineDirection, this.TmpQuat);
      this.TmpQuat.RotateVector(this.TmpVector, this.TmpVector);
      this.isn.SetActorVelocity(this.TmpVector);
    }
  }
  q_c() {
    var t;
    if (this.CurrentSplineMoveParamsInternal.Type === "RacingTrack" && this.LastSplineDirection.Normalize()) {
      this.TargetLocation.Subtraction(this.LastSplineLocation, this.OffsetVector);
      this.OffsetVector.Z = 0;
      this.LastSplineDirection.Multiply(this.OffsetVector.DotProduct(this.LastSplineDirection), this.TmpVector);
      this.OffsetVector.SubtractionEqual(this.TmpVector);
      this.TmpQuat.RotateVector(this.OffsetVector, this.TmpVector);
      t = this.TargetLocation.Z;
      this.SplineLocation.Addition(this.TmpVector, this.TargetLocation);
      this.TargetLocation.Z = t;
    }
  }
  gsn(s) {
    if (this.isn && this.CurrentSplineMoveParamsInternal.Type === "RacingTrack") {
      var h = this.isn.InputDirectProxy;
      this.TmpVector.X = -this.SplineDirection.Y;
      this.TmpVector.Y = this.SplineDirection.X;
      this.TmpVector.Z = 0;
      let t = this.TmpVector.DotProduct(h);
      if (t < -this.CurrentSplineMoveParamsInternal.InputLimitSin) {
        t = -this.CurrentSplineMoveParamsInternal.InputLimitSin;
      } else if (t > this.CurrentSplineMoveParamsInternal.InputLimitSin) {
        t = this.CurrentSplineMoveParamsInternal.InputLimitSin;
      }
      var h = this.Gce.CharacterMovement.MaxWalkSpeed * t;
      var e = this.Gce.CharacterMovement.MaxAcceleration;
      var a = h - this.LastRightSpeed;
      var e = e * s;
      let i = 0;
      if (Math.abs(a) > e) {
        i = a * this.LastRightSpeed < 0 ? this.LastRightSpeed * Math.pow(DAMPING, s * STANDARD_FPS) : this.LastRightSpeed;
        i += Math.sign(a) * e;
      } else {
        i = h;
      }
      this.TmpVector.MultiplyEqual((this.LastRightSpeed + i) / 2 * s);
      this.TargetLocation.AdditionEqual(this.TmpVector);
      this.LastRightSpeed = i;
    }
  }
  InputAdjust() {
    if (this.isn && this.CurrentSplineMoveType !== "AirPassage") {
      if (this.rJo?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Climb) {
        this.O_c();
      } else {
        this.G_c(this.isn.InputDirectProxy);
      }
    }
  }
  O_c() {
    var t = this.isn.InputDirectProxy;
    ModelManager_1.ModelManager.CameraModel.CameraRotator.Quaternion(this.TmpQuat);
    this.TmpQuat.RotateVector(t, this.TmpVector);
    this.isn.SetInputDirect(this.TmpVector);
    this.G_c(t);
    this.ActorComp.ActorQuatProxy.Inverse(this.TmpQuat);
    this.TmpQuat.RotateVector(t, this.TmpVector);
    this.TmpVector.Z = 0;
    this.isn.SetInputDirect(this.TmpVector);
  }
  G_c(t) {
    switch (this.CurrentSplineMoveParamsInternal.Type) {
      case "RacingTrack":
        this.F_c(t);
        break;
      case "PathLine":
        this.N_c(t);
        break;
      case "SlideTrack":
        this.V_c(t);
    }
  }
  V_c(t) {
    var i = this.CurrentSplineMoveParamsInternal;
    this.SplineQuat.Inverse(this.TmpQuat);
    this.ActorComp.ActorLocationProxy.Subtraction(this.SplineLocation, this.TmpVector);
    this.TmpQuat.RotateVector(this.TmpVector, this.TmpVector);
    var s = i.EdgeLimitCurve.GetCurrentValue(Math.abs(this.TmpVector.Y) / i.MaxOffsetDist);
    let h = -i.InputLimitAngle;
    let e = i.InputLimitAngle;
    if (this.TmpVector.Y < 0) {
      h *= 1 - s;
    } else {
      e *= 1 - s;
    }
    this.MinTurnAngle = h;
    this.MaxTurnAngle = e;
    if (t.IsNearlyZero()) {
      this.SplineQuat.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.TmpVector);
    } else {
      ModelManager_1.ModelManager.CameraModel.CameraRotator.Quaternion(this.TmpQuat);
      this.TmpQuat.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.TmpVector);
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.TmpVector);
      if (this.TmpVector.IsNearlyZero()) {
        this.TmpQuat.RotateVector(Vector_1.Vector.UpVectorProxy, this.TmpVector);
      }
      this.ActorComp.ActorGravityDirectProxy.UnaryNegation(this.TmpVector1);
      MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector, this.TmpVector1, this.TmpQuat);
      this.TmpQuat.Inverse(this.TmpQuat);
      this.TmpQuat.RotateVector(t, this.TmpVector);
      i = this.TmpVector.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg;
      s = MathUtils_1.MathUtils.Clamp(i, h, e) * MathUtils_1.MathUtils.DegToRad;
      this.TmpVector.Set(Math.cos(s), Math.sin(s), 0);
      this.SplineQuat.RotateVector(this.TmpVector, this.TmpVector);
    }
    this.isn.SetInputDirect(this.TmpVector);
    this.isn.SetInputFacing(this.TmpVector, true);
  }
  N_c(t) {
    var i = this.CurrentSplineMoveParamsInternal;
    var s = t.DotProduct(this.SplineDirection);
    let h = 0;
    if (i.OnlyForward) {
      if (t.DotProduct(this.SplineDirection) < MAX_INPUT_COS) {
        this.isn.ClearInput(true);
        this.tEu(i);
        return;
      }
      h = 1;
    } else {
      if (Math.abs(s) < MAX_INPUT_COS) {
        this.isn.ClearInput(true);
        this.tEu(i);
        return;
      }
      h = Math.sign(s);
    }
    this.SplineDirection.Multiply(h * FORECAST_DIST, this.TmpVector);
    this.TmpVector.AdditionEqual(this.SplineLocation);
    this.TmpVector.SubtractionEqual(this.TargetLocation);
    this.TmpVector.Z = 0;
    this.TmpVector.Normalize();
    this.isn.SetInputDirect(this.TmpVector);
    this.isn.SetInputFacing(this.TmpVector, true);
    this.tEu(i);
  }
  tEu(t) {
    switch (t.AdjustFacingType) {
      case 0:
        if (Math.abs(this.SplineDirection.DotProduct(this.Gce.GravityUp)) < 1 - MathUtils_1.MathUtils.KindaSmallNumber) {
          MathUtils_1.MathUtils.LookRotationUpFirst(this.SplineDirection, this.Gce.GravityUp, this.TmpQuat);
          this.TmpVector1.Set(Math.cos(MathUtils_1.MathUtils.DegToRad * t.AdjustFacingLimit), Math.sin(MathUtils_1.MathUtils.DegToRad * t.AdjustFacingLimit), 0);
          this.TmpQuat.RotateVector(this.TmpVector1, this.TmpVector);
          this.isn.SetInputFacing(this.TmpVector, true);
        }
        break;
      case 1:
        this.TmpVector.Set(Math.cos(MathUtils_1.MathUtils.DegToRad * t.AdjustFacingLimit), Math.sin(MathUtils_1.MathUtils.DegToRad * t.AdjustFacingLimit), 0);
        this.isn.SetInputFacing(this.TmpVector, true);
    }
  }
  F_c(t) {
    var i = this.CurrentSplineMoveParamsInternal;
    this.isn.SetInputFacing(this.SplineDirection, true);
    if (t.IsNearlyZero() || (t = this.SplineDirection.DotProduct(t), i.OnlyForward) || t > (this.LastForward ? -FORWARD_BACKWARD_THRESHOLD : FORWARD_BACKWARD_THRESHOLD)) {
      this.LastForward = true;
      this.isn.SetInputDirect(this.SplineDirection);
    } else {
      this.LastForward = false;
      this.SplineDirection.UnaryNegation(this.TmpVector);
      this.isn.SetInputDirect(this.TmpVector);
    }
  }
  NormalizeAngle(t) {
    let i = t % 360;
    if (i < 0) {
      i += 360;
    }
    return i;
  }
  InAngleRange(t, i, s) {
    s = this.NormalizeAngle(s - i);
    return this.NormalizeAngle(t - i) < s;
  }
  ClampAngle(t, i, s) {
    if (this.InAngleRange(t, i, s)) {
      return MathUtils_1.MathUtils.WrapAngle(t);
    } else if (Math.abs(MathUtils_1.MathUtils.WrapAngle(t - i)) < Math.abs(MathUtils_1.MathUtils.WrapAngle(t - s))) {
      return MathUtils_1.MathUtils.WrapAngle(i);
    } else {
      return MathUtils_1.MathUtils.WrapAngle(s);
    }
  }
  LerpAngle(t, i, s) {
    return MathUtils_1.MathUtils.WrapAngle(t + MathUtils_1.MathUtils.WrapAngle(i - t) * s);
  }
  StartSplineMoveInternal(t) {
    var i = t.Id;
    if (this.DisableKey) {
      this.Enable(this.DisableKey, "SplineMoveComponent.StartSplineMoveInternal");
      this.DisableKey = undefined;
      this.OnSplineMoveEnable(i, t);
    }
    this.AddSplineMoveParams(i, t);
    this.SelectNextSplineMove();
    this.LastRightSpeed = 0;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Movement", 6, "StartSplineMove", ["Spline Id", i], ["Actor", this.ActorComp.Owner.GetName()], ["StackCount", this.SplineStack.length]);
    }
  }
  IsPlannerMove() {
    return this.CurrentSplineMoveType !== "AirPassage";
  }
  ApplySplineMoveDaConfig(t) {
    if (t.Type !== "SlideTrack" && t.Type !== "AirPassage") {
      this.FEm(true);
    }
  }
  ResetSplineMoveDaConfig() {
    this.FEm(false);
  }
  FEm(t) {
    if (t) {
      this.Gce?.SetTurnRate(CharacterSplineMoveComponent_1.SplineMoveConfig.TurnRate);
      this.Gce?.SetAirControl(CharacterSplineMoveComponent_1.SplineMoveConfig.AirControl);
      this.Gce?.SetOverrideMaxFallingSpeed(CharacterSplineMoveComponent_1.SplineMoveConfig.MaxFlySpeed);
      this.TagComp?.AddTag(-451106150);
      this.osn?.SetBaseValue(Protocol_1.Aki.Protocol.Vks.RIm, CharacterAttributeTypes_1.PER_TEN_THOUSAND * CharacterSplineMoveComponent_1.SplineMoveConfig.JumpHeightRate);
      t = this.oRe?.MainAnimInstance;
      if (UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE)) {
        t.设置跳跃速率(CharacterSplineMoveComponent_1.SplineMoveConfig.JumpTimeScale);
      }
    } else {
      this.Gce?.ResetTurnRate();
      this.Gce?.ResetAirControl();
      this.Gce?.ResetOverrideMaxFallingSpeed();
      this.TagComp?.RemoveTag(-451106150);
      this.osn?.SetBaseValue(Protocol_1.Aki.Protocol.Vks.RIm, CharacterAttributeTypes_1.PER_TEN_THOUSAND);
      t = this.oRe?.MainAnimInstance;
      if (UE.KuroStaticLibrary.IsObjectClassByName(t, CharacterNameDefines_1.CharacterNameDefines.ABP_BASEROLE)) {
        t.设置跳跃速率(1);
      }
    }
  }
  OnSplineMoveEnable(t, i) {
    super.OnSplineMoveEnable(t, i);
    this.ApplySplineMoveDaConfig(i);
  }
  OnSplineMoveDisable() {
    super.OnSplineMoveDisable();
    this.ResetSplineMoveDaConfig();
  }
  OnSelectNextSplineMoveEnd() {
    if (!this.InheritThisFrame) {
      this.isn?.ClearInput();
      this.Wzl();
    }
    super.OnSelectNextSplineMoveEnd();
  }
  Wzl() {
    if (this.CurrentSplineMoveParamsInternal) {
      this.MinTurnAngle = -this.CurrentSplineMoveParamsInternal.InputLimitAngle;
      this.MaxTurnAngle = this.CurrentSplineMoveParamsInternal.InputLimitAngle;
    }
  }
};
CharacterSplineMoveComponent.DaPath = "/Game/Aki/Data/Fight/DA_SplineMoveConfig.DA_SplineMoveConfig";
CharacterSplineMoveComponent.msn = undefined;
CharacterSplineMoveComponent = CharacterSplineMoveComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(116)], CharacterSplineMoveComponent);
exports.CharacterSplineMoveComponent = CharacterSplineMoveComponent; //# sourceMappingURL=CharacterSplineMoveComponent.js.map