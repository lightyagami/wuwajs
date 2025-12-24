"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BinItem = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TEST_AREA_COUNT = 30;
class BinItem {
  constructor() {
    this.MapId = -1;
    this.DungeonId = -1;
    this.BinSet = new BinSet();
    this.TestPoints = new Array();
    this.InitCallback = undefined;
  }
  Init(e) {
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Class, t => {
      if (this.zwe(t)) {
        this.Zwe(this.TestPoints, TEST_AREA_COUNT, this.BinSet);
        if (this.InitCallback) {
          this.InitCallback();
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Map", 42, "样条Asset资源加载错误，或选中的目标样条非BP_BasePathLine_Edgewall类", ["Path", e]);
      }
    });
  }
  zwe(t) {
    t = ActorSystem_1.ActorSystem.Get(t, MathUtils_1.MathUtils.DefaultTransformDouble);
    let e = undefined;
    if (!t.IsA(UE.BP_BasePathLine_Edgewall_C.StaticClass())) {
      return false;
    }
    var r = (e = t).OriginalLocation;
    var r = UE.KismetMathLibrary.Conv_VectorToVectorDouble(r);
    t.D_K2_SetActorLocationAndRotation(r, Rotator_1.Rotator.ZeroRotator, false, undefined, false);
    var i = e.Spline;
    var r = i.GetNumberOfSplinePoints();
    this.TestPoints.slice(0, r);
    for (let t = 0, e = r; t < e; t++) {
      var s = i.D_GetLocationAtSplinePoint(t, 1);
      this.TestPoints.push(new Vector2D_1.Vector2D(s.X, s.Y));
    }
    t.K2_DestroyActor();
    return true;
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
    var e = new Vector2D_1.Vector2D(t.X, t.Y);
    var t = this.BinSet;
    var r = this.TestPoints;
    if (e.Y < t.MinY || e.Y >= t.MaxY || e.X < t.MinX || e.X >= t.MaxX) {
      return false;
    }
    var i = Math.floor((e.Y - t.MinY) * t.ReciprocalDeltaY);
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
    let _ = false;
    for (let t = 0; t < l; t++, n++) {
      if (e.X < a[n].MinX) {
        do {
          if (!!a[n].FullCross || !(s = a[n].Id, e.Y <= r[s].Y == e.Y <= r[(s + 1) % r.length].Y)) {
            _ = !_;
          }
          n += 1;
        } while (++t < l);
        return _;
      }
      if (e.X < a[n].MaxX && (o = r[h = a[n].Id], h = r[(h + 1) % r.length], a[n].FullCross || e.Y <= o.Y != e.Y <= h.Y) && o.X - (o.Y - e.Y) * (h.X - o.X) / (h.Y - o.Y) >= e.X) {
        _ = !_;
      }
    }
    return _;
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
    o.ReciprocalDeltaY = 1 / o.DeltaY;
    let h = e[e.length - 1];
    let a = undefined;
    let l = undefined;
    let n = undefined;
    for (const a of e) {
      if (h.Y !== a.Y) {
        n = h.Y < a.Y ? (l = a, h) : (l = h, a);
        var s = Math.floor((n.Y - o.MinY) * o.ReciprocalDeltaY);
        var _ = (l.Y - o.MinY) * o.ReciprocalDeltaY;
        let e = Math.floor(_);
        if (_ - e == 0) {
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
      var c = new Array(r[e]);
      for (let t = 0; t < r[e]; t++) {
        c[t] = new Edge();
      }
      o.Bins[e].EdgeSet = c;
      o.Bins[e].MinX = o.MaxX;
      o.Bins[e].MaxX = o.MinX;
      o.Bins[e].Count = 0;
    }
    h = e[e.length - 1];
    let u = e.length - 1;
    for (let t = 0; t < e.length; t++) {
      a = e[t];
      if (h.Y !== a.Y) {
        var v = ((n = h.Y < a.Y ? (l = a, h) : (l = h, a)).Y - o.MinY) * o.ReciprocalDeltaY;
        var f = Math.floor(v);
        var d = (l.Y - o.MinY) * o.ReciprocalDeltaY;
        let e = Math.floor(d);
        if (d - e == 0) {
          e -= 1;
        }
        let r = n.X;
        var A = o.DeltaY * (l.X - n.X) / (l.Y - n.Y);
        let i = r;
        let s = false;
        for (let t = f; t < e; t++, r = i) {
          i = n.X + (t + 1 - v) * A;
          var M = o.Bins[t].Count;
          o.Bins[t].Count++;
          o.Bins[t].EdgeSet[M].Id = u;
          o.Bins[t].EdgeSet[M].FullCross = s;
          this.eBe(t, M, r, i, o);
          s = true;
        }
        r = i;
        i = l.X;
        d = o.Bins[e].Count++;
        o.Bins[e].EdgeSet[d].Id = u;
        o.Bins[e].EdgeSet[d].FullCross = false;
        this.eBe(e, d, r, i, o);
      }
      h = a;
      u = t;
    }
    for (let t = 0; t < o.BinNum; t++) {
      o.Bins[t].EdgeSet.sort((t, e) => t.MinX === e.MinX ? 0 : t.MinX < e.MinX ? -1 : 1);
    }
  }
}
exports.BinItem = BinItem;
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
    this.ReciprocalDeltaY = 0;
    this.Bins = undefined;
    this.MinY = 0;
  }
}
//# sourceMappingURL=BinItem.js.map