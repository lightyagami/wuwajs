"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemSplineMoveTaskUtils = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CurveFloatHandle_1 = require("../../../Core/Utils/CurveFloatHandle");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const ModelManager_1 = require("../../Manager/ModelManager");
class SceneItemSplineMoveTaskUtils {
  static ParseOldConfigToSplineMoveParam(e, t, i, a, r, o, n, s) {
    s.IsRepeat = a;
    s.IsCycle = r;
    s.IsKeepLookAt = o;
    s.StartTimeOffset = n;
    if (a && r) {
      this.SetSplineClosedLoop(e, true);
    } else {
      this.SetSplineClosedLoop(e, false);
    }
    var l = [];
    var v = e.GetNumberOfSplineSegments();
    for (let e = 0; e <= v; e++) {
      l.push({
        Type: 0,
        Speed: MathUtils_1.MathUtils.Clamp(t[e] ?? 0, 0, MathUtils_1.MathUtils.MaxFloat),
        WaitTime: MathUtils_1.MathUtils.Clamp(i[e] ?? 0, 0, MathUtils_1.MathUtils.MaxFloat)
      });
    }
    return this.F51(e, l, undefined, s);
  }
  static CreateDefaultGeneralConfig() {
    return {
      IsLookDir: false,
      GlobalConfig: undefined,
      PointConfigs: undefined,
      MoveCount: 1,
      IsClosedLoop: false,
      SplineMoveRange: undefined
    };
  }
  static CreateDefaultGeneralRuntimeData() {
    return {
      DistanceAloneSpline: undefined,
      CurPos: undefined,
      CurRot: undefined
    };
  }
  static ParseProtoSplineMoveConfigToGeneralConfig(e, t, i) {
    var a = ModelManager_1.ModelManager.CreatureModel?.GetCompleteEntityData(e);
    var a = a ? (0, IComponent_1.getComponent)(a.ComponentsData, "SplineComponent") : undefined;
    if (a?.Option) {
      this.ParseSplineDataToGeneralConfig(a.Option, i);
      if (t?.EAc !== undefined) {
        i.IsLookDir = t?.EAc;
      }
      if (t?.TAc !== undefined) {
        i.IsClosedLoop = t?.TAc;
      }
      if (t?.IAc !== undefined) {
        i.MoveCount = t.IAc;
      }
      i.SplineMoveRange = {
        Type: 0,
        StartIndex: t?.SAc ?? -1,
        EndIndex: t?.MAc ?? -1
      };
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[SceneItemSplineMoveTaskUtils.ParseProtoSplineMoveConfigToGeneralConfig] 找不到样条配置", ["SplineEntityId", e]);
      }
      return false;
    }
  }
  static ParseProtoSplineMoveRuntimeDataToGeneralRuntimeData(e, t) {
    t.DistanceAloneSpline = e && e.RAc >= 0 ? e.RAc : undefined;
    t.CurPos = e?.AAc ? Vector_1.Vector.Create(e.AAc) : undefined;
    t.CurRot = e?.PHc ? Rotator_1.Rotator.Create(e.PHc) : undefined;
    return true;
  }
  static ParseSplineDataToGeneralConfig(t, i) {
    switch (t.Type) {
      case IComponent_1.ESplineType.ContinuesVariableSpeedMovement:
        if (t.EntireTimePathConfig) {
          i.GlobalConfig = {
            Type: 1,
            Time: t.EntireTimePathConfig.TotalTime,
            TimeDisCurve: t.EntireTimePathConfig.TimePathCurve
          };
          i.PointConfigs = undefined;
        } else {
          i.GlobalConfig = undefined;
          i.PointConfigs = [];
          for (let e = 0; e < t.Points.length; e++) {
            var a = t.Points[e];
            if (a.IntervalTimePathConfig) {
              i.PointConfigs.push({
                Type: 1,
                Time: a.IntervalTimePathConfig.TotalTime,
                TimeDisCurve: a.IntervalTimePathConfig.TimePathCurve
              });
            } else if (a.KeepSpeed) {
              i.PointConfigs.push({
                Type: 0,
                Speed: a.KeepSpeed
              });
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 39, "[ParseSplineDataToSceneItemSplineMoveConfig] 样条中包含错误配置的点", ["PointIndex", e]);
            }
          }
        }
        if (t.CircleMode !== undefined) {
          i.MoveCount = -1;
          i.IsClosedLoop = t.CircleMode === 0;
        }
        break;
      case IComponent_1.ESplineType.Patrol:
        i.GlobalConfig = undefined;
        i.PointConfigs = [];
        for (const e of t.Points) {
          i.PointConfigs.push({
            Type: 0,
            Speed: e.MoveSpeed,
            WaitTime: e.StayTime
          });
        }
        if (t.CycleOption?.Type === IComponent_1.EPatrolCycleMode.Loop) {
          i.MoveCount = -1;
          i.IsClosedLoop = t.CycleOption.IsCircle;
        }
        break;
      case IComponent_1.ESplineType.Butterfly:
        i.GlobalConfig = undefined;
        i.PointConfigs = [];
        for (const r of t.Points) {
          i.PointConfigs.push({
            Type: 0,
            Speed: r.MoveSpeed,
            WaitTime: 0
          });
        }
        break;
      default:
        return false;
    }
    return true;
  }
  static ParseGeneralConfigAndRuntimeDataToSplineMoveParam(e, t, i, a, r) {
    if (!e?.IsValid()) {
      return false;
    }
    r.IsRepeat = t.MoveCount < 0 || t.MoveCount > 1;
    r.IsCycle = t.IsClosedLoop;
    r.StartTimeOffset = 0;
    r.IsKeepLookAt = t.IsLookDir;
    if ((t.MoveCount < 0 || t.MoveCount > 1) && t.IsClosedLoop) {
      this.SetSplineClosedLoop(e, true);
    } else {
      this.SetSplineClosedLoop(e, false);
    }
    var o = this.N51(t.SplineMoveRange, e);
    r.StartDis = o.StartDis;
    r.EndDis = o.EndDis;
    if (t.GlobalConfig) {
      const n = this.V51(e, t.GlobalConfig, a, r);
      if (!n) {
        return false;
      }
    }
    if (t.PointConfigs) {
      const n = this.F51(e, t.PointConfigs, a, r);
      if (!n) {
        return false;
      }
    }
    const n = this.j51(e, i, r);
    return !!n;
  }
  static V51(i, a, r, o) {
    var n = i.GetNumberOfSplinePoints();
    var s = i.GetSplineLength();
    var l = i.IsClosedLoop();
    if (a.Type === 0) {
      o.TimeSec = Math.abs(s / a.Speed);
      return true;
    }
    if (a.Type !== 1) {
      return false;
    }
    {
      let e = a.Time;
      r = r?.get(a.TimeDisCurve ?? "");
      let t = r;
      if (l && (i = (l = s - (a = i.GetDistanceAlongSplineAtSplinePoint(n - 1))) / (a / e), e += i, r) && i) {
        (n = new CurveFloatHandle_1.CurveFloatHandle(r)).MapRangeClampedTimeAndValue([0, e / (e - i)], [0, 1], [0, s / (s - l)], [0, 1]);
        n.AddKey(1, 1, 1);
        t = n.ToUeCurveFloat();
      }
      o.TimeSec = e;
      o.TimeDisCurve = t;
      return true;
    }
  }
  static F51(r, o, n, e) {
    var s = r.GetNumberOfSplinePoints();
    var l = r.GetNumberOfSplineSegments();
    var t = r.GetSplineLength();
    var v = r.IsClosedLoop();
    var u = new CurveFloatHandle_1.CurveFloatHandle();
    let p = 0;
    for (let a = 0; a <= l; a++) {
      let e = undefined;
      e = a === s && v ? o[a] ?? {
        Type: 1,
        Time: p,
        TimeDisCurve: undefined
      } : o[a];
      var _ = r.GetDistanceAlongSplineAtSplinePoint(a);
      var c = e?.WaitTime ?? 0;
      let t = 0;
      if (a < l) {
        d = r.GetDistanceAlongSplineAtSplinePoint(a + 1);
        t = d - _;
      }
      if (!e || !t && !c) {
        u.AddKey(p, _, 1);
        break;
      }
      u.AddKey(p, _);
      if (!t) {
        u.AddKey(p + c, _, 1);
        p += c;
        break;
      }
      if (c) {
        u.AddKey(p + c, _);
      }
      let i = 0;
      if (e.Type === 0) {
        i = e.Speed ? Math.abs(t / e.Speed) : 0;
      } else if (e.Type === 1) {
        i = e.Time;
        var d = n?.get(e.TimeDisCurve ?? "");
        if (d) {
          var M = new CurveFloatHandle_1.CurveFloatHandle(d);
          M.MapRangeClampedTimeAndValue([0, 1], [p + c, p + c + i], [0, 1], [_, _ + t]);
          for (const C of M.FloatCurveKeys) {
            u.AddKey(C);
          }
        }
      }
      u.AddKey(p + c + i, _ + t, 1);
      p += c + i;
    }
    u.MapRangeClampedTimeAndValue([0, p], [0, 1], [0, t], [0, 1]);
    e.TimeSec = p;
    e.TimeDisCurve = u.ToUeCurveFloat();
    return true;
  }
  static j51(i, a, r) {
    a = a.DistanceAloneSpline;
    if (a && a > 0) {
      var o;
      var n;
      var i = i.GetSplineLength();
      let e = r.StartDis / i;
      let t = a / i;
      if (r.TimeDisCurve && (a = (0, puerts_1.$ref)(undefined), i = UE.KuroSceneItemMoveComponent.FindTimeByValueIn01Curve(r.TimeDisCurve, e, a), o = (0, puerts_1.$ref)(undefined), n = UE.KuroSceneItemMoveComponent.FindTimeByValueIn01Curve(r.TimeDisCurve, t, o), i) && n) {
        e = (0, puerts_1.$unref)(o);
        t = (0, puerts_1.$unref)(a);
      }
      r.StartTimeOffset = MathUtils_1.MathUtils.Clamp((t - e) * r.TimeSec, 0, r.TimeSec);
    }
    return true;
  }
  static SetSplineClosedLoop(e, t) {
    var i;
    var a;
    var r;
    var o;
    var n = e.GetNumberOfSplinePoints();
    var s = e.IsClosedLoop();
    if (!s && t) {
      n = n - 1;
      a = e.D_GetLocationAtSplinePoint(0, 0);
      r = e.D_GetLeaveTangentAtSplinePoint(n, 0);
      i = e.D_GetLeaveTangentAtSplinePoint(0, 0);
      a = a.op_Subtraction(r).GetSafeNormal(MathUtils_1.MathUtils.SmallNumber);
      r = e.D_GetArriveTangentAtSplinePoint(n, 0);
      o = a;
      e.SetClosedLoop(true);
      e.D_SetTangentsAtSplinePoint(0, a, i, 0);
      e.D_SetTangentsAtSplinePoint(n, r, o, 0);
    } else if (s && !t) {
      e.SetClosedLoop(false);
    }
  }
  static N51(e, t) {
    var i = {
      Type: 1,
      StartDis: -1,
      EndDis: -1
    };
    switch (e?.Type) {
      case 0:
        var a = t.GetNumberOfSplinePoints();
        i.StartDis = e.StartIndex < 0 ? -1 : t.GetDistanceAlongSplineAtSplinePoint(MathUtils_1.MathUtils.Clamp(e.StartIndex, 0, a));
        i.EndDis = e.EndIndex < 0 ? -1 : t.GetDistanceAlongSplineAtSplinePoint(MathUtils_1.MathUtils.Clamp(e.EndIndex, 0, a));
        break;
      case 1:
        a = t.GetSplineLength();
        i.StartDis = e.StartDis < 0 ? -1 : MathUtils_1.MathUtils.Clamp(e.StartDis, 0, a);
        i.EndDis = e.EndDis < 0 ? -1 : MathUtils_1.MathUtils.Clamp(e.EndDis, 0, a);
        break;
      default:
        i.StartDis = -1;
        i.EndDis = -1;
    }
    return i;
  }
  static CheckSplineMoveDistanceNearlyEqual(e, t, i = MathUtils_1.MathUtils.SmallNumber) {
    return MathUtils_1.MathUtils.IsNearlyEqual(e, t, i);
  }
  static CheckSplineMoveLocationNearlyEqual(e, t, i = MathUtils_1.MathUtils.SmallNumber) {
    return Vector_1.Vector.Distance(e, t) <= i;
  }
  static CheckSplineMoveRotatorNearlyEqual(e, t, i = MathUtils_1.MathUtils.SmallNumber) {
    e.Quaternion(this.tMn);
    t.Quaternion(this.k6r);
    e = this.tMn.ToUeQuat();
    t = this.k6r.ToUeQuat();
    return e.AngularDistance(t) <= i;
  }
  static CheckSplineMoveQuatNearlyEqual(e, t, i = MathUtils_1.MathUtils.SmallNumber) {
    return e.ToUeQuat().AngularDistance(t.ToUeQuat()) <= i;
  }
}
(exports.SceneItemSplineMoveTaskUtils = SceneItemSplineMoveTaskUtils).tMn = Quat_1.Quat.Create();
SceneItemSplineMoveTaskUtils.k6r = Quat_1.Quat.Create(); //# sourceMappingURL=SceneItemSplineMoveTaskUtils.js.map