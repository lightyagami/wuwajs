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
      }, 100, "Ui.MapUi");
    }
  }
  zwe(t) {
    t = ActorSystem_1.ActorSystem.Get(t, MathUtils_1.MathUtils.DefaultTransformDouble);
    let e = undefined;
    if (t.IsA(UE.BP_BasePathLine_Edgewall_C.StaticClass())) {
      r = (e = t).OriginalLocation;
      r = UE.KismetMathLibrary.Conv_VectorToVectorDouble(r);
      t.D_K2_SetActorLocationAndRotation(r, Rotator_1.Rotator.ZeroRotator, false, undefined, false);
    }
    var i = e.Spline;
    var r = i.GetNumberOfSplinePoints();
    this.JRi.slice(0, r);
    for (let t = 0, e = r; t < e; t++) {
      var s = i.D_GetLocationAtSplinePoint(t, 1);
      this.JRi.push(new Vector2D_1.Vector2D(s.X, s.Y));
    }
    t.K2_DestroyActor();
  }
  eBe(t, e, i, r, s) {
    let o = i;
    let a = r;
    if (r < i) {
      o = r;
      a = i;
    }
    if (s.Bins[t].MinX > o) {
      s.Bins[t].MinX = o;
    }
    if (s.Bins[t].MaxX < a) {
      s.Bins[t].MaxX = a;
    }
    s.Bins[t].EdgeSet[e].MinX = o;
    s.Bins[t].EdgeSet[e].MaxX = a;
  }
  BinTest(t) {
    if (!this.IsSplineInit) {
      return true;
    }
    this.zRi.Set(t.X, t.Y);
    var e = this.zRi;
    var t = this.YRi;
    var i = this.JRi;
    if (e.Y < t.MinY || e.Y >= t.MaxY || e.X < t.MinX || e.X >= t.MaxX) {
      return false;
    }
    var r = Math.floor((e.Y - t.MinY) * t.InvDeltaY);
    var t = t.Bins[r];
    if (e.X < t.MinX || e.X > t.MaxX) {
      return false;
    }
    var s;
    var o;
    var a;
    var h = t.EdgeSet;
    var l = t.Count;
    let n = 0;
    let c = false;
    for (let t = 0; t < l; t++, n++) {
      if (e.X < h[n].MinX) {
        do {
          if (!!h[n].FullCross || !(s = h[n].Id, e.Y <= i[s].Y == e.Y <= i[(s + 1) % i.length].Y)) {
            c = !c;
          }
          n += 1;
        } while (++t < l);
        return c;
      }
      if (e.X < h[n].MaxX && (o = i[a = h[n].Id], a = i[(a + 1) % i.length], h[n].FullCross || e.Y <= o.Y != e.Y <= a.Y) && o.X - (o.Y - e.Y) * (a.X - o.X) / (a.Y - o.Y) >= e.X) {
        c = !c;
      }
    }
    return c;
  }
  Zwe(e, t, o) {
    var i = new Array(t);
    o.BinNum = t;
    o.Bins = new Array(t);
    o.MinX = o.MaxX = e[0].X;
    o.MinY = o.MaxY = e[0].Y;
    for (let t = 1; t < e.length; t++) {
      var r = e[t];
      if (o.MinX > r.X) {
        o.MinX = r.X;
      } else if (o.MaxX < r.X) {
        o.MaxX = r.X;
      }
      if (o.MinY > r.Y) {
        o.MinY = r.Y;
      } else if (o.MaxY < r.Y) {
        o.MaxY = r.Y;
      }
    }
    o.MinY -= MathUtils_1.MathUtils.SmallNumber * (o.MaxY - o.MinY);
    o.MaxY += MathUtils_1.MathUtils.SmallNumber * (o.MaxY - o.MinY);
    o.DeltaY = (o.MaxY - o.MinY) / t;
    o.InvDeltaY = 1 / o.DeltaY;
    let a = e[e.length - 1];
    let h = undefined;
    let l = undefined;
    let n = undefined;
    for (let t = 0; t < e.length; t++) {
      h = e[t];
      if (a.Y !== h.Y) {
        n = a.Y < h.Y ? (l = h, a) : (l = a, h);
        var s = Math.floor((n.Y - o.MinY) * o.InvDeltaY);
        var c = (l.Y - o.MinY) * o.InvDeltaY;
        let e = Math.floor(c);
        if (c - e == 0) {
          e -= 1;
        }
        for (let t = s; t <= e; t++) {
          i[t] = (i[t] ?? 0) + 1;
        }
      }
      a = h;
    }
    for (let e = 0; e < t; e++) {
      o.Bins[e] = new Bin();
      var _ = new Array(i[e]);
      for (let t = 0; t < i[e]; t++) {
        _[t] = new Edge();
      }
      o.Bins[e].EdgeSet = _;
      o.Bins[e].MinX = o.MaxX;
      o.Bins[e].MaxX = o.MinX;
      o.Bins[e].Count = 0;
    }
    a = e[e.length - 1];
    let u = e.length - 1;
    for (let t = 0; t < e.length; t++) {
      h = e[t];
      if (a.Y !== h.Y) {
        var v = ((n = a.Y < h.Y ? (l = h, a) : (l = a, h)).Y - o.MinY) * o.InvDeltaY;
        var d = Math.floor(v);
        var f = (l.Y - o.MinY) * o.InvDeltaY;
        let e = Math.floor(f);
        if (f - e == 0) {
          e -= 1;
        }
        let i = n.X;
        var M = o.DeltaY * (l.X - n.X) / (l.Y - n.Y);
        let r = i;
        let s = false;
        for (let t = d; t < e; t++, i = r) {
          r = n.X + (t + 1 - v) * M;
          var U = o.Bins[t].Count;
          o.Bins[t].Count++;
          o.Bins[t].EdgeSet[U].Id = u;
          o.Bins[t].EdgeSet[U].FullCross = s;
          this.eBe(t, U, i, r, o);
          s = true;
        }
        i = r;
        r = l.X;
        f = o.Bins[e].Count++;
        o.Bins[e].EdgeSet[f].Id = u;
        o.Bins[e].EdgeSet[f].FullCross = false;
        this.eBe(e, f, i, r, o);
      }
      a = h;
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