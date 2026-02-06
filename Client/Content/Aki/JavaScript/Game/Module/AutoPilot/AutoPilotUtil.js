"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotUtil = undefined;
const UE = require("ue");
const Stats_1 = require("../../../Core/Common/Stats");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const MapUtil_1 = require("../Map/MapUtil");
class AutoPilotUtil {
  static GenerateAllSplinePoints(i, e, o, r, a) {
    e.Empty();
    let s = 0;
    var l = i.length;
    for (let t = 0; t < l; t++) {
      var n = i[t];
      var h = n.RoadSpline;
      if (h) {
        s += this.J8m(h, t, l, e, o, r, a?.get(n.Id));
      }
    }
    return s;
  }
  static GenerateSingleSplinePoints(t, i) {
    i.Empty();
    this.GenerateSplinePoints(t, 0, t.GetSplineLength(), i, true, true);
  }
  static J8m(t, i, e, o, r, a, s) {
    this.N_g.Start();
    var l = t.GetSplineLength();
    let n = 0;
    let h = l;
    let c = 0;
    let u = false;
    let _ = false;
    if (e === 1 && r && a) {
      n = this.GetDistanceAlongSplineAtWorldLocation(t, r);
      h = this.GetDistanceAlongSplineAtWorldLocation(t, a);
      c = h - n;
      u = true;
      _ = true;
    } else if (i === 0 && r) {
      n = this.GetDistanceAlongSplineAtWorldLocation(t, r);
      c = l - n;
      u = true;
    } else if (i === e - 1 && a) {
      h = this.GetDistanceAlongSplineAtWorldLocation(t, a);
      c = h;
      _ = true;
    } else {
      c = l;
    }
    this.N_g.Stop();
    this.GenerateSplinePoints(t, n, h, o, u, _, s);
    return c;
  }
  static GetDistanceAlongSplineAtWorldLocation(t, i) {
    this.Sgg.Start();
    i = t.D_FindInputKeyClosestToWorldLocation(i.ToUeVector(true));
    t = t.GetDistanceAlongSplineAtSplineInputKey(i);
    this.Sgg.Stop();
    return t;
  }
  static GenerateSplinePoints(i, e, t, o, r, a, s) {
    var l = t - e;
    var n = ModelManager_1.ModelManager.AutoPilotModel.HighLightSampleDist;
    if (!(l < n)) {
      this.O_g.Start();
      if (r) {
        o.Add(this.d0n(e, i));
        s?.push(e);
      }
      var h = Math.floor(l / n);
      for (let t = 1; t <= h; t++) {
        var c = e + t * n;
        o.Add(this.d0n(c, i));
        s?.push(c);
      }
      if (a) {
        o.Add(this.d0n(t, i));
        s?.push(t);
      }
      this.O_g.Stop();
    }
  }
  static d0n(t, i) {
    i = i.D_GetLocationAtDistanceAlongSpline(t, 1);
    this.CTn.Set(i.X, i.Y);
    MapUtil_1.MapUtil.WorldPosition2UiPosition2D(this.CTn, this.Q8m);
    t = this.Q8m.ToUeVector2D(true);
    return t;
  }
  static ProcessSplinePointsForAutoPilotRoute(t, i, o, r) {
    if (r.has(t.Id)) {
      this.Mgg.Start();
      var a;
      var s;
      var l = this.GetDistanceAlongSplineAtWorldLocation(t.RoadSpline, o);
      let e = 0;
      this.gz.length = 0;
      for ([a, s] of r) {
        if (a === t.Id) {
          let i = 0;
          for (let t = 0; t < s.length; t++) {
            if (l - s[t] >= ModelManager_1.ModelManager.AutoPilotModel.HighLightSampleDist) {
              i = t + 1;
              break;
            }
          }
          if (i > 0) {
            s.splice(0, i);
            e += i;
          }
          break;
        }
        e += s.length;
        this.gz.push(a);
      }
      for (let t = 0; t < e; t++) {
        if (i.Num() > 0) {
          i.RemoveAt(0);
        }
      }
      for (const n of this.gz) {
        r.delete(n);
      }
      this.Mgg.Stop();
    }
  }
  static CheckReachEnd(t, i, e, o = 1000) {
    this.F_g.Start();
    i = this.GetDistanceAlongSplineAtWorldLocation(t, i);
    t = this.GetDistanceAlongSplineAtWorldLocation(t, e) - i;
    this.F_g.Stop();
    return t < o;
  }
  static IsNearRoadWay(t, i) {
    if (!t.RoadSpline) {
      return false;
    }
    this.G_g.Start();
    var e = t.RoadSpline.D_FindInputKeyClosestToWorldLocation(i.ToUeVector(true));
    var e = t.RoadSpline.D_GetLocationAtSplineInputKey(e, 1);
    if (ModelManager_1.ModelManager.AutoPilotModel?.IsDebugMode) {
      0;
      o = new UE.LinearColor(1, 0, 0, 0);
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, e, 30, 30, o, 30);
    }
    this.Wye.FromUeVector(e);
    var o = Vector_1.Vector.DistSquared(i, this.Wye);
    var e = ModelManager_1.ModelManager.AutoPilotModel.AutoPilotRoadWayWidthOffset;
    var i = t.Width / 2 + e;
    var t = i * i;
    this.G_g.Stop();
    return o <= t;
  }
}
(exports.AutoPilotUtil = AutoPilotUtil).CTn = Vector2D_1.Vector2D.Create();
AutoPilotUtil.Q8m = Vector2D_1.Vector2D.Create();
AutoPilotUtil.gz = [];
AutoPilotUtil.Wye = Vector_1.Vector.Create();
AutoPilotUtil.O_g = Stats_1.Stat.Create("GenerateSplinePoints");
AutoPilotUtil.G_g = Stats_1.Stat.Create("IsNearRoadWay");
AutoPilotUtil.N_g = Stats_1.Stat.Create("ProcessRoadwaySpline");
AutoPilotUtil.F_g = Stats_1.Stat.Create("CheckReachEnd");
AutoPilotUtil.Mgg = Stats_1.Stat.Create("ProcessSplinePointsForAutoPilotRoute");
AutoPilotUtil.Sgg = Stats_1.Stat.Create("GetDistanceAlongSplineAtWorldLocation"); //# sourceMappingURL=AutoPilotUtil.js.map