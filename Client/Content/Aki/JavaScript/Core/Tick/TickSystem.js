"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TickSystem = exports.Ticker = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const Time_1 = require("../Common/Time");
const PerfSight_1 = require("../PerfSight/PerfSight");
const SECOND_TO_MILLISECOND = 1000;
class Ticker {
  constructor(t, i, e, s, r, c = 0, o = false, a = false) {
    this.Id = t;
    this.Handle = i;
    this.Group = e;
    this.Priority = s;
    this.Name = r;
    this.TickIntervalMs = c;
    this.TickEvenPaused = o;
    this.IgnoreSelfCenterMode = a;
    this.Count = 0;
    this.CoolDown = 0;
    this.Pause = false;
    this.StatObj = undefined;
    this.StatObj = Stats_1.Stat.CreateNoFlameGraph("In TickSystem." + r);
  }
}
exports.Ticker = Ticker;
class TickSystem {
  constructor() {}
  static get IsPaused() {
    return TickSystem.dJ && Time_1.Time.Frame > TickSystem.PausedFrame;
  }
  static set IsPaused(t) {
    if (TickSystem.dJ = t) {
      TickSystem.PausedFrame = Time_1.Time.Frame;
    }
  }
  static get IsSetPaused() {
    return TickSystem.dJ;
  }
  static Initialize(t) {
    this.CJ = new UE.KuroTickManager(t);
    this.gJ.clear();
    this.fJ.clear();
  }
  static Destroy() {
    for (var [, t] of this.pJ) {
      (0, puerts_1.releaseManualReleaseDelegate)(t);
    }
    this.CJ.ClearTick();
  }
  static Has(t) {
    return t > 0 && this.gJ.has(t);
  }
  static Add(i, e, s = 0, c = false, o = 0, a = false) {
    if (i) {
      var h = ++this.o6;
      var e = new Ticker(h, i, s, o, e, 0, c, a);
      this.gJ.set(h, e);
      let t = this.fJ.get(s);
      for (t || (t = [], this.fJ.set(s, t)); t.length <= o;) {
        t.push(undefined);
      }
      let r = t[o];
      if (r) {
        r.add(e);
      } else {
        (r = new Set()).add(e);
        t[o] = r;
        this.pJ.set(s, c = t => {
          var i;
          var e = t * SECOND_TO_MILLISECOND;
          for (const s of r) {
            if (!this.IsPaused || !!s.TickEvenPaused) {
              i = s.IgnoreSelfCenterMode ? e * Time_1.Time.InverseSelfCenteredTimeDilation : e;
              this.vJ(s, i);
            }
          }
        });
        this.CJ.AddTick(s, (0, puerts_1.toManualReleaseDelegate)(c), o);
      }
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Tick", 1, "处理方法不存在", ["handle", i]);
    }
  }
  static Remove(t) {
    var i = this.gJ.get(t);
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Tick", 1, "编号不存在", ["id", t]);
      }
      return false;
    }
    this.gJ.delete(t);
    var e = this.fJ.get(i.Group);
    if (e) {
      if (e.length <= i.Priority || !e[i.Priority]) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Tick", 6, "优先级不存在", ["id", t], ["group", i.Group], ["priority", i.Priority]);
        }
        return false;
      } else {
        (e = e[i.Priority]).delete(i);
        if (e.size === 0) {
          this.fJ.delete(i.Group);
          e = this.pJ.get(i.Group);
          this.pJ.delete(i.Group);
          this.CJ.RemoveTick(i.Group);
          (0, puerts_1.releaseManualReleaseDelegate)(e);
        }
        return true;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Tick", 1, "分组不存在", ["id", t], ["group", i.Group]);
      }
      return false;
    }
  }
  static Pause(t) {
    var i = this.gJ.get(t);
    if (i) {
      return i.Pause = true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Tick", 1, "编号不存在", ["id", t]);
      }
      return false;
    }
  }
  static Resume(t) {
    var i = this.gJ.get(t);
    if (i) {
      return !(i.Pause = false);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Tick", 1, "编号不存在", ["id", t]);
      }
      return false;
    }
  }
  static vJ(i, e) {
    if (!i.Pause) {
      let t = e;
      if (i.TickIntervalMs > 0) {
        i.CoolDown += e;
        if (i.CoolDown < i.TickIntervalMs) {
          return;
        }
        e = i.CoolDown % i.TickIntervalMs;
        t = i.CoolDown - e;
        i.CoolDown = e;
      }
      i.Count += 1;
      i.StatObj?.Start();
      var s;
      var r;
      var c;
      var e = cpp_1.KuroTime.GetMilliseconds64();
      try {
        i.Handle(t);
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Tick", 1, "处理方法执行异常", t, ["id", i.Id], ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Tick", 1, "处理方法执行异常", ["id", i.Id], ["error", t]);
        }
      }
      if (PerfSight_1.PerfSight.IsEnable && i.Group === 0 && (c = 1000 / UE.KuroRenderingRuntimeBPPluginBPLibrary.GetMaxFps(), s = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetGameThreadTime(), r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRenderThreadTime(), c * 2 < s || c * 2 < r)) {
        c = cpp_1.KuroTime.GetMilliseconds64() - e;
        if (i.Name === "Core") {
          cpp_1.FKuroPerfSightHelper.PostValueFloat1("CustomPerformance", "[PrePhysics]TickSystem_Core", c);
        } else if (i.Name === "Game") {
          cpp_1.FKuroPerfSightHelper.PostValueFloat1("CustomPerformance", "[PrePhysics]TickSystem_Game", c);
          cpp_1.FKuroPerfSightHelper.PostValueFloat1("CustomPerformance", "[PrePhysics]TickSystem_GameThreadTime", s);
          cpp_1.FKuroPerfSightHelper.PostValueFloat1("CustomPerformance", "[PrePhysics]TickSystem_RenderThreadTime", r);
          cpp_1.FKuroPerfSightHelper.PostValueFloat1("CustomPerformance", "[PrePhysics]TickSystem_RHIThreadTime", UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIThreadTime());
          cpp_1.FKuroPerfSightHelper.PostValueFloat1("CustomPerformance", "[PrePhysics]TickSystem_PresentTime", UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSwapBufferTime());
        }
      }
      i.StatObj?.Stop();
    }
  }
  static AddTickPrerequisiteActor(t, i, e) {
    this.CJ.AddPrerequisiteActor(t, i, e);
  }
  static RemoveTickPrerequisiteActor(t, i, e) {
    this.CJ.RemovePrerequisiteActor(t, i, e);
  }
  static AddTickPrerequisiteActorComp(t, i, e) {
    this.CJ.AddPrerequisiteActorComponent(t, i, e);
  }
  static RemoveTickPrerequisiteActorComp(t, i, e) {
    this.CJ.RemovePrerequisiteActorComponent(t, i, e);
  }
  static SetSkeletalMeshProxyTickFunction(t, i, e) {
    this.CJ.SetSkeletalMeshProxyTickFunction(t, i, e);
  }
  static CleanSkeletalMeshProxyTickFunction(t) {
    this.CJ.CleanSkeletalMeshProxyTickFunction(t);
  }
  static SetMovementProxyTickFunction(t, i, e) {
    this.CJ.SetCharacterMovementProxyTickFunction(t, i, e);
  }
  static CleanMovementProxyTickFunction(t) {
    this.CJ.CleanCharacterMovementProxyTickFunction(t);
  }
  static SetTickFunctionCompletionCallbackInMainThread(t, i) {
    this.CJ.SetTickFunctionCompletionCallbackInMainThread(t, i);
  }
  static SetGamePrerequisiteTickFunction(t, i) {
    this.CJ.SetGamePrerequisiteTickFunction(t, i);
  }
}
(exports.TickSystem = TickSystem).InvalidId = -1;
TickSystem.dJ = false;
TickSystem.PausedFrame = -1;
TickSystem.o6 = 0;
TickSystem.CJ = undefined;
TickSystem.gJ = new Map();
TickSystem.pJ = new Map();
TickSystem.fJ = new Map(); //# sourceMappingURL=TickSystem.js.map