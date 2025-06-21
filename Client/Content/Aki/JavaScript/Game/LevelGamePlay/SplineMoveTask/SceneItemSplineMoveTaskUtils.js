"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SceneItemSplineMoveTaskUtils = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CurveFloatHandle_1 = require("../../../Core/Utils/CurveFloatHandle"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
class SceneItemSplineMoveTaskUtils {
  static ParseOldConfigToSplineMoveParam(e, t, i, r, a, o, n, s) {
    s.IsRepeat = r, s.IsCycle = a, s.IsKeepLookAt = o, s.StartTimeOffset = n, r && a ? this.SetSplineClosedLoop(e, !0) : this.SetSplineClosedLoop(e, !1);
    var l = [],
      v = e.GetNumberOfSplineSegments();
    for (let e = 0; e <= v; e++) l.push({
      Type: 0,
      Speed: MathUtils_1.MathUtils.Clamp(t[e] ?? 0, 0, MathUtils_1.MathUtils.MaxFloat),
      WaitTime: MathUtils_1.MathUtils.Clamp(i[e] ?? 0, 0, MathUtils_1.MathUtils.MaxFloat)
    });
    return this.n51(e, l, void 0, s)
  }
  static CreateDefaultGeneralConfig() {
    return {
      IsLookDir: !1,
      GlobalConfig: void 0,
      PointConfigs: void 0,
      MoveCount: 1,
      IsClosedLoop: !1,
      SplineMoveRange: void 0
    }
  }
  static ParseSplineDataToGeneralConfig(t, i) {
    switch (t.Type) {
      case IComponent_1.ESplineType.ContinuesVariableSpeedMovement:
        if (t.EntireTimePathConfig) i.GlobalConfig = {
          Type: 1,
          Time: t.EntireTimePathConfig.TotalTime,
          TimeDisCurve: t.EntireTimePathConfig.TimePathCurve
        }, i.PointConfigs = void 0;
        else {
          i.GlobalConfig = void 0, i.PointConfigs = [];
          for (let e = 0; e < t.Points.length; e++) {
            var r = t.Points[e];
            r.IntervalTimePathConfig ? i.PointConfigs.push({
              Type: 1,
              Time: r.IntervalTimePathConfig.TotalTime,
              TimeDisCurve: r.IntervalTimePathConfig.TimePathCurve
            }) : r.KeepSpeed ? i.PointConfigs.push({
              Type: 0,
              Speed: r.KeepSpeed
            }) : Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 39, "[ParseSplineDataToSceneItemSplineMoveConfig] 样条中包含错误配置的点", ["PointIndex", e])
          }
        }
        void 0 !== t.CircleMode && (i.MoveCount = -1, i.IsClosedLoop = 0 === t.CircleMode);
        break;
      case IComponent_1.ESplineType.Patrol:
        i.GlobalConfig = void 0, i.PointConfigs = [];
        for (const e of t.Points) i.PointConfigs.push({
          Type: 0,
          Speed: e.MoveSpeed,
          WaitTime: e.StayTime
        });
        t.CycleOption?.Type === IComponent_1.EPatrolCycleMode.Loop && (i.MoveCount = -1, i.IsClosedLoop = t.CycleOption.IsCircle);
        break;
      case IComponent_1.ESplineType.Butterfly:
        i.GlobalConfig = void 0, i.PointConfigs = [];
        for (const a of t.Points) i.PointConfigs.push({
          Type: 0,
          Speed: a.MoveSpeed,
          WaitTime: 0
        });
        break;
      default:
        return !1
    }
    return !0
  }
  static ParseGeneralConfigAndRuntimeDataToSplineMoveParam(e, t, i, r, a) {
    if (!e?.IsValid()) return !1;
    a.IsRepeat = t.MoveCount < 0 || 1 < t.MoveCount, a.IsCycle = t.IsClosedLoop, a.StartTimeOffset = 0, a.IsKeepLookAt = t.IsLookDir, (t.MoveCount < 0 || 1 < t.MoveCount) && t.IsClosedLoop ? this.SetSplineClosedLoop(e, !0) : this.SetSplineClosedLoop(e, !1);
    var o = this.s51(t.SplineMoveRange, e);
    if (a.StartDis = o.StartDis, a.EndDis = o.EndDis, t.GlobalConfig) {
      const n = this.a51(e, t.GlobalConfig, r, a);
      if (!n) return !1
    }
    if (t.PointConfigs) {
      const n = this.n51(e, t.PointConfigs, r, a);
      if (!n) return !1
    }
    const n = this.h51(e, i, a);
    return !!n
  }
  static a51(i, r, a, o) {
    var n = i.GetNumberOfSplinePoints(),
      s = i.GetSplineLength(),
      l = i.IsClosedLoop();
    if (0 === r.Type) return o.TimeSec = Math.abs(s / r.Speed), !0;
    if (1 !== r.Type) return !1;
    {
      let e = r.Time;
      a = a?.get(r.TimeDisCurve ?? "");
      let t = a;
      return l && (i = (l = s - (r = i.GetDistanceAlongSplineAtSplinePoint(n - 1))) / (r / e), e += i, a) && i && ((n = new CurveFloatHandle_1.CurveFloatHandle(a)).MapRangeClampedTimeAndValue([0, e / (e - i)], [0, 1], [0, s / (s - l)], [0, 1]), n.AddKey(1, 1, 1), t = n.ToUeCurveFloat()), o.TimeSec = e, o.TimeDisCurve = t, !0
    }
  }
  static n51(a, o, n, e) {
    var s = a.GetNumberOfSplinePoints(),
      l = a.GetNumberOfSplineSegments(),
      t = a.GetSplineLength(),
      v = a.IsClosedLoop(),
      p = new CurveFloatHandle_1.CurveFloatHandle;
    let u = 0;
    for (let r = 0; r <= l; r++) {
      let e = void 0;
      e = r === s && v ? o[r] ?? {
        Type: 1,
        Time: u,
        TimeDisCurve: void 0
      } : o[r];
      var _ = a.GetDistanceAlongSplineAtSplinePoint(r),
        f = e?.WaitTime ?? 0;
      let t = 0;
      if (r < l && (d = a.GetDistanceAlongSplineAtSplinePoint(r + 1), t = d - _), !e || !t && !f) {
        p.AddKey(u, _, 1);
        break
      }
      if (p.AddKey(u, _), !t) {
        p.AddKey(u + f, _, 1), u += f;
        break
      }
      f && p.AddKey(u + f, _);
      let i = 0;
      if (0 === e.Type) i = e.Speed ? Math.abs(t / e.Speed) : 0;
      else if (1 === e.Type) {
        i = e.Time;
        var d = n?.get(e.TimeDisCurve ?? "");
        if (d) {
          var C = new CurveFloatHandle_1.CurveFloatHandle(d);
          C.MapRangeClampedTimeAndValue([0, 1], [u + f, u + f + i], [0, 1], [_, _ + t]);
          for (const c of C.FloatCurveKeys) p.AddKey(c)
        }
      }
      p.AddKey(u + f + i, _ + t, 1), u += f + i
    }
    return p.MapRangeClampedTimeAndValue([0, u], [0, 1], [0, t], [0, 1]), e.TimeSec = u, e.TimeDisCurve = p.ToUeCurveFloat(), !0
  }
  static h51(i, r, a) {
    r = r.DistanceAloneSpline;
    if (r && 0 < r) {
      var o, n, i = i.GetSplineLength();
      let e = a.StartDis / i,
        t = r / i;
      a.TimeDisCurve && (r = (0, puerts_1.$ref)(void 0), i = UE.KuroSceneItemMoveComponent.FindTimeByValueIn01Curve(a.TimeDisCurve, e, r), o = (0, puerts_1.$ref)(void 0), n = UE.KuroSceneItemMoveComponent.FindTimeByValueIn01Curve(a.TimeDisCurve, t, o), i) && n && (e = (0, puerts_1.$unref)(o), t = (0, puerts_1.$unref)(r)), a.StartTimeOffset = MathUtils_1.MathUtils.Clamp((t - e) * a.TimeSec, 0, a.TimeSec)
    }
    return !0
  }
  static SetSplineClosedLoop(e, t) {
    var i, r, a, o, n = e.GetNumberOfSplinePoints(),
      s = e.IsClosedLoop();
    !s && t ? (n = n - 1, r = e.D_GetLocationAtSplinePoint(0, 0), a = e.D_GetLeaveTangentAtSplinePoint(n, 0), i = e.D_GetLeaveTangentAtSplinePoint(0, 0), r = r.op_Subtraction(a).GetSafeNormal(MathUtils_1.MathUtils.SmallNumber), a = e.D_GetArriveTangentAtSplinePoint(n, 0), o = r, e.SetClosedLoop(!0), e.D_SetTangentsAtSplinePoint(0, r, i, 0), e.D_SetTangentsAtSplinePoint(n, a, o, 0)) : s && !t && e.SetClosedLoop(!1)
  }
  static s51(e, t) {
    var i = {
      Type: 1,
      StartDis: -1,
      EndDis: -1
    };
    switch (e?.Type) {
      case 0:
        var r = t.GetNumberOfSplinePoints();
        i.StartDis = e.StartIndex < 0 ? -1 : t.GetDistanceAlongSplineAtSplinePoint(MathUtils_1.MathUtils.Clamp(e.StartIndex, 0, r)), i.EndDis = e.EndIndex < 0 ? -1 : t.GetDistanceAlongSplineAtSplinePoint(MathUtils_1.MathUtils.Clamp(e.EndIndex, 0, r));
        break;
      case 1:
        r = t.GetSplineLength();
        i.StartDis = e.StartDis < 0 ? -1 : MathUtils_1.MathUtils.Clamp(e.StartDis, 0, r), i.EndDis = e.EndDis < 0 ? -1 : MathUtils_1.MathUtils.Clamp(e.EndDis, 0, r);
        break;
      default:
        i.StartDis = -1, i.EndDis = -1
    }
    return i
  }
}
exports.SceneItemSplineMoveTaskUtils = SceneItemSplineMoveTaskUtils;
//# sourceMappingURL=SceneItemSplineMoveTaskUtils.js.map