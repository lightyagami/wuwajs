"use strict";

var __decorate = this && this.__decorate || function (t, i, s, e) {
  var h;
  var o = arguments.length;
  var r = o < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, s) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, s, e);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (h = t[n]) {
        r = (o < 3 ? h(r) : o > 3 ? h(i, s, r) : h(i, s)) || r;
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
exports.BaseSplineMoveComponent = exports.SplineMoveParams = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const CurveUtils_1 = require("../../../../Core/Utils/Curve/CurveUtils");
const PowerCurve3_1 = require("../../../../Core/Utils/Curve/PowerCurve3");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const MAX_OFFSET_INCREASE = 100000;
const HEIGHT_LIMIT = 100000;
const INVALID_TIME_KEY = -1;
class SplineMoveParams {
  constructor(t, i, s) {
    this.Id = t;
    this.Config = i;
    this.Entity = s;
    this.Spline = undefined;
    this.CurrentMaxOffsetSquared = 0;
    this.CurrentMaxOffset = 0;
    this.InputLimitCos = 0;
    this.InputLimitSin = 0;
    this.Type = "PathLine";
    this.MaxOffsetDist = 0;
    this.OnlyForward = false;
    this.InputLimitAngle = 0;
    this.LayerVerticalLimit = HEIGHT_LIMIT;
    this.EdgeLimitCurve = CurveUtils_1.CurveUtils.DefaultLinear;
    this.EarliestLeaveTime = 0;
    this.NeedLimitSoarTransform = false;
    this.MaxSoarSplineSpeed = 0;
    this.SoarFriction = 0;
    this.SoarSprintLimit = 0;
    this.SplineAnalyzeData = undefined;
    this.AdjustFacingType = undefined;
    this.AdjustFacingYaw = 0;
    this.AllowInherit = false;
    this.Type = i.Type;
    this.MaxOffsetDist = i.MaxOffsetDistance ?? 0;
    this.OnlyForward = i.IsOneWay ?? false;
    this.LayerVerticalLimit = i.LayerVerticalLimit ?? HEIGHT_LIMIT;
    if (i.Type === "RacingTrack") {
      this.InputLimitAngle = i.DirectionAngleLimit;
      this.InputLimitCos = Math.cos(this.InputLimitAngle * MathUtils_1.MathUtils.DegToRad);
      this.InputLimitSin = Math.sin(this.InputLimitAngle * MathUtils_1.MathUtils.DegToRad);
    } else if (i.Type === "SlideTrack") {
      this.InputLimitAngle = i.DirectionAngleLimit;
      this.EdgeLimitCurve = new PowerCurve3_1.PowerCurve3(i.EdgeLimitCurveFactor);
    } else if (i.Type === "PathLine") {
      this.AdjustFacingType = i.FacingConfig?.Type;
      if (i.FacingConfig) {
        switch (i.FacingConfig.Type) {
          case 0:
            this.AdjustFacingYaw = i.FacingConfig.YawOffset ?? 0;
            break;
          case 1:
            this.AdjustFacingYaw = i.FacingConfig.Yaw ?? 0;
        }
      }
    } else if (i.Type === "AirPassage" && ((s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)?.Entity?.GetComponent(264)) ? (this.MaxSoarSplineSpeed = s.SplineData.SpeedLimit, this.MaxOffsetDist = s.SplineData.MovableRadius, this.SoarFriction = s.SplineData.Resistance, this.SoarSprintLimit = s.SplineData.SprintSpeedLimit) : (this.MaxSoarSplineSpeed = 3000, this.SoarFriction = 0.5, this.SoarSprintLimit = 0), this.NeedLimitSoarTransform = !!i.Limit, i.Limit)) {
      this.InputLimitAngle = i.Limit.DirectionAngleLimit;
      this.EdgeLimitCurve = new PowerCurve3_1.PowerCurve3(i.Limit.EdgeLimitCurveFactor);
    }
    this.CurrentMaxOffset = this.MaxOffsetDist + MAX_OFFSET_INCREASE;
    this.CurrentMaxOffsetSquared = this.CurrentMaxOffset * this.CurrentMaxOffset;
    if (this.Type === "AirPassage") {
      this.EarliestLeaveTime = Time_1.Time.NowSeconds + 1;
    } else {
      this.EarliestLeaveTime = Time_1.Time.NowSeconds;
    }
  }
  EnableParams(t) {
    if (!this.Spline && t) {
      this.Spline = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(this.Id, this.Entity.Id, 1);
      this.SplineAnalyzeData = ModelManager_1.ModelManager.GameSplineModel?.GetSplineAnalyzeData(this.Id);
    } else if (this.Spline && !t) {
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(this.Id, this.Entity.Id, 1);
      this.Spline = undefined;
      this.SplineAnalyzeData = undefined;
    }
  }
}
exports.SplineMoveParams = SplineMoveParams;
let BaseSplineMoveComponent = class BaseSplineMoveComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.TagComp = undefined;
    this.DisableKey = undefined;
    this.SplineMoveParamsMap = new Map();
    this.SplineStack = new Array();
    this.CurrentSplineMoveParamsInternal = undefined;
    this.SplineTimeKey = 0;
    this.SplineDirection = Vector_1.Vector.Create();
    this.SplineLocation = Vector_1.Vector.Create();
    this.SplineQuat = Quat_1.Quat.Create();
    this.LastTimeKey = INVALID_TIME_KEY;
    this.LastSplineLocation = Vector_1.Vector.Create();
    this.LastSplineDirection = Vector_1.Vector.Create();
    this.AllowInherit = false;
    this.InheritThisFrame = false;
    this.LastLocation = Vector_1.Vector.Create();
    this.TargetLocation = Vector_1.Vector.Create();
    this.OffsetVector = Vector_1.Vector.Create();
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector1 = Vector_1.Vector.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.TmpQuat1 = Quat_1.Quat.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
  }
  get CurrentSplineMoveType() {
    if (this.CurrentSplineMoveParamsInternal) {
      return this.CurrentSplineMoveParamsInternal.Type;
    } else {
      return "PathLine";
    }
  }
  get CurrentSplineMoveParams() {
    return this.CurrentSplineMoveParamsInternal;
  }
  OnStart() {
    this.DisableKey = this.Disable("[SplineMoveComponent.OnStart] 默认Disable");
    this.ActorComp = this.Entity.GetComponent(1);
    this.TagComp = this.Entity.GetComponent(206);
    return true;
  }
  OnTick(t) {
    var i = this.CurrentSplineMoveParams;
    if (i) {
      if (!!this.SplineMoveParamsMap.has(i.Id) || !(i.EarliestLeaveTime <= Time_1.Time.NowSeconds) || !!this.SelectNextSplineMove()) {
        this.UpdateSplineLocationAndDirection();
        this.UpdateLastSplineLocationAndDirection();
        i = t * MathUtils_1.MathUtils.MillisecondToSecond;
        this.PositionAdjust(this.SplineTimeKey, i);
        this.LastLocation.DeepCopy(this.TargetLocation);
        this.LastTimeKey = this.SplineTimeKey;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "Tick in No SplineMove!");
      }
      this.DisableKey = this.Disable("[SplineMoveComponent.OnTick] this.CurrentSplineMoveParams为false");
    }
  }
  OnEnd() {
    this.ClearSplineMoveParams();
    return true;
  }
  PositionAdjust(t, i) {
    switch (this.CurrentSplineMoveType) {
      case "RacingTrack":
      case "PathLine":
      case "SlideTrack":
        this.PositionAdjustCommon(t, i);
    }
  }
  PositionAdjustCommon(t, i) {
    this.TargetLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
    this.CheckAndLimitOnlyForwardMove();
    this.LimitRightAxisMove();
    this.MoveToTargetLocation(i);
  }
  LimitRightAxisMove() {
    var t;
    var i = this.CurrentSplineMoveParamsInternal;
    this.SplineLocation.Subtraction(this.TargetLocation, this.OffsetVector);
    GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.OffsetVector);
    this.SplineDirection.Multiply(this.OffsetVector.DotProduct(this.SplineDirection), this.TmpVector);
    this.OffsetVector.SubtractionEqual(this.TmpVector);
    var s = this.OffsetVector.SizeSquared();
    var e = this.CurrentSplineMoveParamsInternal.CurrentMaxOffset;
    if (this.CurrentSplineMoveParamsInternal.CurrentMaxOffsetSquared < s) {
      if (e > 0) {
        t = Math.sqrt(s);
        this.OffsetVector.Multiply((t - e) / t, this.TmpVector);
        this.TargetLocation.AdditionEqual(this.TmpVector);
      } else {
        GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.OffsetVector);
        this.TargetLocation.AdditionEqual(this.OffsetVector);
      }
    } else if (i.CurrentMaxOffset > i.MaxOffsetDist) {
      if (s > MathUtils_1.MathUtils.Square(i.MaxOffsetDist)) {
        i.CurrentMaxOffset = Math.sqrt(s);
        i.CurrentMaxOffsetSquared = s;
      } else {
        i.CurrentMaxOffset = i.MaxOffsetDist;
        i.CurrentMaxOffsetSquared = MathUtils_1.MathUtils.Square(i.MaxOffsetDist);
      }
    }
  }
  MoveToTargetLocation(t) {
    if (!(Vector_1.Vector.DistSquared(this.ActorComp.ActorLocationProxy, this.TargetLocation) <= MathUtils_1.MathUtils.SmallNumber)) {
      this.ActorComp.SetActorLocation(this.TargetLocation.ToUeVector(), "样条移动", false);
    }
  }
  CheckAndLimitOnlyForwardMove() {
    this.ActorComp.ActorLocationProxy.Subtraction(this.LastLocation, this.TmpVector);
    var t = this.TmpVector.DotProduct(this.SplineDirection) > 0;
    if (!this.CurrentSplineMoveParamsInternal.OnlyForward || t) {
      return false;
    }
    this.LastLocation.Subtraction(this.TargetLocation, this.OffsetVector);
    t = this.SplineDirection.DotProduct(this.OffsetVector);
    this.SplineDirection.Multiply(t, this.TmpVector);
    this.TargetLocation.AdditionEqual(this.TmpVector);
    return true;
  }
  StartSplineMove(t, i, s = false) {
    if (this.StartMoveConditionCheck(t, i)) {
      (i = new SplineMoveParams(t, i, this.Entity)).AllowInherit = s;
      this.StartSplineMoveInternal(t, i);
    }
  }
  StartSplineMoveInternal(t, i) {
    if (this.DisableKey) {
      this.Enable(this.DisableKey, "SplineMoveComponent.StartSplineMoveInternal");
      this.DisableKey = undefined;
      this.OnSplineMoveEnable(t, i);
    }
    this.AddSplineMoveParams(t, i);
    this.SelectNextSplineMove();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Movement", 6, "StartSplineMove", ["Spline Id", t], ["Actor", this.ActorComp.Owner.GetName()], ["StackCount", this.SplineStack.length]);
    }
  }
  EndSplineMove(t) {
    if (this.EndMoveConditionCheck(t)) {
      this.RemoveSplineMoveParams(t);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Movement", 6, "EndSplineMove", ["Spline Id", t], ["Actor", this.ActorComp.Owner.GetName()], ["StackCount", this.SplineStack.length]);
      }
      if (!(this.CurrentSplineMoveParamsInternal.EarliestLeaveTime > Time_1.Time.NowSeconds)) {
        this.SelectNextSplineMove();
      }
    }
  }
  ForceStopSplineMove() {
    if (!this.DisableKey) {
      this.DisableKey = this.Disable("SplineMoveComponent.ForceStopSplineMove");
      this.OnSplineMoveDisable();
    }
    this.CurrentSplineMoveParamsInternal = undefined;
    this.ClearSplineMoveParams();
  }
  IsPlannerMove() {
    return true;
  }
  StartMoveConditionCheck(t, i) {
    return !this.SplineStack.length || this.SplineStack[this.SplineStack.length - 1] !== t;
  }
  EndMoveConditionCheck(t) {
    return !!this.SplineMoveParamsMap.get(t);
  }
  SelectNextSplineMove() {
    var t;
    if (this.SplineStack.length) {
      t = this.SplineMoveParamsMap.get(this.SplineStack[this.SplineStack.length - 1]);
      this.CurrentSplineMoveParamsInternal = t;
      this.UpdateSplineLocationAndDirection();
    } else {
      if (!this.DisableKey) {
        this.DisableKey = this.Disable("[SplineMoveComponent.EndSplineMove] 没有下一个SplineMove");
        this.OnSplineMoveDisable();
      }
      this.CurrentSplineMoveParamsInternal = undefined;
    }
    this.OnSelectNextSplineMoveEnd();
    return !!this.CurrentSplineMoveParams;
  }
  AddSplineMoveParams(t, i) {
    if (!this.SplineMoveParamsMap.get(t)) {
      i.EnableParams(true);
      this.SplineMoveParamsMap.set(t, i);
    }
    this.SplineStack.push(t);
  }
  RemoveSplineMoveParams(t) {
    this.SplineMoveParamsMap.get(t)?.EnableParams(false);
    this.SplineMoveParamsMap.delete(t);
    while (this.SplineStack.length && !this.SplineMoveParamsMap.has(this.SplineStack[this.SplineStack.length - 1])) {
      this.SplineStack.length = this.SplineStack.length - 1;
    }
  }
  ClearSplineMoveParams() {
    for (var [t] of this.SplineMoveParamsMap) {
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(t, this.Entity.Id, 1);
    }
    this.SplineMoveParamsMap.clear();
    this.SplineStack.length = 0;
  }
  OnSplineMoveEnable(t, i) {}
  OnSplineMoveDisable() {}
  OnSelectNextSplineMoveEnd() {
    this.LastLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
    this.LastSplineDirection.DeepCopy(this.SplineDirection);
    this.LastSplineLocation.DeepCopy(this.SplineLocation);
    this.LastTimeKey = INVALID_TIME_KEY;
  }
  UpdateSplineLocationAndDirection() {
    var t = this.CurrentSplineMoveParams.Spline;
    var i = t.D_FindInputKeyClosestToWorldLocationInGravity(this.ActorComp.ActorLocationProxy.ToUeVector(), this.ActorComp.ActorGravityDirectProxy.ToUeVectorOld(), this.CurrentSplineMoveParams.LayerVerticalLimit);
    this.SplineTimeKey = i;
    this.SplineLocation.FromUeVector(t.D_GetLocationAtSplineInputKey(i, 1));
    this.SplineDirection.DeepCopy(t.GetDirectionAtSplineInputKey(i, 1));
    if (this.IsPlannerMove()) {
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.SplineDirection);
    }
    this.SplineDirection.Normalize();
    this.TmpVector.DeepCopy(this.ActorComp.ActorGravityDirectProxy);
    this.TmpVector.UnaryNegation(this.TmpVector);
    MathUtils_1.MathUtils.LookRotationUpFirst(this.SplineDirection, this.TmpVector, this.SplineQuat);
  }
  UpdateLastSplineLocationAndDirection() {
    var t;
    if (this.LastTimeKey !== INVALID_TIME_KEY) {
      t = this.CurrentSplineMoveParamsInternal.Spline;
      this.LastSplineLocation.FromUeVector(t.D_GetLocationAtSplineInputKey(this.LastTimeKey, 1));
      this.LastSplineDirection.FromUeVector(t.GetDirectionAtSplineInputKey(this.LastTimeKey, 1));
      if (this.IsPlannerMove()) {
        GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.ActorComp, this.LastSplineDirection);
      }
      this.LastSplineDirection.Normalize();
    }
  }
};
BaseSplineMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(108)], BaseSplineMoveComponent);
exports.BaseSplineMoveComponent = BaseSplineMoveComponent; //# sourceMappingURL=BaseSplineMoveComponent.js.map