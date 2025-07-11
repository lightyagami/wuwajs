"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PointInPolygonTest = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
class PointInPolygonTest {
  constructor() {
    this.$Ri = "/Game/Aki/Data/PathLine/Pathline_EdgeWall/BP_BasePathLine_Edgewall.BP_BasePathLine_Edgewall_C";
    this.IsSplineInit = false;
    this.YRi = new BinSet();
    this.JRi = new Array();
    this.zRi = Vector2D_1.Vector2D.Create();
  }
  InitSpline() {
    var t = this.$Ri;
    if (!this.IsSplineInit) {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, t => {
        this.zwe(t);
        this.IsSplineInit = true;
        this.Zwe(this.JRi, 30, this.YRi);
      });
    }
  }
  zwe(t) {
    t = ActorSystem_1.ActorSystem.Get(t, MathUtils_1.MathUtils.DefaultTransformDouble);
    let e = undefined;
    if (t.IsA(UE.BP_BasePathLine_Edgewall_C.StaticClass())) {
      i = (e = t).OriginalLocation;
      i = UE.KismetMathLibrary.Conv_VectorToVectorDouble(i);
      t.D_K2_SetActorLocationAndRotation(i, Rotator_1.Rotator.ZeroRotator, false, undefined, false);
    }
    var r = e.Spline;
    var i = r.GetNumberOfSplinePoints();
    this.JRi.slice(0, i);
    for (let t = 0, e = i; t < e; t++) {
      var s = r.D_GetLocationAtSplinePoint(t, 1);
      this.JRi.push(new Vector2D_1.Vector2D(s.X, s.Y));
    }
    t.K2_DestroyActor();
  }
  eBe(t, e, r, i, s) {
    let o = r;
    let h = i;
    if (i < r) {
      o = i;
      h = r;
    }
    if (s.Bins[t].MinX > o) {
      s.Bins[t].MinX = o;
    }
    if (s.Bins[t].MaxX < h) {
      s.Bins[t].MaxX = h;
    }
    s.Bins[t].EdgeSet[e].MinX = o;
    s.Bins[t].EdgeSet[e].MaxX = h;
  }
  BinTest(t) {
    if (!this.IsSplineInit) {
      return true;
    }
    this.zRi.Set(t.X, t.Y);
    var e = this.zRi;
    var t = this.YRi;
    var r = this.JRi;
    if (e.Y < t.MinY || e.Y >= t.MaxY || e.X < t.MinX || e.X >= t.MaxX) {
      return false;
    }
    var i = Math.floor((e.Y - t.MinY) * t.InvDeltaY);
    var t = t.Bins[i];
    if (e.X < t.MinX || e.X > t.MaxX) {
      return false;
    }
    var s;
    var o;
    var h;
    var a = t.EdgeSet;
    var l = t.Count;
    let n = 0;
    let c = false;
    for (let t = 0; t < l; t++, n++) {
      if (e.X < a[n].MinX) {
        do {
          if (!!a[n].FullCross || !(s = a[n].Id, e.Y <= r[s].Y == e.Y <= r[(s + 1) % r.length].Y)) {
            c = !c;
          }
          n += 1;
        } while (++t < l);
        return c;
      }
      if (e.X < a[n].MaxX && (o = r[h = a[n].Id], h = r[(h + 1) % r.length], a[n].FullCross || e.Y <= o.Y != e.Y <= h.Y) && o.X - (o.Y - e.Y) * (h.X - o.X) / (h.Y - o.Y) >= e.X) {
        c = !c;
      }
    }
    return c;
  }
  Zwe(e, t, o) {
    var r = new Array(t);
    o.BinNum = t;
    o.Bins = new Array(t);
    o.MinX = o.MaxX = e[0].X;
    o.MinY = o.MaxY = e[0].Y;
    for (let t = 1; t < e.length; t++) {
      var i = e[t];
      if (o.MinX > i.X) {
        o.MinX = i.X;
      } else if (o.MaxX < i.X) {
        o.MaxX = i.X;
      }
      if (o.MinY > i.Y) {
        o.MinY = i.Y;
      } else if (o.MaxY < i.Y) {
        o.MaxY = i.Y;
      }
    }
    o.MinY -= MathUtils_1.MathUtils.SmallNumber * (o.MaxY - o.MinY);
    o.MaxY += MathUtils_1.MathUtils.SmallNumber * (o.MaxY - o.MinY);
    o.DeltaY = (o.MaxY - o.MinY) / t;
    o.InvDeltaY = 1 / o.DeltaY;
    let h = e[e.length - 1];
    let a = undefined;
    let l = undefined;
    let n = undefined;
    for (let t = 0; t < e.length; t++) {
      a = e[t];
      if (h.Y !== a.Y) {
        n = h.Y < a.Y ? (l = a, h) : (l = h, a);
        var s = Math.floor((n.Y - o.MinY) * o.InvDeltaY);
        var c = (l.Y - o.MinY) * o.InvDeltaY;
        let e = Math.floor(c);
        if (c - e == 0) {
          e -= 1;
        }
        for (let t = s; t <= e; t++) {
          r[t] = (r[t] ?? 0) + 1;
        }
      }
      h = a;
    }
    for (let e = 0; e < t; e++) {
      o.Bins[e] = new Bin();
      var _ = new Array(r[e]);
      for (let t = 0; t < r[e]; t++) {
        _[t] = new Edge();
      }
      o.Bins[e].EdgeSet = _;
      o.Bins[e].MinX = o.MaxX;
      o.Bins[e].MaxX = o.MinX;
      o.Bins[e].Count = 0;
    }
    h = e[e.length - 1];
    let u = e.length - 1;
    for (let t = 0; t < e.length; t++) {
      a = e[t];
      if (h.Y !== a.Y) {
        var v = ((n = h.Y < a.Y ? (l = a, h) : (l = h, a)).Y - o.MinY) * o.InvDeltaY;
        var d = Math.floor(v);
        var f = (l.Y - o.MinY) * o.InvDeltaY;
        let e = Math.floor(f);
        if (f - e == 0) {
          e -= 1;
        }
        let r = n.X;
        var M = o.DeltaY * (l.X - n.X) / (l.Y - n.Y);
        let i = r;
        let s = false;
        for (let t = d; t < e; t++, r = i) {
          i = n.X + (t + 1 - v) * M;
          var y = o.Bins[t].Count;
          o.Bins[t].Count++;
          o.Bins[t].EdgeSet[y].Id = u;
          o.Bins[t].EdgeSet[y].FullCross = s;
          this.eBe(t, y, r, i, o);
          s = true;
        }
        r = i;
        i = l.X;
        f = o.Bins[e].Count++;
        o.Bins[e].EdgeSet[f].Id = u;
        o.Bins[e].EdgeSet[f].FullCross = false;
        this.eBe(e, f, r, i, o);
      }
      h = a;
      u = t;
    }
    for (let t = 0; t < o.BinNum; t++) {
      o.Bins[t].EdgeSet.sort((t, e) => t.MinX === e.MinX ? 0 : t.MinX < e.MinX ? -1 : 1);
    }
  }
}
exports.PointInPolygonTest = PointInPolygonTest;
class Edge {
  constructor() {
    this.Id = 0;
    this.FullCross = false;
    this.MinX = 0;
    this.MaxX = 0;
  }
}
class Bin {
  constructor() {
    this.EdgeSet = undefined;
    this.MinX = 0;
    this.MaxX = 0;
    this.Count = 0;
  }
}
class BinSet {
  constructor() {
    this.BinNum = 0;
    this.MinX = 0;
    this.MaxX = 0;
    this.MaxY = 0;
    this.DeltaY = 0;
    this.InvDeltaY = 0;
    this.Bins = undefined;
    this.MinY = 0;
  }
}
//# sourceMappingURL=PointInPolygonTest.js.map