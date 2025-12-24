"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehiclePathMoveController = exports.MoveStateInfo = exports.PathCurveInfo = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const SplineCurve_1 = require("../../../../Core/Utils/Curve/SplineCurve");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const TEMPRORY_SPLINE_CURVE_ID = -1;
const BINARY_SEARCH_DEPTH = 40;
const MOVE_TO_TASK_POSITION_ADJUSTED_TIME = 2000;
const MOVE_TO_TASK_POSITION_ADJUSTED_DIST = 150;
class PathCurveInfo {
  constructor() {
    this.SplineId = 0;
    this.SplineConfig = undefined;
    this.SplineCurve = undefined;
    this.TimeControlCurve = undefined;
    this.TotalTime = 0;
    this.TotalLength = 0;
    this.IsLoop = false;
    this.IsCircle = false;
    this.BiTangentNormal = Vector_1.Vector.Create();
  }
  IsValid() {
    return this.SplineCurve !== undefined && this.TotalTime > 0;
  }
  GetPathRatioByTimeRatio(t) {
    var e = MathUtils_1.MathUtils.Clamp(t, 0, 1);
    if (this.TimeControlCurve?.IsValid()) {
      return this.TimeControlCurve.GetFloatValue(e);
    } else {
      return t;
    }
  }
  GetTimeRatioByPathRatio(t) {
    var e = MathUtils_1.MathUtils.Clamp(t, 0, 1);
    if (t === 0 || t === 1) {
      return t;
    }
    if (!this.TimeControlCurve?.IsValid()) {
      return t;
    }
    let [i, s, h] = [0, 0, 1];
    while (i < BINARY_SEARCH_DEPTH && h - s > MathUtils_1.MathUtils.SmallNumber) {
      var o = (s + h) * 0.5;
      if (this.TimeControlCurve.GetFloatValue(o) < e) {
        s = o;
      } else {
        h = o;
      }
      i++;
    }
    return s;
  }
  InitFromSplineId(t, e) {
    var i;
    var s = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (s) {
      if ((i = (0, IComponent_1.getComponent)(s.ComponentsData, "SplineComponent")) && i.Option.Points?.length) {
        if (i.Option.Type !== IComponent_1.ESplineType.ContinuesVariableSpeedMovement) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 50, "[PathCurveInfo.InitFromSplineId] 用于初始化载具移动任务的样条不是变速样条", ["SplineId", t], ["Type", i.Option.Type]);
          }
          return false;
        } else {
          this.SplineConfig = i.Option;
          if (this.SplineConfig.EntireTimePathConfig?.TimePathCurve && this.SplineConfig.EntireTimePathConfig.TimePathCurve !== "") {
            this.TimeControlCurve = ResourceSystem_1.ResourceSystem.Load(this.SplineConfig.EntireTimePathConfig.TimePathCurve, UE.CurveFloat);
            if (this.TimeControlCurve?.IsValid()) {
              this.SplineId = t;
              this.TotalTime = this.SplineConfig.EntireTimePathConfig.TotalTime;
              this.SplineCurve = new SplineCurve_1.SplineCurve();
              if (e) {
                this.SplineCurve.Init(e.SplineCurves.Position, e.SplineCurves.ReparamTable.Points, e.SplineCurves.Rotation, e.SplineCurves.Scale);
              } else {
                this.SplineCurve.InitPoints(this.SplineConfig.Points);
              }
              if (s.Transform) {
                this.SplineCurve.SetSplineTransform(s.Transform, false);
              }
              this.TotalLength = this.SplineCurve.GetSplineLength();
              return true;
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("SceneItem", 50, "[PathCurveInfo.InitFromSplineId] 时间路径曲线加载失败", ["SplineId", t], ["Type", i.Option.Type]);
              }
              return false;
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SceneItem", 50, "[PathCurveInfo.InitFromSplineId] 变速样条未配置时间路径曲线", ["SplineId", t], ["Type", i.Option.Type]);
            }
            return false;
          }
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 50, "[PathCurveInfo.InitFromSplineId] 样条没有启用组件或配置移动点", ["SplineId", t]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 50, "[PathCurveInfo.InitFromSplineId] 获取不到样条实体数据", ["SplineEntityId", t]);
      }
      return false;
    }
  }
}
exports.PathCurveInfo = PathCurveInfo;
class MoveStateInfo {
  constructor() {
    this.ElapsedTime = 0;
    this.TimeRatio = 0;
    this.PathRatio = 0;
    this.PathDeltaSign = 1;
    this.IsFinish = false;
  }
  DeepCopy() {
    var t = new MoveStateInfo();
    t.TimeRatio = this.TimeRatio;
    t.PathRatio = this.PathRatio;
    t.PathDeltaSign = this.PathDeltaSign;
    t.IsFinish = this.IsFinish;
    t.ElapsedTime = this.ElapsedTime;
    return t;
  }
}
exports.MoveStateInfo = MoveStateInfo;
class VehiclePathMoveTask {
  constructor(t, e, i) {
    this.VehicleEntity = undefined;
    this.ActorComp = undefined;
    this.PerformComp = undefined;
    this.AnimComp = undefined;
    this.AudioComp = undefined;
    this.CurveInfo = undefined;
    this.StateInfo = undefined;
    this.SimulateRotation = true;
    this.NeedSync = true;
    this.KeepForward = false;
    this.DynamicGravity = false;
    this.OnMoveEndHandle = undefined;
    this.MoveOffset = Vector_1.Vector.Create();
    this.VehicleEntity = t;
    this.CurveInfo = e;
    this.StateInfo = i;
    this.ActorComp = this.VehicleEntity.GetComponent(247);
    this.PerformComp = this.VehicleEntity.GetComponent(250);
    this.AnimComp = this.VehicleEntity.GetComponent(248);
    this.AudioComp = this.VehicleEntity.GetComponent(255);
  }
  IsValid() {
    return !!this.CurveInfo?.IsValid() && !!this.VehicleEntity?.Valid;
  }
  Update(t) {
    return !!this.CurveInfo && !!this.StateInfo && !!this.VehicleEntity?.Valid && !(this.UpdateRatio(t), this.UpdateGravity(t), this.UpdateTransform(t), this.AudioComp?.UpdateVehicleMoveSound(this.ActorComp.SimulatedVelocity.Size(), this.ActorComp.Owner), 0);
  }
  UpdateRatio(t) {
    if (this.StateInfo && this.CurveInfo?.IsValid()) {
      this.StateInfo.ElapsedTime += t;
      this.StateInfo.TimeRatio = this.StateInfo.ElapsedTime / this.CurveInfo.TotalTime;
      this.StateInfo.PathRatio = this.CurveInfo.GetPathRatioByTimeRatio(MathUtils_1.MathUtils.Clamp(this.StateInfo.TimeRatio, 0, 1));
      this.StateInfo.IsFinish = this.StateInfo.TimeRatio >= 1;
    }
  }
  GetUpdateTransform(t) {
    if (this.CurveInfo && this.StateInfo && (this.CurveInfo.SplineCurve.GetTransformAtRateAlongSpline(this.StateInfo.PathRatio, 1, t), this.StateInfo.PathDeltaSign < 0)) {
      t.GetRotation().Inverse(VehiclePathMoveTask.TmpQuat);
      t.SetRotation(VehiclePathMoveTask.TmpQuat);
    }
  }
  UpdateTransform(t) {
    if (this.StateInfo && this.CurveInfo) {
      VehiclePathMoveTask.TmpVector.DeepCopy(this.ActorComp.ActorGravityDirectProxy);
      VehiclePathMoveTask.TmpVector.MultiplyEqual(-1);
      this.CurveInfo.SplineCurve?.SetReferenceUp(VehiclePathMoveTask.TmpVector);
      this.GetUpdateTransform(VehiclePathMoveTask.TmpTrans);
      this.AdjustMoveOffsetForGravity(VehiclePathMoveTask.TmpVector);
      var e = VehiclePathMoveTask.TmpTrans.GetLocation().AdditionEqual(VehiclePathMoveTask.TmpVector).ToUeVector();
      let t = VehiclePathMoveTask.TmpTrans.GetRotation().Rotator().ToUeRotator();
      if (!this.SimulateRotation && !this.DynamicGravity) {
        t = this.ActorComp.ActorQuatProxy.Rotator().ToUeRotator();
      }
      var i = `VehiclePathMoveController.Update(SplineId:${this.CurveInfo.SplineId})`;
      this.AnimComp.SetLocationAndRotatorWithKeepingModelBuffer(e, t, 0, i);
    }
  }
  UpdateGravity(t) {
    var e;
    if (this.CurveInfo && this.StateInfo && this.DynamicGravity && !this.CurveInfo.BiTangentNormal.Equals(Vector_1.Vector.ZeroVectorProxy) && (this.GetUpdateTransform(VehiclePathMoveTask.TmpTrans), e = MathUtils_1.MathUtils.CommonTempVector, VehiclePathMoveTask.TmpTrans.GetRotation().GetForwardVector(e), Vector_1.Vector.CrossProduct(e, this.CurveInfo.BiTangentNormal, VehiclePathMoveTask.TmpVector), VehiclePathMoveTask.TmpVector.Normalize())) {
      this.PerformComp?.SetGravityDirectForVehicleWithoutRotate(VehiclePathMoveTask.TmpVector);
    }
  }
  JumpToPoint(t) {
    if (this.CurveInfo && this.StateInfo) {
      if (!(t > this.CurveInfo.SplineConfig.Points.length)) {
        t = this.CurveInfo.SplineCurve.GetSplineLengthAtPoint(t) / this.CurveInfo.TotalLength;
        this.JumpToTargetPathRatio(t);
      }
    }
  }
  JumpToTargetPathRatio(t) {
    if (this.CurveInfo && this.StateInfo) {
      if (t < 0 || t > 1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Vehicle", 50, "不合法的目标路径进度", ["EntityId", this.VehicleEntity?.Id], ["SplineId", this.CurveInfo.SplineId], ["TargetPathRatio", t]);
        }
      } else {
        this.StateInfo.TimeRatio = this.CurveInfo.GetTimeRatioByPathRatio(t);
        this.StateInfo.ElapsedTime = this.CurveInfo.GetTimeRatioByPathRatio(this.StateInfo.TimeRatio) * this.CurveInfo.TotalTime;
        this.StateInfo.PathRatio = this.CurveInfo.GetPathRatioByTimeRatio(this.StateInfo.TimeRatio);
        this.StateInfo.IsFinish = this.StateInfo.TimeRatio >= 1;
      }
    }
  }
  CalcOffsetBeforeMove() {
    var t = this.VehicleEntity?.GetComponent(246);
    if (t) {
      switch (t.VehicleType) {
        case "Gongduola":
        case "AutoMoveGongduola":
          this.VehicleEntity.GetComponent(260)?.GetNormalizedBuoyancyBalanceOffset(this.MoveOffset);
          this.MoveOffset.X = 0;
          this.MoveOffset.Y = 0;
      }
    }
  }
  AdjustMoveOffsetForGravity(t) {
    var e = this.VehicleEntity?.GetComponent(246);
    if (e) {
      switch (e.VehicleType) {
        case "Gongduola":
        case "AutoMoveGongduola":
          this.VehicleEntity.GetComponent(247)?.ActorGravityDirectProxy.Multiply(-this.MoveOffset.Z, t);
      }
    }
  }
  EnableDynamicGravity(t) {
    var e;
    var i;
    var s;
    var h;
    if (!!this.CurveInfo?.SplineCurve && !((s = this.CurveInfo.SplineCurve.GetSplinePointsNum()) < 3)) {
      if (this.DynamicGravity !== t && (this.DynamicGravity = t)) {
        t = Vector_1.Vector.Create();
        e = Vector_1.Vector.Create();
        i = Vector_1.Vector.Create();
        this.CurveInfo.SplineCurve.GetWorldLocationAtSplinePoint(0, t);
        this.CurveInfo.SplineCurve.GetWorldLocationAtSplinePoint(s / 2, e);
        this.CurveInfo.SplineCurve.GetWorldLocationAtSplinePoint(s - 1, i);
        s = Vector_1.Vector.Create();
        h = Vector_1.Vector.Create();
        e.Subtraction(t, s);
        i.Subtraction(t, h);
        Vector_1.Vector.CrossProduct(s, h, this.CurveInfo.BiTangentNormal);
        this.CurveInfo.BiTangentNormal.Normalize();
      }
    }
  }
  GetTransformAtSplineIndex(t, e) {
    this.CurveInfo.SplineCurve.GetTransformAtSplineIndex(t, 1, e);
  }
}
VehiclePathMoveTask.TmpTrans = Transform_1.Transform.Create();
VehiclePathMoveTask.TmpQuat = Quat_1.Quat.Create();
VehiclePathMoveTask.TmpVector = Vector_1.Vector.Create();
class MotorcyclePathMoveTask extends VehiclePathMoveTask {
  constructor(t, e, i) {
    super(t, e, i);
    this.HXd = 180;
    this.TraceLength = 1000;
    this.TraceStartOffset = 500;
    this.yem = 50;
    this.mWi = undefined;
    this.xrm = Vector_1.Vector.Create();
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector1 = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpVector3 = Vector_1.Vector.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
    this.TmpQuat = Quat_1.Quat.Create();
  }
  Update(t) {
    return !!this.CurveInfo && !!this.StateInfo && !!this.VehicleEntity?.Valid && !(this.UpdateRatio(t * this.VehicleEntity.TimeDilation), this.UpdateTransform(t * this.VehicleEntity.TimeDilation), 0);
  }
  UpdateTransform(t) {
    var e;
    var i;
    if (this.StateInfo && this.CurveInfo) {
      this.GetUpdateTransform(VehiclePathMoveTask.TmpTrans);
      if (this.SimulateRotation) {
        this.rhm(VehiclePathMoveTask.TmpTrans);
      } else if (this.KeepForward) {
        this.Jdm(VehiclePathMoveTask.TmpTrans);
      }
      i = this.ActorComp.ActorQuatProxy;
      t = this.HXd * t;
      e = Quat_1.Quat.AngularDistance(i, VehiclePathMoveTask.TmpTrans.GetRotation());
      e = MathCommon_1.MathCommon.RadianToDegree(e);
      t = MathUtils_1.MathUtils.Clamp(t / e, 0, 1);
      Quat_1.Quat.Slerp(i, VehiclePathMoveTask.TmpTrans.GetRotation(), t, VehiclePathMoveTask.TmpQuat);
      e = VehiclePathMoveTask.TmpQuat.Rotator().ToUeRotator();
      i = `VehiclePathMoveController.Update(SplineId:${this.CurveInfo.SplineId})`;
      this.AnimComp.SetLocationAndRotatorWithKeepingModelBuffer(VehiclePathMoveTask.TmpTrans.GetLocation().ToUeVector(), e, 0, i);
    }
  }
  wTu() {
    var t = UE.NewObject(UE.TraceSphereElement.StaticClass());
    t.bIsSingle = true;
    t.bIgnoreSelf = true;
    t.WorldContextObject = this.ActorComp.Owner;
    t.Radius = 30;
    t.bTraceComplex = false;
    t.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    t.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet);
    return t;
  }
  GetTransformAtSplineIndex(t, e) {
    this.CurveInfo.SplineCurve.GetTransformAtSplineIndex(t, 1, e);
    if (this.SimulateRotation) {
      this.rhm(e);
    } else if (this.KeepForward) {
      this.Jdm(VehiclePathMoveTask.TmpTrans);
    }
  }
  rhm(t) {
    var e;
    var i;
    var s;
    var h;
    if (this.StateInfo && this.CurveInfo && (this.mWi ||= this.wTu(), s = this.TraceStartOffset, e = this.TraceLength, t.GetRotation().RotateVector(Vector_1.Vector.UpVectorProxy, this.xrm), i = this.TmpVector, this.xrm.GetSafeNormal(i), i.MultiplyEqual(s), i.AdditionEqual(t.GetLocation()), s = this.TmpVector2, this.xrm.GetSafeNormal(s), s.MultiplyEqual(-e), s.AdditionEqual(t.GetLocation()), TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.mWi, i), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.mWi, s), TraceElementCommon_1.TraceElementCommon.SphereTrace(this.mWi, "BuildWallSpline")) && this.mWi.HitResult) {
      e = this.TmpVector;
      TraceElementCommon_1.TraceElementCommon.GetImpactPoint(this.mWi.HitResult, 0, e);
      i = this.TmpVector1;
      TraceElementCommon_1.TraceElementCommon.GetImpactNormal(this.mWi.HitResult, 0, i);
      i.Multiply(this.yem, this.TmpVector2);
      e.AdditionEqual(this.TmpVector2);
      s = this.TmpVector2;
      this.CurveInfo.SplineCurve.GetDirectionAtRateAlongSpline(this.StateInfo.PathRatio, 1, s);
      s.Normalize();
      (i = i).Normalize();
      h = this.TmpVector3;
      Vector_1.Vector.CrossProduct(i, s, h);
      h.Normalize();
      s = UE.KismetMathLibrary.MakeRotationFromAxes(s.ToUeVectorOld(), h.ToUeVectorOld(), i.ToUeVectorOld());
      this.TmpRotator.DeepCopy(s);
      h = this.TmpRotator.Quaternion();
      t.SetLocation(e);
      t.SetRotation(h);
    }
  }
  Jdm(t) {
    t.GetRotation().RotateVector(Vector_1.Vector.UpVectorProxy, this.TmpVector);
    var e = this.TmpVector3;
    Vector_1.Vector.CrossProduct(this.TmpVector, this.ActorComp.ActorForwardProxy, e);
    var e = UE.KismetMathLibrary.MakeRotationFromAxes(this.ActorComp.ActorForwardProxy.ToUeVectorOld(), e.ToUeVectorOld(), this.TmpVector.ToUeVectorOld());
    this.TmpRotator.DeepCopy(e);
    var e = this.TmpRotator.Quaternion();
    t.SetRotation(e);
  }
}
class VehiclePathMoveController extends ControllerBase_1.ControllerBase {
  static TickPriority1(t) {
    var e = t * MathUtils_1.MathUtils.MillisecondToSecond;
    for (const s of this.PendingEndTaskSet) {
      var i = !!s.StateInfo?.IsFinish;
      this.SplineMoveTaskMap.delete(s.VehicleEntity);
      if (i && s.CurveInfo?.IsLoop) {
        this.AddLoopTask(s);
      } else {
        this.PostRemoveMoveTask(s);
        if (s.OnMoveEndHandle) {
          s.OnMoveEndHandle(i);
        }
      }
    }
    this.PendingEndTaskSet.clear();
    for (const h of this.SplineMoveTaskMap.values()) {
      this.PreUpdateTask(e, h);
      if (!h.Update(e) || !!h.StateInfo?.IsFinish) {
        this.PendingEndTaskSet.add(h);
      }
      this.PostUpdateTask(e, h);
    }
  }
  static AddSplineMoveTask(t) {
    var e;
    if (t.VehicleEntity?.Valid && t.CurveInfo && t.StateInfo) {
      if (!(e = this.SplineMoveTaskMap.get(t.VehicleEntity)) || !!e.StateInfo?.IsFinish) {
        this.PreAddMoveTask(t);
        this.SplineMoveTaskMap.set(t.VehicleEntity, t);
      }
    }
  }
  static RemoveSplineMoveTask(t) {
    var e;
    if (t.GetComponent(247) && (e = this.SplineMoveTaskMap.get(t)) && (this.SplineMoveTaskMap.delete(t), this.PendingEndTaskSet.delete(e), this.PostRemoveMoveTask(e), e.OnMoveEndHandle)) {
      e.OnMoveEndHandle(e.StateInfo.IsFinish);
    }
  }
  static PreAddMoveTask(t) {
    var e;
    var t = t.VehicleEntity;
    if (t && !this.VehicleMoveDisableHandleMap.has(t) && (e = t.GetComponent(259).Disable("VehiclePathMoveController.PreAddMoveTask"), this.VehicleMoveDisableHandleMap.set(t, e), e = t.GetComponent(249))) {
      e.IsMovePath = true;
    }
  }
  static PostRemoveMoveTask(t) {
    var e = t.VehicleEntity;
    if (e && (t.ActorComp.SimulatedVelocity.Reset(), t = this.VehicleMoveDisableHandleMap.get(e), e.GetComponent(259).Enable(t, "VehiclePathMoveController.PostRemoveMoveTask"), this.VehicleMoveDisableHandleMap.delete(e), t = e.GetComponent(249))) {
      t.IsMovePath = false;
    }
  }
  static PreUpdateTask(t, e) {
    e.ActorComp?.LastActorLocation.DeepCopy(e.ActorComp.ActorLocationProxy);
    e.ActorComp?.LastActorRotation.DeepCopy(e.ActorComp.ActorRotationProxy);
  }
  static PostUpdateTask(t, e) {
    if (e.ActorComp) {
      e.ActorComp.ActorLocationProxy.Subtraction(e.ActorComp.LastActorLocation, e.ActorComp.SimulatedVelocity);
      e.ActorComp.SimulatedVelocity.MultiplyEqual(1 / t);
    }
  }
  static GetEntitySplineMoveInfo(t) {
    t = this.SplineMoveTaskMap.get(t);
    if (t?.NeedSync) {
      return {
        SplineId: t.CurveInfo.SplineId,
        State: t.StateInfo.DeepCopy()
      };
    }
  }
  static SyncEntityPathRatio(t, e, i) {
    var s = this.SplineMoveTaskMap.get(t);
    if (s) {
      if (s.CurveInfo.SplineId !== e) {
        if (s.CurveInfo.SplineId > 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Vehicle", 50, "处于非前置样条时收到其他样条的进度", ["PbDataId", s.ActorComp.CreatureData.GetPbDataId()], ["CreatureId", s.ActorComp.CreatureData.GetCreatureDataId()], ["CurSplineId", s.CurveInfo.SplineId], ["CurPathRatio", s.StateInfo.PathRatio], ["OtherSplineId", e], ["OtherPathRatio", i]);
          }
          return;
        } else {
          this.RemoveSplineMoveTask(s.VehicleEntity);
          this.SyncEntityPathRatio(t, e, i);
          return;
        }
      }
      var e = s.StateInfo.PathRatio;
      s.JumpToTargetPathRatio(i);
      s.GetUpdateTransform(this.TmpTrans);
      MathUtils_1.MathUtils.CommonTempVector.DeepCopy(this.TmpTrans.GetLocation());
      MathUtils_1.MathUtils.CommonTempVector.SubtractionEqual(s.ActorComp.ActorLocationProxy);
      var h = MathUtils_1.MathUtils.CommonTempVector.Size() / s.ActorComp.SimulatedVelocity.Size();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Vehicle", 50, "同步服务器样条进度", ["PbDataId", s.ActorComp.CreatureData.GetPbDataId()], ["CreatureId", s.ActorComp.CreatureData.GetCreatureDataId()], ["SplineId", s.CurveInfo.SplineId], ["CurPathRatio", e], ["OtherPathRatio", i], ["ModelBufferTime", h]);
      }
      s.AnimComp.SetLocationAndRotatorWithKeepingModelBuffer(this.TmpTrans.GetLocation().ToUeVector(), this.TmpTrans.GetRotation().Rotator().ToUeRotator(), h * MathUtils_1.MathUtils.SecondToMillisecond, "SyncEntityPathRatio");
    } else {
      e = t.GetComponent(247);
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Vehicle", 50, "样条移动同步失败,当前Entity无样条移动任务", ["PbDataId", e?.CreatureData.GetPbDataId()], ["CreatureId", e?.CreatureData.GetCreatureDataId()]);
      }
    }
  }
  static AddLoopTask(t) {
    var e = t.VehicleEntity?.GetComponent(249);
    if (t.CurveInfo?.IsCircle) {
      e?.MoveAlongPath({
        SplineId: t.CurveInfo.SplineId
      });
    }
  }
  static CreateMoveTaskFromSplineId(t, e) {
    var i = new PathCurveInfo();
    if (i.InitFromSplineId(e, undefined)) {
      (e = new VehiclePathMoveTask(t, i, new MoveStateInfo())).CalcOffsetBeforeMove();
      return e;
    }
  }
  static CreateMotorcycleMoveTaskFromSplineId(t, e) {
    var i = new PathCurveInfo();
    var s = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(e, t.Id, 1);
    if (i.InitFromSplineId(e, s)) {
      (e = new MotorcyclePathMoveTask(t, i, new MoveStateInfo())).CalcOffsetBeforeMove();
      return e;
    }
  }
  static MoveToTaskPositionAdjusted(t, e, i) {
    var s = t.GetComponent(1);
    var t = t.GetComponent(248);
    if (s && t) {
      i.Subtraction(e, this.TmpVector1);
      i = GravityUtils_1.GravityUtils.GetZnInGravityForActor(s, this.TmpVector1);
      if (Math.abs(i) < MOVE_TO_TASK_POSITION_ADJUSTED_DIST) {
        GravityUtils_1.GravityUtils.AddZnInGravityForActor(s, e, i);
      }
      t.SetLocationAndRotatorWithKeepingModelBuffer(s.ActorLocation, s.ActorRotation, MOVE_TO_TASK_POSITION_ADJUSTED_TIME, "CreateMoveToTask");
    }
  }
  static CreateMoveToTask(t, e, i) {
    var s = t.GetComponent(247);
    if (s && i) {
      var h;
      var o = Vector_1.Vector.Create();
      o.DeepCopy(s.ActorForwardProxy);
      var r = Vector_1.Vector.Create();
      r.DeepCopy(s.ActorLocationProxy);
      var s = Vector_1.Vector.Create();
      e.GetRotation().GetForwardVector(s);
      var a = Vector_1.Vector.Create();
      a.DeepCopy(e.GetLocation());
      this.MoveToTaskPositionAdjusted(t, r, a);
      if (!r.Equals(a)) {
        e = Vector_1.Vector.Dist(r, a);
        h = Vector_1.Vector.Create();
        o.Multiply(e, h);
        o = Vector_1.Vector.Create();
        s.Multiply(e, o);
        s = {
          Position: r,
          ArriveTangent: h,
          LeaveTangent: h,
          LineType: IComponent_1.ESplineLine.CurveCustomTangent,
          Rotation: undefined
        };
        r = {
          Position: a,
          ArriveTangent: o,
          LeaveTangent: o,
          LineType: IComponent_1.ESplineLine.CurveCustomTangent,
          Rotation: undefined
        };
        (h = new SplineCurve_1.SplineCurve()).InitPoints([s, r]);
        (a = new PathCurveInfo()).SplineCurve = h;
        a.SplineId = TEMPRORY_SPLINE_CURVE_ID;
        a.TotalTime = e / i;
        a.TotalLength = h.GetSplineLength();
        o = new MoveStateInfo();
        (s = new VehiclePathMoveTask(t, a, o)).CalcOffsetBeforeMove();
        return s;
      }
    }
  }
  static CreateMotorcycleMoveToTask(t, e, i) {
    var s = t.GetComponent(247);
    if (s && i) {
      var h;
      var o;
      var r = Vector_1.Vector.Create();
      r.DeepCopy(s.ActorForwardProxy);
      var a = Vector_1.Vector.Create();
      a.DeepCopy(s.ActorLocationProxy);
      var n = Vector_1.Vector.Create();
      e.GetRotation().GetForwardVector(n);
      var l = Vector_1.Vector.Create();
      l.DeepCopy(e.GetLocation());
      if (!a.Equals(l)) {
        h = Vector_1.Vector.Dist(a, l);
        o = Vector_1.Vector.Create();
        r.Multiply(h, o);
        r = Vector_1.Vector.Create();
        n.Multiply(h, r);
        n = {
          Position: a,
          ArriveTangent: o,
          LeaveTangent: o,
          LineType: IComponent_1.ESplineLine.CurveCustomTangent,
          Rotation: undefined
        };
        (a = new SplineCurve_1.InterpCurvePointQuat(5)).InVal = 0;
        a.OutVal.DeepCopy(s.ActorQuatProxy);
        a.LeaveTangent.DeepCopy(a.OutVal);
        a.ArriveTangent.DeepCopy(a.OutVal);
        o = {
          Position: l,
          ArriveTangent: r,
          LeaveTangent: r,
          LineType: IComponent_1.ESplineLine.CurveCustomTangent,
          Rotation: undefined
        };
        (s = new SplineCurve_1.InterpCurvePointQuat(5)).InVal = 1;
        s.OutVal.DeepCopy(e.GetRotation());
        s.LeaveTangent.DeepCopy(s.OutVal);
        s.ArriveTangent.DeepCopy(s.OutVal);
        (l = new SplineCurve_1.SplineCurve()).InitPoints([n, o], [a, s]);
        (r = new PathCurveInfo()).SplineCurve = l;
        r.SplineId = TEMPRORY_SPLINE_CURVE_ID;
        r.TotalTime = h / i;
        r.TotalLength = l.GetSplineLength();
        e = new MoveStateInfo();
        return new MotorcyclePathMoveTask(t, r, e);
      }
    }
  }
  static GetMovingSplineId(t) {
    t = this.SplineMoveTaskMap.get(t);
    if (t) {
      return Math.abs(t.CurveInfo.SplineId);
    } else {
      return 0;
    }
  }
}
(exports.VehiclePathMoveController = VehiclePathMoveController).SplineMoveTaskMap = new Map();
VehiclePathMoveController.PendingEndTaskSet = new Set();
VehiclePathMoveController.VehicleMoveDisableHandleMap = new Map();
VehiclePathMoveController.TmpVector1 = Vector_1.Vector.Create();
VehiclePathMoveController.TmpVector2 = Vector_1.Vector.Create();
VehiclePathMoveController.TmpTrans = Transform_1.Transform.Create(); //# sourceMappingURL=VehiclePathMoveController.js.map