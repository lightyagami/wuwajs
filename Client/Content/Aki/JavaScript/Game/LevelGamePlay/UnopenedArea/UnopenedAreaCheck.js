"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnopenedAreaCheck = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../Core/Common/Log");
const AreaByAreaId_1 = require("../../../Core/Define/ConfigQuery/AreaByAreaId");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TEST_AREA_COUNT = 30;
const FAILURE_COUNT = 7;
class UnopenedAreaCheck {
  constructor() {
    this.IsSplineInit = false;
    this.Xwe = 0;
    this.$we = new Map();
    this.Ywe = new Map();
    this.Vj = new Map();
  }
  AreaInit(t) {
    for (var [e, r] of t) {
      this.Jwe(e, r);
    }
    if (t.size === 0 && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Map", 42, "初始化区域数量为零");
    }
    this.Xwe = 0;
    this.IsSplineInit = true;
  }
  AreaStatesChange(t) {
    this.Jwe(t.GRs.p6n, t.GRs.Y4n ?? false);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Map", 42, "AreaStatesChange更新区域边界状态", ["AreaState.Proto_AreaId", t.GRs.p6n], ["AreaState.Proto_State", t.GRs.Y4n ?? false]);
    }
  }
  Jwe(e, t) {
    var r = AreaByAreaId_1.configAreaByAreaId.GetConfigList(e);
    if (r && r.length !== 0 && r[0].EdgeWallName) {
      const s = r[0].EdgeWallName + "_C";
      var i = r[0].MapConfigId;
      var r = r[0].DungeonId;
      if (t) {
        if (!this.Ywe.has(s)) {
          this.Ywe.set(s, new Set());
        }
        if (!this.Ywe.get(s).has(e)) {
          this.Ywe.get(s).add(e);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Map", 42, "AreaPathMap区域添加", ["AreaId", e], ["Path", s]);
          }
        }
        if (!this.$we.has(s)) {
          const o = new BinItem();
          o.MapId = i;
          o.DungeonId = r;
          o.InitCallback = () => {
            if (o && o.BinSet && o.TestPoints) {
              this.$we.set(s, o);
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Map", 42, "BinMap添加边界", ["Path", s]);
              }
            } else if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Map", 42, "BinMap添加边界出错", ["Path", s]);
            }
          };
          o.Init(s);
        }
        let t = this.Vj.get(r);
        if (!t) {
          t = new Set();
          this.Vj.set(r, t);
        }
        t.add(s);
      } else {
        t = this.Ywe.get(s);
        if (t?.has(e) && (t.delete(e), Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("Map", 42, "AreaPathMap区域删除", ["AreaId", e], ["Path", s]);
        }
        if ((!t || t.size === 0) && !!this.$we.has(s)) {
          this.$we.delete(s);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Map", 42, "BinMap移除边界", ["Path", s]);
          }
        }
        i = this.Vj.get(r);
        if (i && i.delete(s) && i.size === 0) {
          this.Vj.delete(r);
        }
      }
    }
  }
  BinTest(t, e, r) {
    if (!this.IsSplineInit || this.$we.size === 0) {
      if (this.Xwe <= FAILURE_COUNT && (this.Xwe++, Log_1.Log.CheckInfo() && Log_1.Log.Info("Map", 42, "检测是否进入未开放区域，检测失败", ["IsSplineInit", this.IsSplineInit], ["BinMap.size", this.$we.size]), this.Xwe === FAILURE_COUNT) && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Map", 42, "检测是否进入未开放区域一直失败，不报Log了");
      }
      return true;
    }
    if (this.Xwe !== 0 && (this.Xwe = 0, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Map", 42, "检测是否进入未开放区域，恢复正常检测");
    }
    let i = false;
    r = this.Vj.get(r);
    if (r && r.size > 0) {
      for (const o of r) {
        var s = this.$we.get(o);
        if (s && (i = true, s.BinTest(t))) {
          return true;
        }
      }
    }
    if (i) {
      return false;
    }
    for (const a of this.$we) {
      if (e === a[1].MapId && (i = true, a[1].BinTest(t))) {
        return true;
      }
    }
    return !i;
  }
  Clear() {
    this.IsSplineInit = false;
    this.$we.clear();
  }
}
exports.UnopenedAreaCheck = UnopenedAreaCheck;
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
    let a = i;
    if (i < r) {
      o = i;
      a = r;
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
    var a;
    var h = t.EdgeSet;
    var n = t.Count;
    let _ = 0;
    let l = false;
    for (let t = 0; t < n; t++, _++) {
      if (e.X < h[_].MinX) {
        do {
          if (!!h[_].FullCross || !(s = h[_].Id, e.Y <= r[s].Y == e.Y <= r[(s + 1) % r.length].Y)) {
            l = !l;
          }
          _ += 1;
        } while (++t < n);
        return l;
      }
      if (e.X < h[_].MaxX && (o = r[a = h[_].Id], a = r[(a + 1) % r.length], h[_].FullCross || e.Y <= o.Y != e.Y <= a.Y) && o.X - (o.Y - e.Y) * (a.X - o.X) / (a.Y - o.Y) >= e.X) {
        l = !l;
      }
    }
    return l;
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
    let a = e[e.length - 1];
    let h = undefined;
    let n = undefined;
    let _ = undefined;
    for (const h of e) {
      if (a.Y !== h.Y) {
        _ = a.Y < h.Y ? (n = h, a) : (n = a, h);
        var s = Math.floor((_.Y - o.MinY) * o.ReciprocalDeltaY);
        var l = (n.Y - o.MinY) * o.ReciprocalDeltaY;
        let e = Math.floor(l);
        if (l - e == 0) {
          e -= 1;
        }
        for (let t = s; t <= e; t++) {
          r[t] = (r[t] ?? 0) + 1;
        }
      }
      a = h;
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
    a = e[e.length - 1];
    let A = e.length - 1;
    for (let t = 0; t < e.length; t++) {
      h = e[t];
      if (a.Y !== h.Y) {
        var u = ((_ = a.Y < h.Y ? (n = h, a) : (n = a, h)).Y - o.MinY) * o.ReciprocalDeltaY;
        var p = Math.floor(u);
        var f = (n.Y - o.MinY) * o.ReciprocalDeltaY;
        let e = Math.floor(f);
        if (f - e == 0) {
          e -= 1;
        }
        let r = _.X;
        var M = o.DeltaY * (n.X - _.X) / (n.Y - _.Y);
        let i = r;
        let s = false;
        for (let t = p; t < e; t++, r = i) {
          i = _.X + (t + 1 - u) * M;
          var g = o.Bins[t].Count;
          o.Bins[t].Count++;
          o.Bins[t].EdgeSet[g].Id = A;
          o.Bins[t].EdgeSet[g].FullCross = s;
          this.eBe(t, g, r, i, o);
          s = true;
        }
        r = i;
        i = n.X;
        f = o.Bins[e].Count++;
        o.Bins[e].EdgeSet[f].Id = A;
        o.Bins[e].EdgeSet[f].FullCross = false;
        this.eBe(e, f, r, i, o);
      }
      a = h;
      A = t;
    }
    for (let t = 0; t < o.BinNum; t++) {
      o.Bins[t].EdgeSet.sort((t, e) => t.MinX === e.MinX ? 0 : t.MinX < e.MinX ? -1 : 1);
    }
  }
}
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
//# sourceMappingURL=UnopenedAreaCheck.js.map