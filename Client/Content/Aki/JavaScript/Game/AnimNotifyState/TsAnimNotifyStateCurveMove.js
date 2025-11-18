"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const SplineCurve_1 = require("../../Core/Utils/Curve/SplineCurve");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../Core/Utils/Math/Transform");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const Global_1 = require("../Global");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const SkillBehaviorCondition_1 = require("../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorCondition");
const SkillBehaviorMisc_1 = require("../NewWorld/Character/Common/Component/Skill/SkillBehavior/SkillBehaviorMisc");
const ColorUtils_1 = require("../Utils/ColorUtils");
const GravityUtils_1 = require("../Utils/GravityUtils");
const WorldGlobal_1 = require("../World/WorldGlobal");
const queryExtent = new UE.VectorDouble(1, 1, 500);
const angles = [0, 270, 90, 180];
const MIN_MOVE_DISTANCE = 50;
const MIN_MOVE_DISTANCE_SQUARED = MIN_MOVE_DISTANCE * MIN_MOVE_DISTANCE;
const MIN_UPDATE_SPLINE_LENGTH = 100;
const MIN_UPDATE_SPLINE_LENGTH_SQUARED = MIN_UPDATE_SPLINE_LENGTH * MIN_UPDATE_SPLINE_LENGTH;
const PROFILE_KEY = "TsAnimNotifyStateCurveMove";
const INVALID_LAST_LOCATION_THRESHOLD_SQUARED = 1000000;
const DEBUG_RADIUS = 30;
const DEBUG_DURATION = 5;
const DEBUG_SEGMENTS = 10;
class PositionBranchTargetParams {
  constructor() {
    this.CharActorComp = undefined;
    this.CharUnifiedComp = undefined;
    this.CharSkillComp = undefined;
    this.TargetActorComp = undefined;
    this.TargetCharActorComp = undefined;
    this.NowTime = -0;
    this.TotalTime = -0;
    this.SocketName = "";
    this.LastLocation = Vector_1.Vector.Create();
    this.InitLocation = Vector_1.Vector.Create();
    this.TargetOffset = Vector_1.Vector.Create();
    this.TargetPos = Vector_1.Vector.Create();
    this.LastTargetPos = Vector_1.Vector.Create();
    this.TargetVec = Vector_1.Vector.Create();
    this.AlongStraightLine = false;
    this.AllowMovement = false;
    this.CanSetActorTargetPos = false;
    this.FlyingMove = false;
  }
  RefreshTarget(i, s, e) {
    if (!this.TargetActorComp?.Entity?.Valid) {
      this.TargetActorComp = undefined;
      this.TargetCharActorComp = undefined;
    }
    this.LastLocation.DeepCopy(this.CharActorComp.LastActorLocation);
    switch (e) {
      case 0:
        this.TargetActorComp = this.CharActorComp;
        this.TargetCharActorComp = this.CharActorComp;
        this.SocketName = s;
        break;
      case 1:
        var o = this.CharSkillComp?.GetSkillTargetForAns();
        if (!o?.Valid) {
          return false;
        }
        if (this.TargetActorComp?.Entity?.Valid && o.Id === this.TargetActorComp.Entity.Id) {
          return true;
        }
        this.TargetActorComp = o.Entity.GetComponent(1);
        this.TargetCharActorComp = o.Entity.GetComponent(3);
        this.SocketName = this.CharSkillComp.SkillTargetSocket;
        break;
      case 2:
        let t = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(this.CharActorComp.Entity.Id, i);
        if (!t && !(t = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(this.CharActorComp.Entity.Id, i))) {
          return false;
        }
        o = EntitySystem_1.EntitySystem.Get(t);
        if (!o?.Valid) {
          return false;
        }
        if (this.TargetActorComp?.Entity?.Valid && this.TargetActorComp.Entity.Id === o.Id) {
          return true;
        }
        this.TargetActorComp = o.GetComponent(1);
        this.TargetCharActorComp = undefined;
        this.SocketName = s;
    }
    return true;
  }
  Clear() {
    this.CharActorComp = undefined;
    this.CharUnifiedComp = undefined;
    this.CharSkillComp = undefined;
    this.TargetActorComp = undefined;
    this.TargetCharActorComp = undefined;
    this.SocketName = "";
  }
}
class TsAnimNotifyStateCurveMove extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.DebugMode = false;
    this.技能条件 = undefined;
    this.技能条件公式 = undefined;
    this.无视障碍阻挡 = false;
    this.运动轨迹曲线 = undefined;
    this.持续更新目标位置 = false;
    this.位置基准目标 = 0;
    this.基于目标骨骼位置 = undefined;
    this.目标参数 = undefined;
    this.偏移方向基准 = 0;
    this.目标位置偏移 = undefined;
    this.位置修正 = false;
    this.位置修正配置 = undefined;
    this.运动位置曲线 = undefined;
    this.运动过程朝向 = 0;
    this.自动更新运动轨迹曲线关键点 = false;
    this.运动轨迹曲线关键点 = undefined;
    this.运动轨迹曲线插值ReparamTable = undefined;
    this.终点贴地检测 = false;
    this.终点贴地检测距离 = 1000;
    this.最大位移距离 = 3000;
    this.SkillBehaviorCondition = undefined;
    this.SkillBehaviorConditionFormula = "";
    this.IgnoreObstacle = false;
    this.SplineCurves = undefined;
    this.ContinuallyUpdateTargetPosition = false;
    this.PositionDatumTarget = 0;
    this.TargetSocketPosition = "None";
    this.TargetParam = "None";
    this.OffsetDirectionDatum = 0;
    this.TargetPositionOffset = undefined;
    this.MakePositionCorrection = false;
    this.PositionCorrectionConfig = undefined;
    this.MovementPositionCurve = undefined;
    this.MovementProcessDirection = 0;
    this.EndLocationDetection = false;
    this.EndLocationDetectionDist = 1000;
    this.MaxMoveDistance = 3000;
    this.TmpVector = undefined;
    this.TmpVector2 = undefined;
    this.TmpVector3 = undefined;
    this.TmpVector4 = undefined;
    this.TmpRotator = undefined;
    this.TmpQuat = undefined;
    this.TmpQuat2 = undefined;
    this.TmpTransform = undefined;
    this.InitCacheVar = false;
    this.ParamPool = undefined;
    this.ParamMap = undefined;
  }
  Constructor() {
    this.SkillBehaviorCondition = undefined;
    this.SkillBehaviorConditionFormula = "";
    this.IgnoreObstacle = false;
    this.SplineCurves = undefined;
    this.ContinuallyUpdateTargetPosition = false;
    this.PositionDatumTarget = 0;
    this.TargetSocketPosition = "None";
    this.TargetParam = "None";
    this.OffsetDirectionDatum = 0;
    this.TargetPositionOffset = undefined;
    this.MakePositionCorrection = false;
    this.PositionCorrectionConfig = undefined;
    this.MovementPositionCurve = undefined;
    this.MovementProcessDirection = 0;
    this.EndLocationDetection = false;
    this.EndLocationDetectionDist = 1000;
    this.MaxMoveDistance = 3000;
    this.TmpVector = undefined;
    this.TmpVector2 = undefined;
    this.TmpVector3 = undefined;
    this.TmpVector4 = undefined;
    this.TmpRotator = undefined;
    this.TmpQuat = undefined;
    this.TmpQuat2 = undefined;
    this.TmpTransform = undefined;
    this.InitCacheVar = false;
    this.ParamPool = undefined;
    this.ParamMap = undefined;
  }
  EditorUpdateSplineCurve() {
    var t;
    if (this.自动更新运动轨迹曲线关键点 && this.运动轨迹曲线) {
      t = this.运动轨迹曲线.AssetPathName.toString() + "_C";
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, t => {
        var i = UE.EditorOperations.GetDefaultObject(t).SplinePointsMap;
        if ((this.运动轨迹曲线关键点?.Num() ?? 0) > 0) {
          this.运动轨迹曲线关键点?.Empty();
        }
        for (let t = 0; t < i.Num(); t++) {
          this.运动轨迹曲线关键点.Add(i.Get(t));
        }
        if ((this.运动轨迹曲线插值ReparamTable?.Num() ?? 0) > 0) {
          this.运动轨迹曲线插值ReparamTable?.Empty();
        }
        this.SplineCurves ||= new SplineCurve_1.SplineCurve();
        this.SplineCurves.Init(this.运动轨迹曲线关键点);
        for (const e of this.SplineCurves.ReparamTable) {
          var s = new UE.InterpCurvePointFloat(e.InVal, e.OutVal, e.ArriveTangent, e.LeaveTangent, 0);
          this.运动轨迹曲线插值ReparamTable.Add(s);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "运动轨迹曲线关键点,曲线插值ReparamTable更新成功");
        }
      });
    }
  }
  Initialize() {
    this.SkillBehaviorCondition = this.技能条件;
    this.SkillBehaviorConditionFormula = this.技能条件公式?.toString() ?? "";
    this.IgnoreObstacle = this.无视障碍阻挡;
    this.ContinuallyUpdateTargetPosition = this.持续更新目标位置;
    this.PositionDatumTarget = this.位置基准目标;
    this.TargetSocketPosition = this.基于目标骨骼位置?.toString() ?? "None";
    this.TargetParam = this.目标参数?.toString() ?? "None";
    this.OffsetDirectionDatum = this.偏移方向基准;
    this.MakePositionCorrection = this.位置修正;
    this.PositionCorrectionConfig = this.位置修正配置;
    this.MovementPositionCurve = this.运动位置曲线;
    this.MovementProcessDirection = this.运动过程朝向;
    this.EndLocationDetection = this.终点贴地检测;
    this.EndLocationDetectionDist = this.终点贴地检测距离;
    this.MaxMoveDistance = this.最大位移距离;
    if (this.运动轨迹曲线关键点 && !this.SplineCurves) {
      this.SplineCurves = new SplineCurve_1.SplineCurve();
    }
    if (this.目标位置偏移) {
      if (this.TargetPositionOffset) {
        this.TargetPositionOffset.DeepCopy(this.目标位置偏移);
      } else {
        this.TargetPositionOffset = this.目标位置偏移 ? Vector_1.Vector.Create(this.目标位置偏移) : undefined;
      }
    }
  }
  InitCacheVariable() {
    if (!this.InitCacheVar) {
      this.InitCacheVar = true;
      this.TmpVector = Vector_1.Vector.Create();
      this.TmpVector2 = Vector_1.Vector.Create();
      this.TmpVector3 = Vector_1.Vector.Create();
      this.TmpVector4 = Vector_1.Vector.Create();
      this.TmpRotator = Rotator_1.Rotator.Create();
      this.TmpQuat = Quat_1.Quat.Create();
      this.TmpQuat2 = Quat_1.Quat.Create();
      this.TmpTransform = Transform_1.Transform.Create();
      this.ParamMap = new Map();
      this.ParamPool = [];
    }
  }
  InitCharacterParam(i, s) {
    var e = i.Entity.GetComponent(40);
    if (e) {
      let t = this.ParamMap.get(i.Entity.Id);
      (t = t || (this.ParamPool.length ? this.ParamPool.pop() : new PositionBranchTargetParams())).InitLocation.DeepCopy(i.ActorLocationProxy);
      t.CharActorComp = i;
      t.CharUnifiedComp = i.Entity.GetComponent(179);
      t.CharSkillComp = e;
      t.RefreshTarget(this.TargetParam, this.TargetSocketPosition, this.PositionDatumTarget);
      t.NowTime = 0;
      t.TotalTime = s;
      t.FlyingMove = t.CharActorComp.MoveComp.CharacterMovement?.MovementMode !== 1 && t.CharActorComp.MoveComp.CharacterMovement?.MovementMode !== 2;
      this.ParamMap.set(i.Entity.Id, t);
      if (!t.TargetActorComp) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Movement", 42, "TsAnimNotifyStateCurveMove.InitCharacterParam没有目标");
        }
      }
      return t;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Test", 42, "TsAnimNotifyStateCurveMove.InitCharacterParam没有技能组件", ["Actor", i.Actor.GetName()]);
    }
  }
  CheckUseCondition(t) {
    var i;
    var s;
    return (this.SkillBehaviorCondition?.Num() ?? 0) === 0 || (i = (t = t.CharacterActorComponent.Entity).GetComponent(40), s = t.GetComponent(40)?.CurrentSkill, i && s ? (t = {
      Entity: t,
      SkillComponent: i,
      Skill: s
    }, !!SkillBehaviorCondition_1.SkillBehaviorCondition.SatisfyGroup(this.SkillBehaviorCondition, this.SkillBehaviorConditionFormula, t) || (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Movement", 42, "TsAnimNotifyStateCurveMove.CheckUseCondition不满足使用条件"), false)) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Movement", 42, "TsAnimNotifyStateCurveMove.CheckUseCondition没有技能组件"), false));
  }
  K2_NotifyBegin(t, i, s) {
    if (!GlobalData_1.GlobalData.GameInstance) {
      this.EditorUpdateSplineCurve();
      return false;
    }
    this.InitCacheVariable();
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    var e = t.CharacterActorComponent;
    if (!e) {
      return false;
    }
    s = this.InitCharacterParam(e, s);
    if (!s) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Movement", 42, "TsAnimNotifyStateCurveMove初始化角色参数失败");
      }
      return false;
    }
    if (s.AllowMovement) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Movement", 42, "TsAnimNotifyStateCurveMove正在移动中");
      }
      return false;
    }
    this.Initialize();
    this.SplineCurves?.Init(this.运动轨迹曲线关键点, this.运动轨迹曲线插值ReparamTable);
    if (this.SkillBehaviorCondition && !this.CheckUseCondition(t)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Movement", 42, "TsAnimNotifyStateCurveMove不满足技能使用条件");
      }
      return false;
    }
    s.TargetOffset.DeepCopy(this.目标位置偏移);
    this.GetTargetPos(s, s.TargetPos);
    s.LastTargetPos.DeepCopy(s.TargetPos);
    var t = this.GetTowardVector(s, s.TargetVec);
    if (t < MIN_MOVE_DISTANCE || s.TargetVec.SizeSquared2D() < MIN_MOVE_DISTANCE_SQUARED) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Movement", 42, "TsAnimNotifyStateCurveMove距离异常，不移动", ["CurrentLocation", s.CharActorComp.ActorLocationProxy], ["TargetPos", s.TargetPos], ["dist", t], ["distSquared2D", s.TargetVec.SizeSquared2D()]);
      }
      return false;
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Movement", 42, "TsAnimNotifyStateCurveMove移动", ["CurrentLocation", s.CharActorComp.ActorLocationProxy], ["TargetPos", s.TargetPos], ["dist", t], ["distSquared2D", s.TargetVec.SizeSquared2D()]);
      }
      if (this.IgnoreObstacle && (t = e.Entity.GetComponent(182))) {
        t.SetStepHeight(s.CharActorComp.HalfHeight);
      }
      if (this.运动轨迹曲线关键点 && this.SplineCurves && this.InitSplineTransform(s)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "TsAnimNotifyStateCurveMove.曲线移动");
        }
        s.AlongStraightLine = false;
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "TsAnimNotifyStateCurveMove.直线移动");
        }
        s.AlongStraightLine = true;
      }
      return s.AllowMovement = true;
    }
  }
  K2_NotifyTick(t, i, s) {
    if (s < MathUtils_1.MathUtils.KindaSmallNumber) {
      return false;
    }
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    t = t.CharacterActorComponent;
    t = this.ParamMap.get(t.Entity.Id);
    if (!t || !t.AllowMovement) {
      return false;
    }
    if (t.CharSkillComp?.IsSkillMontageInvalid(i.GetName())) {
      return false;
    }
    t.CanSetActorTargetPos = false;
    if (!this.SplineCurves || t.AlongStraightLine) {
      return !!t.AlongStraightLine && (t.RefreshTarget(this.TargetParam, this.TargetSocketPosition, this.PositionDatumTarget), t.TargetActorComp ? (this.MoveToTarget(s, t), t.LastLocation.DeepCopy(t.CharActorComp.ActorLocationProxy)) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "TsAnimNotifyStateCurveMove.直线移动无目标"), t.NowTime += s, true);
    }
    t.RefreshTarget(this.TargetParam, this.TargetSocketPosition, this.PositionDatumTarget);
    if (t.TargetActorComp) {
      this.MoveToTargetAlongSpline(s, t);
      t.LastLocation.DeepCopy(t.CharActorComp.ActorLocationProxy);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 42, "TsAnimNotifyStateCurveMove.沿样条移动无目标");
    }
    t.NowTime += s;
    if (this.DebugMode) {
      var e = this.SplineCurves.GetSplinePointsNum();
      for (let t = 0; t < e; t++) {
        this.SplineCurves.GetWorldLocationAtSplinePoint(t, this.TmpVector);
        this.DebugDraw(this.TmpVector.ToUeVector(), ColorUtils_1.ColorUtils.LinearYellow);
      }
    }
    return true;
  }
  K2_NotifyEnd(t, i) {
    var s;
    var e;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (t = t.CharacterActorComponent, !!(s = this.ParamMap.get(t.Entity.Id))) && (this.IgnoreObstacle && (e = t.Entity.GetComponent(182)) && e.ResetStepHeight(), s.AllowMovement = false, this.IgnoreObstacle && (s.CanSetActorTargetPos && Vector_1.Vector.Dist(s.TargetPos, s.CharActorComp.ActorLocationProxy) > MIN_MOVE_DISTANCE && (s.CharActorComp.SetActorLocation(s.TargetPos.ToUeVector(), "TsAnimNotifyStateCurveMove.技能曲线移动穿越障碍物结束", false), Log_1.Log.CheckWarn()) && Log_1.Log.Warn("Movement", 42, "技能曲线移动穿越障碍物结束SetActorLocation到终点"), s.CanSetActorTargetPos = false), this.ParamMap.delete(t.Entity.Id), s.Clear(), this.ParamPool.push(s), true);
  }
  InitSplineTransform(t) {
    var i = this.SplineCurves?.GetSplineLength();
    if (!i) {
      return false;
    }
    var s = t.TargetVec.Size();
    var e = this.SplineCurves.GetSplinePointsNum();
    this.SplineCurves.GetWorldLocationAtSplinePoint(0, this.TmpVector3);
    this.SplineCurves.GetWorldLocationAtSplinePoint(e - 1, this.TmpVector2);
    this.TmpVector3.SubtractionEqual(this.TmpVector2);
    var e = this.TmpVector3.Size();
    if (i < MIN_UPDATE_SPLINE_LENGTH || s < MIN_UPDATE_SPLINE_LENGTH || e < 1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 42, "TsAnimNotifyStateCurveMove.样条总长度太短", ["splineLen", i], ["distance", s], ["splineLineLength", e]);
      }
      return false;
    }
    this.TmpVector.DeepCopy(Vector_1.Vector.ForwardVectorProxy);
    MathUtils_1.MathUtils.LookRotationForwardFirst(t.TargetVec, Vector_1.Vector.UpVectorProxy, this.TmpQuat);
    MathUtils_1.MathUtils.LookRotationForwardFirst(this.TmpVector3, Vector_1.Vector.UpVectorProxy, this.TmpQuat2);
    this.TmpQuat2.Inverse(this.TmpQuat2);
    this.TmpQuat.RotateVector(this.TmpVector, this.TmpVector);
    this.TmpQuat2.RotateVector(this.TmpVector, this.TmpVector);
    this.TmpVector.UnaryNegation(this.TmpVector);
    this.TmpVector.Z = -this.TmpVector.Z;
    this.TmpVector.ToOrientationQuat(this.TmpQuat2);
    var o = s / e;
    this.TmpVector2.DeepCopy(this.SplineCurves.SplineTransform.GetScale3D());
    if (o > MathUtils_1.MathUtils.KindaSmallNumber) {
      this.TmpVector2.MultiplyEqual(o);
    }
    if (this.DebugMode) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Movement", 42, "InitSplineTransform", ["InitLocation", t.InitLocation], ["this.TmpQuat2", this.TmpQuat2], ["this.TmpVector", this.TmpVector], ["scale", o]);
      }
      this.DebugDraw(t.TargetPos.ToUeVector(), ColorUtils_1.ColorUtils.LinearBlack, 40);
    }
    this.TmpTransform.Set(t.InitLocation, this.TmpQuat2, this.TmpVector2);
    this.SplineCurves.SetSplineTransform(this.TmpTransform, false);
    this.SplineCurves.GetWorldLocationAtSplinePoint(0, this.TmpVector);
    var o = Vector_1.Vector.DistSquared(this.TmpVector, t.InitLocation);
    var h = Vector_1.Vector.DistSquared(this.TmpVector, t.CharActorComp.ActorLocationProxy);
    if (o > MIN_UPDATE_SPLINE_LENGTH_SQUARED || h > MIN_UPDATE_SPLINE_LENGTH_SQUARED) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 42, "初始点位置和样条第一个点位置距离太远了。", ["样条点和初始点距离Squared", o], ["样条点和当前坐标距离Squared", h], ["startLocation", this.TmpVector], ["ActorLocation", t.CharActorComp?.ActorLocationProxy]);
      }
      return false;
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Movement", 42, "样条移动", ["Location", t.CharActorComp.ActorLocationProxy], ["TargetPos", t.TargetPos], ["splineLen", i], ["distance", s], ["splineLineLength", e]);
      }
      return true;
    }
  }
  GetTargetPos(t, i) {
    if (t.RefreshTarget(this.TargetParam, this.TargetSocketPosition, this.PositionDatumTarget)) {
      if (t.SocketName && t.TargetCharActorComp?.Actor) {
        i.FromUeVector(t.TargetCharActorComp.Actor.Mesh.D_GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName(t.SocketName)));
      } else {
        i.DeepCopy(t.TargetActorComp.ActorLocationProxy);
      }
      if (this.TargetPositionOffset) {
        if (this.DebugMode) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Movement", 42, "目标位置偏移前目标点坐标 ", ["TargetPos", i]);
          }
          this.DebugDraw(i.ToUeVector(), new UE.LinearColor(1, 0.5, 0, 0));
        }
        t.TargetOffset.DeepCopy(this.TargetPositionOffset);
        this.TmpVector.Reset();
        switch (this.OffsetDirectionDatum) {
          case 0:
            if (t.CharActorComp) {
              t.CharActorComp.ActorForwardProxy.Rotation(this.TmpRotator);
              this.TmpRotator.Quaternion(this.TmpQuat);
              this.TmpQuat.RotateVector(t.TargetOffset, t.TargetOffset);
            }
            break;
          case 2:
            if (t.TargetActorComp && t.CharActorComp) {
              this.TmpVector.DeepCopy(t.TargetActorComp.ActorLocationProxy);
              this.TmpVector.SubtractionEqual(t.CharActorComp.ActorLocationProxy);
              this.TmpVector.Normalize();
              this.TmpVector.Rotation(this.TmpRotator);
              this.TmpRotator.Quaternion(this.TmpQuat);
              this.TmpQuat.RotateVector(t.TargetOffset, t.TargetOffset);
            }
            break;
          case 1:
            if (t.TargetActorComp) {
              t.TargetActorComp.ActorForwardProxy.Rotation(this.TmpRotator);
              this.TmpRotator.Quaternion(this.TmpQuat);
              this.TmpQuat.RotateVector(t.TargetOffset, t.TargetOffset);
            }
        }
        i.AdditionEqual(t.TargetOffset);
        if (this.EndLocationDetection && t.CharActorComp) {
          this.DetectFloor(t.CharActorComp, i);
        }
      }
    } else {
      i.DeepCopy(t.CharActorComp.ActorLocationProxy);
    }
  }
  DetectFloor(t, i) {
    var s = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    s.WorldContextObject = t.Actor;
    s.Radius = t.ScaledRadius;
    if (this.DebugMode) {
      s.SetDrawDebugTrace(2);
    }
    s.ActorsToIgnore.Empty();
    s.ActorsToIgnore.Add(t.Actor);
    for (const e of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet) {
      s.ActorsToIgnore.Add(e);
    }
    this.TmpVector.DeepCopy(i);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, this.TmpVector);
    this.TmpVector.DeepCopy(i);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, this.TmpVector, -this.EndLocationDetectionDist);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, this.TmpVector);
    if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(t.Actor.CapsuleComponent, s, PROFILE_KEY, PROFILE_KEY)) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(s.HitResult, 0, i);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, i, t.ScaledHalfHeight);
      if (this.DebugMode) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "终点检测地面 ", ["TargetPos", i]);
        }
        this.DebugDraw(i.ToUeVector(), ColorUtils_1.ColorUtils.LinearCyan);
        s.SetDrawDebugTrace(0);
      }
      return true;
    } else {
      if (this.DebugMode) {
        s.SetDrawDebugTrace(0);
      }
      return false;
    }
  }
  PositionCorrection(e, o, h) {
    if (this.MakePositionCorrection && this.PositionCorrectionConfig && this.PositionCorrectionConfig.ActionType === 0) {
      var r = e.CharActorComp;
      let i = o.ToUeVector();
      let t = r.ActorForward;
      var a;
      var n = this.TmpVector2;
      n.DeepCopy(i);
      if (this.PositionCorrectionConfig.LocationOffset && !this.PositionCorrectionConfig.LocationOffset.IsNearlyZero(MathUtils_1.MathUtils.KindaSmallNumber)) {
        switch (this.PositionCorrectionConfig.LocationType) {
          case 0:
            break;
          case 1:
            if (e.CharSkillComp && e.CharSkillComp.SkillTarget) {
              [i, t] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(e.CharSkillComp.SkillTarget.Entity.GetComponent(1).Owner);
              i = e.CharSkillComp.GetTargetTransform().GetLocation();
            }
            break;
          case 2:
            var _ = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(32).GetCurrentTarget();
            if (_) {
              [i, t] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(_.Entity.GetComponent(1).Owner);
            }
            break;
          case 3:
            [i, t] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(Global_1.Global.BaseCharacter);
            break;
          case 4:
            if (e.CharActorComp) {
              _ = ModelManager_1.ModelManager.CreatureModel.GetEntity(e.CharActorComp.Entity.GetComponent(0).GetSummonerId())?.Entity?.GetComponent(1);
              [i, t] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(_.Owner);
            }
            break;
          case 5:
            [i, t] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(ModelManager_1.ModelManager.CameraModel.FightCamera.GetComponent(4).CameraActor);
            break;
          case 6:
            if (e.CharActorComp) {
              _ = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(e.CharActorComp.Entity.Id, this.TargetParam);
              i = WorldGlobal_1.WorldGlobal.ToUeVector(_);
            }
            break;
          case 7:
            if (e.CharActorComp && (_ = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(e.CharActorComp.Entity.Id, this.TargetParam), (_ = EntitySystem_1.EntitySystem.Get(_))?.Valid)) {
              [i, t] = (0, SkillBehaviorMisc_1.getLocationAndDirection)(_.GetComponent(173).Owner);
            }
        }
        switch (this.PositionCorrectionConfig.LocationForwardType) {
          case 0:
            break;
          case 1:
            t = r.Actor.D_GetActorForwardVector();
            break;
          case 2:
            var v = r.ActorLocation.op_Subtraction(i);
            t.Set(v.X, v.Y, 0);
            break;
          case 3:
            v = i.op_Subtraction(Global_1.Global.CharacterCameraManager.D_GetCameraLocation());
            t.Set(v.X, v.Y, 0);
        }
        n.DeepCopy(i);
        var l = new UE.TransformDouble(t.Rotation(), i, Vector_1.Vector.OneVectorDouble);
        var c = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.PositionCorrectionConfig.LocationOffset);
        i = l.TransformPositionNoScale(c);
        if (this.DebugMode && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "位置基准偏移", ["startLocation", n], ["targetLocation", i], ["direction", t], ["LocationOffset", this.PositionCorrectionConfig.LocationOffset]);
        }
      }
      if (this.PositionCorrectionConfig.Restrict) {
        let t = r.ActorLocation;
        switch (this.PositionCorrectionConfig.RestrictType) {
          case 0:
            t = Global_1.Global.BaseCharacter.D_K2_GetActorLocation();
            break;
          case 1:
            break;
          case 2:
            if (r.Entity.GetComponent(0).IsMonster()) {
              a = r.GetInitLocation();
              t.Set(a.X, a.Y, a.Z);
            }
        }
        l = i.op_Subtraction(t).Size();
        if (l > this.PositionCorrectionConfig.RestrictDistance && (c = this.PositionCorrectionConfig.RestrictDistance / l, MathUtils_1.MathUtils.LerpVector(t, i, c, i), this.DebugMode) && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "限制距离", ["center", t], ["distance", l], ["targetLocation", i], ["rate", c]);
        }
      }
      let s = this.TmpVector3;
      s.DeepCopy(i);
      if (this.PositionCorrectionConfig.BestSpot) {
        switch (this.PositionCorrectionConfig.Strategy) {
          case 0:
            var M = (0, SkillBehaviorMisc_1.traceWall)(r, n, s, this.PositionCorrectionConfig.DebugTrace);
            if (!M) {
              return;
            }
            s = M[1];
            break;
          case 1:
            {
              let t = false;
              this.TmpVector4.Reset();
              var L = this.TmpVector;
              var T = this.TmpVector4;
              s.Subtraction(n, L);
              for (const m of angles) {
                L.RotateAngleAxis(m, Vector_1.Vector.UpVectorProxy, T);
                n.Addition(T, s);
                var u = (0, SkillBehaviorMisc_1.traceWall)(r, n, s, this.PositionCorrectionConfig.DebugTrace);
                if (!u) {
                  return;
                }
                if (!u[0]) {
                  t = true;
                  s = u[1];
                  break;
                }
              }
              if (t) {
                break;
              }
              return;
            }
        }
        l = (0, SkillBehaviorMisc_1.traceGroundWithGravity)(r, s, this.PositionCorrectionConfig.DebugTrace);
        if (!l[0]) {
          return;
        }
        s = l[1];
        e.CanSetActorTargetPos = true;
        if (this.DebugMode && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "最佳落脚点", ["targetLocation", i]);
        }
      }
      i = s.ToUeVector();
      if (this.PositionCorrectionConfig.Navigation > 0 && !UE.NavigationSystemV1.D_K2_ProjectPointToNavigation(GlobalData_1.GlobalData.World, i, undefined, undefined, undefined, queryExtent)) {
        c = (0, puerts_1.$ref)(undefined);
        if (UE.NavigationSystemV1.D_K2_GetRandomLocationInNavigableRadius(GlobalData_1.GlobalData.World, i, c, this.PositionCorrectionConfig.Navigation)) {
          h.DeepCopy((0, puerts_1.$unref)(c));
        }
        e.CanSetActorTargetPos = true;
      } else {
        this.TmpVector.DeepCopy(i);
        this.TmpVector.SubtractionEqual(n);
        o.Addition(this.TmpVector, h);
        if (this.DebugMode && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "加偏移量到最终坐标上", ["targetLocation", i], ["startLocationVec2", n], ["this.TmpVector", this.TmpVector], ["targetPos", o], ["outPos", h]);
        }
      }
    }
  }
  GetTowardVector(t, i) {
    if (this.MakePositionCorrection && this.PositionCorrectionConfig) {
      if (this.DebugMode) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Movement", 42, "修正前目标点坐标 ", ["TargetPos", t.TargetPos], ["CurrentDistance", Vector_1.Vector.Dist(t.CharActorComp.ActorLocationProxy, t.TargetPos)]);
        }
        this.DebugDraw(t.TargetPos.ToUeVector(), new UE.LinearColor(1, 0.5, 1, 0), 35);
      }
      this.PositionCorrection(t, t.LastTargetPos, t.TargetPos);
    }
    if (t.CharUnifiedComp?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && Vector_1.Vector.DistSquared2D(t.TargetPos, t.CharActorComp.ActorLocationProxy) < 1) {
      return -1;
    }
    if (this.DebugMode) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Movement", 42, "位置修正后目标点坐标", ["TargetPos", t.TargetPos], ["CurrentDistance", Vector_1.Vector.Dist(t.CharActorComp.ActorLocationProxy, t.TargetPos)]);
      }
      this.DebugDraw(t.TargetPos.ToUeVector(), ColorUtils_1.ColorUtils.LinearRed, 40);
    }
    t.TargetPos.Subtraction(t.CharActorComp.ActorLocationProxy, this.TmpVector);
    t.TargetPos.Subtraction(t.LastLocation, this.TmpVector2);
    var s = this.TmpVector.DotProduct(this.TmpVector2);
    var e = this.TmpVector.Size();
    if (e > this.MaxMoveDistance) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Movement", 42, "目标点距离太远了，不动", ["dist", e], ["current", t.CharActorComp.ActorLocationProxy], ["TargetPos", t.TargetPos]);
      }
      return -1;
    } else {
      i.DeepCopy(this.TmpVector);
      if (s < 0) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Movement", 42, "和上一次移动相比在后退");
        }
        return -1;
      } else {
        return e;
      }
    }
  }
  GetRate(t, i) {
    let s = 1;
    t = i.NowTime + t;
    if ((s = i.TotalTime <= t ? 1 : this.MovementPositionCurve ? this.MovementPositionCurve.GetFloatValue(i.NowTime / i.TotalTime) : MathUtils_1.MathUtils.GetCubicValue(i.NowTime / i.TotalTime)) > 1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 42, "rate > 1", ["params.NowTime", i.NowTime], ["params.TotalTime", i.TotalTime]);
      }
      return 1;
    } else {
      return s;
    }
  }
  MoveToTarget(t, i) {
    i.TargetPos.DeepCopy(i.LastTargetPos);
    if (this.ContinuallyUpdateTargetPosition) {
      i.LastTargetPos.DeepCopy(i.TargetPos);
      this.GetTargetPos(i, i.TargetPos);
    }
    var s = this.GetTowardVector(i, i.TargetVec);
    var e = this.GetRate(t, i);
    if (!(e <= 0) && !(s < 0) && !(Vector_1.Vector.Lerp(i.InitLocation, i.TargetPos, e, this.TmpVector3), this.TmpVector3.SubtractionEqual(i.CharActorComp.ActorLocationProxy), i.CharUnifiedComp?.PositionState === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && this.TmpVector3.SizeSquared2D() < 1) && !(i.LastLocation.Subtraction(i.CharActorComp.ActorLocationProxy, this.TmpVector), this.TmpVector.SizeSquared() > INVALID_LAST_LOCATION_THRESHOLD_SQUARED && (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Movement", 42, "LastLocation太远，很危险，无视掉", ["Actor", i.CharActorComp?.Actor.GetName()], ["Last", i.LastLocation], ["ActorLast", i.CharActorComp?.LastActorLocation], ["Now", i.CharActorComp?.ActorLocationProxy], ["this.TargetVec", i.TargetVec], ["this.TmpVector", this.TmpVector], ["this.TmpVector3", this.TmpVector3]), this.TmpVector3.Reset()), this.DebugMode && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "TsAnimNotifyStateCurveMove.MoveToTarget", ["rate", e], ["MoveVec", this.TmpVector3], ["ActorLocation", i.CharActorComp.ActorLocationProxy], ["LastTargetPos", i.LastTargetPos], ["TargetVec", i.TargetVec]), this.TmpVector2.DeepCopy(i.CharActorComp.ActorLocationProxy), this.TmpVector2.AdditionEqual(this.TmpVector3), this.DebugDraw(this.TmpVector2.ToUeVector(), ColorUtils_1.ColorUtils.LinearWhite)), this.TmpVector.DeepCopy(this.TmpVector3), i.FlyingMove ? (i.CharActorComp.AddActorWorldOffset(this.TmpVector.ToUeVector(), "TsAnimNotifyStateCurveMove直线移动.AddActorWorldOffset", true), i.CharActorComp.ResetAllCachedTime()) : i.CharActorComp.MoveComp.MoveCharacter(this.TmpVector, t, "TsAnimNotifyStateCurveMove直线移动"), e === 1)) {
      switch (this.MovementProcessDirection) {
        case 2:
          i.TargetPos.Subtraction(i.CharActorComp.ActorLocationProxy, this.TmpVector);
          MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector, Vector_1.Vector.UpVectorProxy, this.TmpQuat);
          this.TmpQuat.Rotator(this.TmpRotator);
          i.CharActorComp.SetActorRotation(this.TmpRotator.ToUeRotator(), "TsAnimNotifyStateCurveMove.TowardsTarget", false);
          break;
        case 1:
          i.TargetPos.Subtraction(i.InitLocation, this.TmpVector);
          MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector, Vector_1.Vector.UpVectorProxy, this.TmpQuat);
          this.TmpQuat.Rotator(this.TmpRotator);
          i.CharActorComp.SetActorRotation(this.TmpRotator.ToUeRotator(), "TsAnimNotifyStateCurveMove.AlongTrack", false);
      }
    }
  }
  MoveToTargetAlongSpline(t, i) {
    i.TargetPos.DeepCopy(i.LastTargetPos);
    if (this.ContinuallyUpdateTargetPosition) {
      i.LastTargetPos.DeepCopy(i.TargetPos);
      this.GetTargetPos(i, i.TargetPos);
    }
    var s = this.GetTowardVector(i, i.TargetVec);
    var e = this.GetRate(t, i);
    if (!(e <= 0) && !(s < 0)) {
      if (this.ContinuallyUpdateTargetPosition && (Math.abs(e - 1) > MathUtils_1.MathUtils.KindaSmallNumber || e > 0) && (o = this.SplineCurves.GetSplinePointsNum(), this.SplineCurves.GetWorldLocationAtSplinePoint(o - 1, this.TmpVector), (h = Vector_1.Vector.DistSquared(this.TmpVector, i.TargetPos)) > 100) && h < INVALID_LAST_LOCATION_THRESHOLD_SQUARED && (this.SplineCurves.SetLocationAtSplinePoint(o - 1, i.TargetPos, 1, true), this.DebugMode) && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Movement", 42, "SetLocationAtSplinePoint ", ["changeDist", h], ["TargetPos", i.TargetPos], ["SplinePoint", this.TmpVector]);
      }
      var o = this.SplineCurves.GetSplineLength();
      this.SplineCurves.GetTransformAtDistanceAlongSpline(o * e, 1, this.TmpTransform);
      var h = this.TmpTransform.GetLocation();
      this.TmpVector.DeepCopy(h);
      this.TmpVector.SubtractionEqual(i.CharActorComp.ActorLocationProxy);
      if ((i.CharUnifiedComp?.PositionState !== CharacterUnifiedStateTypes_1.ECharPositionState.Ground || !(this.TmpVector.SizeSquared2D() < 1)) && (this.DebugMode && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Movement", 42, "TsAnimNotifyStateCurveMove.MoveToTargetAlongSpline", ["MoveVec", this.TmpVector], ["MoveVecSize", this.TmpVector?.Size()], ["dist", s], ["rate", e], ["SplineLength", o], ["this.TargetVec", i.TargetVec], ["this.TargetPos", i.TargetPos]), this.DebugDraw(h.ToUeVector(), ColorUtils_1.ColorUtils.LinearWhite)), i.LastLocation.Subtraction(i.CharActorComp.ActorLocationProxy, this.TmpVector2), this.TmpVector2.SizeSquared() > INVALID_LAST_LOCATION_THRESHOLD_SQUARED && (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Movement", 42, "LastLocation太远，很危险，无视掉", ["Actor", i.CharActorComp?.Actor.GetName()], ["Last", i.LastLocation], ["ActorLast", i.CharActorComp?.LastActorLocation], ["Now", i.CharActorComp?.ActorLocationProxy], ["this.TargetVec", i.TargetVec], ["this.TmpVector", this.TmpVector]), this.TmpVector.Reset()), i.FlyingMove ? (i.CharActorComp.AddActorWorldOffset(this.TmpVector.ToUeVector(), "TsAnimNotifyStateCurveMove沿样条移动.AddActorWorldOffset", true), i.CharActorComp.ResetAllCachedTime()) : i.CharActorComp.MoveComp.MoveCharacter(this.TmpVector, t, "TsAnimNotifyStateCurveMove沿样条移动"), e !== 1)) {
        switch (this.MovementProcessDirection) {
          case 2:
            i.TargetPos.Subtraction(i.CharActorComp.ActorLocationProxy, this.TmpVector);
            MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector, i.CharActorComp.ActorUpProxy, this.TmpQuat);
            this.TmpQuat.Rotator(this.TmpRotator);
            i.CharActorComp.SetActorRotation(this.TmpRotator.ToUeRotator(), "TsAnimNotifyStateCurveMove.TowardsTarget", false);
            break;
          case 1:
            this.TmpQuat.FromUeQuat(this.TmpTransform.GetRotation());
            this.TmpRotator.DeepCopy(this.TmpQuat.Rotator());
            i.CharActorComp.SetActorRotation(this.TmpRotator.ToUeRotator(), "TsAnimNotifyStateCurveMove.AlongTrack", false);
        }
      }
    }
  }
  DebugDraw(t, i, s = DEBUG_RADIUS, e = DEBUG_DURATION) {
    UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, t, s, DEBUG_SEGMENTS, i, e);
  }
  GetNotifyName() {
    return "曲线定点位移";
  }
}
exports.default = TsAnimNotifyStateCurveMove;
//# sourceMappingURL=TsAnimNotifyStateCurveMove.js.map