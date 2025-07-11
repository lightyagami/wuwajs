"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameSplineComponent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const AiPatrolController_1 = require("../../AI/Controller/AiPatrolController");
const ModelManager_1 = require("../../Manager/ModelManager");
const SAMPLE_ANGLE_LIMIT = 15;
const SAMPLE_STEP_DIST = 200;
class GameSplineComponent {
  constructor(t) {
    this.SplineId = 0;
    this.SplineEntityData = undefined;
    this.SplineComponentData = undefined;
    this.PathPoint = Array();
    this.IsInitSubPoint = false;
    this.MainPointIndexArray = undefined;
    this.Hye = undefined;
    this.jye = Vector_1.Vector.Create();
    this.RTe = Vector_1.Vector.Create();
    this.Wye = Vector_1.Vector.Create();
    this.Kye = Rotator_1.Rotator.Create();
    this.Qye = Vector_1.Vector.Create();
    this.Xye = Vector_1.Vector.Create();
    this.$ye = Vector_1.Vector.Create();
    this.Yye = new Map();
    this.SplineId = t;
  }
  Initialize() {
    this.SplineEntityData = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.SplineId);
    if (!this.SplineEntityData) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 42, "[GameSplineComponent.Initialize] 无法找到SplineEntityData", ["SplineEntityId", this.SplineId]);
      }
      return false;
    }
    var t = this.SplineEntityData.Transform.Pos;
    this.Wye.Set(t.X ?? 0, t.Y ?? 0, t.Z ?? 0);
    var t = this.SplineEntityData.Transform.Rot;
    this.Kye.Set(t?.Y ?? 0, t?.Z ?? 0, t?.X ?? 0);
    this.Kye.Quaternion().RotateVector(Vector_1.Vector.ForwardVectorProxy, this.Qye);
    this.Qye.Normalize();
    Vector_1.Vector.UpVectorProxy.CrossProduct(this.Qye, this.$ye);
    this.$ye.Normalize();
    this.Qye.CrossProduct(this.$ye, this.Xye);
    this.Xye.Normalize();
    this.SplineComponentData = (0, IComponent_1.getComponent)(this.SplineEntityData.ComponentsData, "SplineComponent");
    if (!this.SplineComponentData) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 42, "[GameSplineComponent.Initialize] 无法找到样条组件配置", ["SplineEntityId", this.SplineId]);
      }
      return false;
    }
    this.Hye = this.SplineComponentData.Option;
    if (this.Option.Type === IComponent_1.ESplineType.Patrol || this.Option.Type === IComponent_1.ESplineType.LevelAI) {
      for (let t = 0; t < this.Option.Points.length; t++) {
        var i = new AiPatrolController_1.PatrolPoint();
        i.IsMain = true;
        i.Point = Vector_1.Vector.Create(this.GetWorldLocationAtSplinePoint(t));
        var e = this.Option.Points[t];
        i.MoveState = e.MoveState;
        i.MoveSpeed = e.MoveSpeed;
        i.CharPositionState = e.CharPositionState;
        var s = e;
        if (s) {
          i.IsIgnorePoint = s.IgnorePoint ?? false;
          i.StayTime = s.StayTime ?? 0;
          i.IsHide = s.IsHide ?? false;
        }
        var s = e.Actions;
        if (s) {
          i.Actions = s;
        }
        this.PathPoint.push(i);
      }
    }
    return true;
  }
  InitializeByEntityData(t) {
    this.SplineEntityData = t;
    t = this.SplineEntityData.Transform.Pos;
    this.Wye.Set(t.X ?? 0, t.Y ?? 0, t.Z ?? 0);
    t = this.SplineEntityData.Transform.Rot;
    this.Kye.Set(t?.Y ?? 0, t?.Z ?? 0, t?.X ?? 0);
    this.Kye.Quaternion().RotateVector(Vector_1.Vector.ForwardVectorProxy, this.Qye);
    this.Qye.Normalize();
    Vector_1.Vector.UpVectorProxy.CrossProduct(this.Qye, this.$ye);
    this.$ye.Normalize();
    this.Qye.CrossProduct(this.$ye, this.Xye);
    this.Xye.Normalize();
    this.SplineComponentData = (0, IComponent_1.getComponent)(this.SplineEntityData.ComponentsData, "SplineComponent");
    if (!this.SplineComponentData) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 42, "[GameSplineComponent.Initialize] 无法找到样条组件配置", ["SplineEntityId", this.SplineId]);
      }
      return false;
    }
    this.Hye = this.SplineComponentData.Option;
    if (this.Option.Type === IComponent_1.ESplineType.Patrol || this.Option.Type === IComponent_1.ESplineType.LevelAI) {
      for (let t = 0; t < this.Option.Points.length; t++) {
        var i = new AiPatrolController_1.PatrolPoint();
        i.IsMain = true;
        i.Point = Vector_1.Vector.Create(this.GetWorldLocationAtSplinePoint(t));
        var e = this.Option.Points[t];
        i.MoveState = e.MoveState;
        i.MoveSpeed = e.MoveSpeed;
        i.CharPositionState = e.CharPositionState;
        var s = e;
        if (s) {
          i.IsIgnorePoint = s.IgnorePoint ?? false;
          i.StayTime = s.StayTime ?? 0;
          i.IsHide = s.IsHide ?? false;
        }
        var s = e.Actions;
        if (s) {
          i.Actions = s;
        }
        this.PathPoint.push(i);
      }
    }
    return true;
  }
  get Option() {
    return this.Hye;
  }
  GetNumberOfSplinePoints() {
    return this.Hye?.Points.length ?? 0;
  }
  GetWorldLocationAtSplinePoint(t) {
    var i;
    var e;
    if (this.Yye.has(t)) {
      return this.Yye.get(t);
    } else {
      i = Vector_1.Vector.Create();
      if (this.Hye && this.Hye.Points.length > 0 && t < this.Hye.Points.length) {
        e = this.Hye.Points[t].Position;
        i.AdditionEqual(this.Wye);
        this.jye.DeepCopy(this.Qye);
        this.jye.MultiplyEqual(e.X ?? 0);
        i.AdditionEqual(this.jye);
        this.jye.DeepCopy(this.$ye);
        this.jye.MultiplyEqual(e.Y ?? 0);
        i.AdditionEqual(this.jye);
        this.jye.DeepCopy(this.Xye);
        this.jye.MultiplyEqual(e.Z ?? 0);
        i.AdditionEqual(this.jye);
        this.Yye.set(t, i);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 42, "[GameSplineComponent.GetWorldLocationAtSplinePoint] Index越界", ["Points.length", this.Hye.Points.length], ["index", t]);
      }
      return i;
    }
  }
  InitializeWithSubPoints(t) {
    this.SplineEntityData = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.SplineId);
    if (!this.SplineEntityData) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 42, "[GameSplineComponent.Initialize] 无法找到SplineEntityData", ["SplineEntityId", this.SplineId]);
      }
      return false;
    }
    this.SplineComponentData = (0, IComponent_1.getComponent)(this.SplineEntityData.ComponentsData, "SplineComponent");
    if (!this.SplineComponentData) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 42, "[GameSplineComponent.Initialize] 无法找到样条组件配置", ["SplineEntityId", this.SplineId]);
      }
      return false;
    }
    this.Hye = this.SplineComponentData.Option;
    var s = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(this.SplineId, t);
    var i = ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(this.SplineId);
    if (!ObjectUtils_1.ObjectUtils.IsValid(s) || !ObjectUtils_1.ObjectUtils.IsValid(i)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 31, "[NpcPasserbyComponent] Spline获取失败", ["SplineEntityId", this.SplineId]);
      }
      return false;
    }
    var o = i;
    var i = s.GetNumberOfSplinePoints();
    var r = this.PathPoint;
    r.length = 0;
    r.splice(0, r.length);
    this.MainPointIndexArray = new Array();
    for (let t = 0, e = i; t < e; t++) {
      var n = s.D_GetLocationAtSplinePoint(t, 1);
      var h = new AiPatrolController_1.PatrolPoint();
      h.IsMain = true;
      h.Point = Vector_1.Vector.Create(n);
      var n = o.SplineData;
      h.MoveState = n.Points[t].MoveState;
      h.MoveSpeed = n.Points[t].MoveSpeed;
      h.CharPositionState = n.Points[t].CharPositionState;
      h.IsIgnorePoint = n.Points[t].IgnorePoint ?? false;
      h.StayTime = n.Points[t].StayTime ?? 0;
      h.IsHide = n.Points[t].IsHide ?? false;
      var n = n.Points[t].Actions;
      if (n) {
        h.Actions = n;
      }
      this.MainPointIndexArray.push(r.length);
      r.push(h);
      let i = s.GetDirectionAtSplinePoint(t, 1);
      if (t < e - 1) {
        var n = s.GetDistanceAlongSplineAtSplinePoint(t);
        var l = s.GetDistanceAlongSplineAtSplinePoint(t + 1);
        for (let t = n + SAMPLE_STEP_DIST; t < l - SAMPLE_STEP_DIST; t += SAMPLE_STEP_DIST) {
          var a;
          var _ = s.GetDirectionAtDistanceAlongSpline(t, 1);
          if (!(MathUtils_1.MathUtils.GetAngleByVectorDot(i, _) < SAMPLE_ANGLE_LIMIT)) {
            i = _;
            _ = s.D_GetLocationAtDistanceAlongSpline(t, 1);
            (a = new AiPatrolController_1.PatrolPoint()).IsMain = false;
            a.Point = Vector_1.Vector.Create(_);
            r.push(a);
          }
        }
      }
    }
    this.IsInitSubPoint = true;
    ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(this.SplineId, t);
    return true;
  }
  InitializeWithSplineCurve(e, s, o = true) {
    this.SplineComponentData = s;
    if (!this.SplineComponentData) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 42, "[GameSplineComponent.Initialize] 无法找到样条组件配置", ["SplineEntityId", this.SplineId]);
      }
      return false;
    }
    this.Hye = this.SplineComponentData.Option;
    var s = e.GetSplinePointsNum();
    var r = this.PathPoint;
    r.length = 0;
    r.splice(0, r.length);
    this.MainPointIndexArray = new Array();
    for (let t = 0, i = s; t < i; t++) {
      var n = Vector_1.Vector.Create();
      e.GetWorldLocationAtSplinePoint(t, n);
      var h = new AiPatrolController_1.PatrolPoint();
      h.IsMain = true;
      h.Point = Vector_1.Vector.Create(n);
      var n = this.SplineComponentData.Option;
      h.MoveState = n.Points[t].MoveState;
      h.MoveSpeed = n.Points[t].MoveSpeed;
      h.IsIgnorePoint = n.Points[t].IgnorePoint ?? false;
      h.StayTime = n.Points[t].StayTime ?? 0;
      h.IsHide = n.Points[t].IsHide ?? false;
      var n = n.Points[t].Actions;
      if (n) {
        h.Actions = n;
      }
      this.MainPointIndexArray.push(r.length);
      r.push(h);
      if (o) {
        e.GetDirectionAtSplinePoint(t, 1, this.jye);
        var l = this.jye;
        if (t < i - 1) {
          var n = e.GetDistanceAlongSplineAtSplinePoint(t);
          var a = e.GetDistanceAlongSplineAtSplinePoint(t + 1);
          for (let t = n + SAMPLE_STEP_DIST; t < a - SAMPLE_STEP_DIST; t += SAMPLE_STEP_DIST) {
            e.GetDirectionAtDistanceAlongSpline(t, 1, this.RTe);
            var _;
            var p = this.RTe;
            if (!(MathUtils_1.MathUtils.GetAngleByVectorDot(l, p) < SAMPLE_ANGLE_LIMIT)) {
              l.DeepCopy(p);
              p = Vector_1.Vector.Create();
              e.GetWorldLocationAtDistanceAlongSpline(t, p);
              (_ = new AiPatrolController_1.PatrolPoint()).IsMain = false;
              _.Point = p;
              r.push(_);
            }
          }
        }
      }
    }
    return this.IsInitSubPoint = true;
  }
  GetLastMainPointIndex(t) {
    if (!this.IsInitSubPoint) {
      return t;
    }
    if (!this.PathPoint?.length || !this.MainPointIndexArray?.length) {
      return -1;
    }
    if (t < 0 || t >= this.PathPoint.length) {
      return -1;
    }
    let [i, e] = [0, this.MainPointIndexArray.length - 1];
    while (i <= e) {
      var s = Math.floor((i + e) * 0.5);
      if (this.MainPointIndexArray[s] <= t) {
        i = s + 1;
      }
      if (this.MainPointIndexArray[s] > t) {
        e = s - 1;
      }
    }
    return i - 1;
  }
  Clear() {
    this.Yye.clear();
  }
}
exports.GameSplineComponent = GameSplineComponent;
//# sourceMappingURL=GameSplineComponent.js.map