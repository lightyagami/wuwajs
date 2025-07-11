"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformanceController = exports.EffectPerformanceRecords = exports.EffectPerformanceStatistics = undefined;
const UE = require("ue");
const Log_1 = require("../Common/Log");
class EffectPerformanceStatistics {
  constructor() {
    this.Frame = undefined;
    this.StartTime = -1;
    this.EndTime = -1;
    this.ParticleCount = 0;
    this.EmitterCount = 0;
    this.Type = "None";
  }
}
exports.EffectPerformanceStatistics = EffectPerformanceStatistics;
class EffectPerformanceRecords {
  constructor() {
    this.TickCount = 0;
    this.Duration = 0;
    this.Records = [];
  }
}
exports.EffectPerformanceRecords = EffectPerformanceRecords;
class PerformanceController {
  static get IsEntityTickPerformanceTest() {
    return PerformanceController.fY;
  }
  static get IsEntityPerformanceTest() {
    return PerformanceController.fY || PerformanceController.pY;
  }
  static get IsPlayerPerformanceTest() {
    return PerformanceController.dih;
  }
  static SetEntityTickPerformanceTest(t) {
    if (this.fY = t) {
      this.EY = new Map();
      this.SY = new Map();
      this.yY = new Map();
      this.IY = UE.KismetSystemLibrary.GetFrameCount();
    } else {
      this.EY.clear();
      this.SY.clear();
      this.yY.clear();
      this.EY = undefined;
      this.SY = undefined;
      this.yY = undefined;
    }
  }
  static SetPlayerTickPerformanceTest(t) {
    if (PerformanceController.dih = t) {
      this.EY = new Map();
      this.SY = new Map();
      this.yY = new Map();
      this.IY = UE.KismetSystemLibrary.GetFrameCount();
    } else {
      this.EY.clear();
      this.SY.clear();
      this.yY.clear();
      this.EY = undefined;
      this.SY = undefined;
      this.yY = undefined;
    }
  }
  static SetEntityGpuPerformanceTest(t) {
    this.pY = t;
  }
  static CollectPlayerSkeletalTickPerformanceInfo(t, e, i, r) {
    var s;
    if (!r || !(r < this.IY)) {
      if (this.TY && this.LY !== -1 && this.LY === e) {
        this.DY ||= new Map();
        r = UE.KismetSystemLibrary.GetFrameCount();
        if (e = this.DY.get(t)) {
          if (r === e[0]) {
            e[1] += i;
          } else {
            s = this.UY.get(1);
            this.RY(t + "." + s, 1, e[1], e[0]);
            e[0] = r;
            e[1] = i;
          }
        } else {
          this.DY.set(t, [r, i, 1, false]);
        }
      }
    }
  }
  static CollectTickPerformanceInfo(t, e, i, r = 1, s) {
    if (!s || !(s < this.IY)) {
      this.EY ||= new Map();
      s = this.EY.get(t);
      if (s) {
        s[0] = s[0] + (e ? 1 : 0);
        s[1] = s[1] + i;
      } else {
        this.EY.set(t, [1, i]);
      }
      if (this.TY) {
        if (t.includes("EntityTick")) {
          e = Number(t.slice(10));
          if (this.LY !== -1 && this.LY !== e) {
            return;
          }
        }
        this.DY ||= new Map();
        var o;
        var s = t.replace(/\d/g, "");
        var e = UE.KismetSystemLibrary.GetFrameCount();
        if (r === 0) {
          this.RY(s + "." + this.UY.get(r), r, i, e);
        } else if (t = this.DY.get(s)) {
          if (e === t[0]) {
            t[1] += i;
          } else {
            o = this.UY.get(r);
            this.RY(s + "." + o, r, t[1], t[0]);
            t[0] = e;
            t[1] = i;
            this.RY("GameThread.Tick", r, UE.KuroRenderingRuntimeBPPluginBPLibrary.GetGameThreadTime(), t[0]);
          }
        } else {
          this.DY.set(s, [e, i, r, false]);
        }
      }
    }
  }
  static ConsumeTickTime(t) {
    var e;
    var i;
    var r = PerformanceController.EY.get(t);
    if (r) {
      e = r[0];
      r = r[1];
      i = e === 0 ? 0 : r / e;
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Temp", 35, "ConsumeTickTime", ["time", r], ["count", e]);
      }
      PerformanceController.EY.delete(t);
      return i;
    } else {
      return 0;
    }
  }
  static CollectComponentTickPerformanceInfo(t, e, i, r) {
    this.yY ||= new Map();
    var s;
    var o = this.yY.get(t);
    if (o) {
      if (s = o.get(e)) {
        s[0] = s[0] + (i ? 1 : 0);
        s[1] = s[1] + r;
      } else {
        o.set(e, [1, r]);
      }
    } else {
      (i = new Map()).set(e, [1, r]);
      this.yY.set(t, i);
    }
    if (!!this.TY && (this.LY === -1 || this.LY === t)) {
      this.DY ||= new Map();
      o = this.DY.get(s = "Entity.Tick." + e);
      i = UE.KismetSystemLibrary.GetFrameCount();
      if (o) {
        if (i === o[0]) {
          o[1] += r;
        } else {
          this.RY(s, 1, o[1], o[0]);
          o[0] = i;
          o[1] = r;
        }
      } else {
        this.DY.set(s, [i, r, 1, true]);
      }
    }
  }
  static ConsumeComponentTickTime(t) {
    var e = this.yY.get(t);
    if (e) {
      this.AY ||= new Map();
      this.AY.clear();
      let t = 0;
      for (const s of e.keys()) {
        var i = e.get(s);
        var r = i[0] === 0 ? 0 : i[1] / i[0];
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Temp", 35, "ConsumeComponentTickTime", ["comp", s], ["time", i[1]], ["count", i[0]]);
        }
        t += i[1];
        this.AY.set(s, r.toFixed(3));
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Temp", 35, "ConsumeComponentTickTimeMax", ["mm", t]);
      }
      e.clear();
      return this.AY;
    }
  }
  static CollectEffectTickPerformanceInfo(t, e, i, r, s, o, n, h) {
    var c;
    var a;
    if (!(o < this.IY) && !!this.UY) {
      this.SY ||= new Map();
      o = t.slice(0, t.indexOf("."));
      t = this.SY.get(o);
      c = r - i;
      (a = new EffectPerformanceStatistics()).Frame = UE.KismetSystemLibrary.GetFrameCount();
      a.StartTime = i;
      a.EndTime = r;
      a.ParticleCount = n ?? 0;
      a.EmitterCount = h ?? 0;
      a.Type = this.UY.get(s);
      if (t) {
        t.TickCount = t.TickCount + (e ? 1 : 0);
        t.Duration = t.Duration + c;
        t.Records.push(a);
      } else {
        (i = new EffectPerformanceRecords()).TickCount = 1;
        i.Duration = c;
        i.Records.push(a);
        this.SY.set(o, i);
      }
      if (this.TY) {
        r = this.UY.get(s);
        this.RY(`EffectHandle.${r}.${o}`, s, c);
      }
    }
  }
  static ConsumeEffectTickTime() {
    if (this.SY) {
      this.PY ||= new Map();
      this.PY.clear();
      for (const s of this.SY.keys()) {
        var e = this.SY.get(s);
        var i = e.TickCount === 0 ? 0 : e.Duration / e.TickCount;
        var r = [];
        r.push(["Score", i.toFixed(3)]);
        r.push(["TickCount", e.TickCount.toString()]);
        r.push(["Duration", e.Duration.toFixed(3)]);
        let t = 0;
        for (const o of e.Records) {
          r.push(["Frame_" + t, o.Frame.toString()]);
          r.push(["StartTime_" + t, o.StartTime.toFixed(3)]);
          r.push(["EndTime_" + t, o.EndTime.toFixed(3)]);
          r.push(["ParticleCount_" + t, o.ParticleCount.toString()]);
          r.push(["EmitterCount_" + t, o.EmitterCount.toString()]);
          r.push(["Type_" + t, o.Type]);
          ++t;
        }
        this.PY.set(s, r);
      }
      this.SY.clear();
      return this.PY;
    }
  }
  static SetStatisticsMode(t, e, i = "") {
    if (this.TY = t) {
      this.xY = new UE.FName(i);
      this.IY = UE.KismetSystemLibrary.GetFrameCount();
      this.wY = this.IY;
      this.LY = e;
      this.UY = new Map([[0, "Create"], [1, "Tick"], [2, "Other"]]);
    } else {
      if (this.DY) {
        for (const o of this.DY.keys()) {
          var r = this.DY.get(o);
          var s = this.UY.get(r[2]);
          this.RY(r[3] ? "" + o : o + "." + s, r[2], r[1], r[0]);
        }
        this.DY.clear();
        this.DY = undefined;
      }
      this.UY = undefined;
      this.xY = undefined;
      this.LY = -1;
    }
  }
  static RY(t, e, i, r) {
    var s;
    if (this.xY && ((s = UE.KismetSystemLibrary.GetFrameCount()) !== this.wY && (this.wY = s), UE.PerformanceStatisticsLibrary.AddStatistics(this.xY, Number(r || s), t, e, i), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Performance", 35, "AddStatistics", ["SectionName", this.xY], ["Frame", r || s], ["Tag", t], ["MeasureMode", this.UY.get(e)], ["Time", i]);
    }
  }
}
(exports.PerformanceController = PerformanceController).IsInAnyEntitySkillTickTest = false;
PerformanceController.IsOpenCatchWorldEntity = false;
PerformanceController.fY = false;
PerformanceController.dih = false;
PerformanceController.pY = false;
PerformanceController.EY = undefined;
PerformanceController.yY = undefined;
PerformanceController.SY = undefined;
PerformanceController.PY = undefined;
PerformanceController.AY = undefined;
PerformanceController.TY = false;
PerformanceController.xY = undefined;
PerformanceController.LY = -1;
PerformanceController.wY = undefined;
PerformanceController.DY = undefined;
PerformanceController.UY = undefined;
PerformanceController.IY = undefined; //# sourceMappingURL=PerformanceController.js.map