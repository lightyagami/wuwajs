"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceSystem = exports.ASYNC_LOAD_TIMEOUT_MS = exports.SYNC_LOAD_PRIORITY = exports.WAIT_RENDER_ASSET_DURATION = exports.RENDER_ASSETS_TIMEOUT = exports.RENDER_ASSETS_RADIUS = exports.STREAMING_SOURCE_RADIUS = exports.CHECK_RENDERASSETS_INTERVAL = exports.CHECK_STREAMING_INTERVAL = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const PriorityQueue_1 = require("../Container/PriorityQueue");
const ClassDefine_1 = require("../Define/ClassDefine");
const TimeLimit_1 = require("../Performance/TimeLimit");
const TimerSystem_1 = require("../Timer/TimerSystem");
const FNameUtil_1 = require("../Utils/FNameUtil");
exports.CHECK_STREAMING_INTERVAL = 100;
exports.CHECK_RENDERASSETS_INTERVAL = 100;
exports.STREAMING_SOURCE_RADIUS = 7000;
exports.RENDER_ASSETS_RADIUS = 7000;
exports.RENDER_ASSETS_TIMEOUT = 40000;
exports.WAIT_RENDER_ASSET_DURATION = 42;
exports.SYNC_LOAD_PRIORITY = 1073741823;
exports.ASYNC_LOAD_TIMEOUT_MS = 60000;
class LoadCallbackTask {
  constructor(e, s, t, r) {
    this.Id = e;
    this.Priority = s;
    this.TimeoutTimer = t;
    this.Callback = r;
  }
}
class ResourceSystem {
  static IsMemoryTagOpen() {
    return this.Sem;
  }
  static Initialize() {
    (0, puerts_1.registerLoadType)(e => {
      ResourceSystem.jY(e);
    });
    ResourceSystem.Sem = !cpp_1.KuroApplication.IsBuildShipping();
    ResourceSystem.WY = new UE.KuroResourceManager();
    ResourceSystem.WY.LoadResourceDelegate.Bind(e => {
      ResourceSystem.KY(e);
    });
    ResourceSystem.Bxa.clear();
    ResourceSystem.XY.clear();
    ResourceSystem.$Y = cpp_1.KuroApplication.IsAsyncLoadingThreadEnabled();
  }
  static SetCallbackTimeLimit(e) {
    ResourceSystem.YY.TimeLimit = e * 1000;
  }
  static UpdateDelayCallback(e = true) {
    ResourceSystem.JY.Start();
    if (!ResourceSystem.LBn) {
      for (ResourceSystem.LBn = true; !ResourceSystem.zY.Empty && !ResourceSystem.YY.IsTimeLimitExceeded();) {
        var s = ResourceSystem.zY.Pop();
        if (ResourceSystem.ZY.delete(s.Id)) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Resource", 1, "预加载回调执行失败，任务已被取消", ["ResourceSystem.DelayTaskQueue.Empty", ResourceSystem.zY.Empty], ["IsTimeLimitExceeded", ResourceSystem.YY.IsTimeLimitExceeded()]);
          }
        } else {
          s.Callback();
        }
      }
      if (e) {
        ResourceSystem.YY.ResetCost();
      }
      ResourceSystem.LBn = false;
    }
    ResourceSystem.JY.Stop();
  }
  static eJ(s, t, e = "js_undefined") {
    if (s.size === 0) {
      t?.();
    }
    const r = Date.now();
    for (const o of s) {
      ResourceSystem.LoadTypeAsync(o, () => {
        var e;
        s.delete(o);
        if (s.size === 0) {
          e = Date.now();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Resource", 1, "预加载类型结束 ", ["count", s.size], ["cost", e - r]);
          }
          t?.();
        }
      }, e);
    }
  }
  static PreloadSimpleTypes(e = undefined) {
    var s = new Set();
    for (const t in ClassDefine_1.typeDefined) {
      if (!ResourceSystem.XY.has(t)) {
        if (ClassDefine_1.typeDefined[t][2] === 0 && ClassDefine_1.typeDefined[t][0] !== 0) {
          s.add(t);
        }
      }
    }
    ResourceSystem.eJ(s, e, "PreloadSimpleTypes");
  }
  static PreloadOtherTypes(e = undefined) {
    var s = new Set();
    for (const t in ClassDefine_1.typeDefined) {
      if (!ResourceSystem.XY.has(t)) {
        if (ClassDefine_1.typeDefined[t][2] === 0) {
          s.add(t);
        }
      }
    }
    ResourceSystem.eJ(s, e, "PreloadOtherTypes");
  }
  static iJ(e) {
    var s = ClassDefine_1.typeDefined[e];
    if (!s) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Resource", 1, "该类型没有注册", ["name", e]);
      }
    }
    return s;
  }
  static oJ(e, s) {
    var t = s[1];
    if (t) {
      if (t.length !== 0) {
        return t;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Resource", 1, "加载类型路径长度为零", ["name", e], ["type", s[0]]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Resource", 1, "加载类型路径为空", ["name", e], ["type", s[0]]);
    }
  }
  static jY(s) {
    if (!ResourceSystem.XY.has(s)) {
      var t = ResourceSystem.iJ(s);
      if (t) {
        if (t[2] === 1 && Log_1.Log.CheckError()) {
          Log_1.Log.Error("Resource", 62, "异步加载的类型不允许走同步加载，请先异步加载", ["type", s]);
        }
        var r = ResourceSystem.oJ(s, t);
        if (r) {
          var o = t[0];
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Resource", 1, "运行时加载类型", ["name", s], ["type", o], ["path", r]);
          }
          let e = undefined;
          switch (o) {
            case 0:
              e = ResourceSystem.Load(r, UE.BlueprintGeneratedClass);
              break;
            case 1:
              e = ResourceSystem.Load(r, UE.UserDefinedStruct);
              break;
            case 2:
              e = ResourceSystem.Load(r, UE.UserDefinedEnum);
              break;
            default:
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Resource", 1, "加载类型错误", ["name", s], ["type", o], ["path", r]);
              }
              return;
          }
          if (e) {
            ResourceSystem.XY.set(s, e);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Resource", 1, "加载类型失败", ["name", s], ["type", o], ["path", r]);
          }
        }
      }
    }
  }
  static GetLoadedType(e) {
    if (!ResourceSystem.XY.has(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Resource", 1, "获取已加载类型失败，调用前请先加载", ["name", e]);
      }
    }
    return ResourceSystem.XY.get(e);
  }
  static LoadTypeAsync(t, r, e = "js_undefined") {
    if (ResourceSystem.XY.has(t)) {
      r();
    } else {
      var s = ResourceSystem.iJ(t);
      if (s) {
        var o = ResourceSystem.oJ(t, s);
        if (o) {
          const a = s[0];
          var c = (e, s) => {
            if (e) {
              ResourceSystem.XY.set(t, e);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Resource", 1, "异步加载类型失败", ["name", t], ["type", a], ["path", s]);
            }
            r();
          };
          switch (a) {
            case 0:
              ResourceSystem.LoadAsync(o, UE.BlueprintGeneratedClass, c, 100, e);
              break;
            case 1:
              ResourceSystem.LoadAsync(o, UE.UserDefinedStruct, c, 100, e);
              break;
            case 2:
              ResourceSystem.LoadAsync(o, UE.UserDefinedEnum, c, 100, e);
              break;
            default:
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Resource", 1, "异步加载类型错误", ["name", t], ["type", a], ["path", o]);
              }
              r();
          }
        }
      }
    }
  }
  static KY(e) {
    var s = ResourceSystem.Bxa.get(e);
    if (s) {
      ResourceSystem.Bxa.delete(e);
      ResourceSystem.zY.Push(s);
      ResourceSystem.UpdateDelayCallback(false);
    }
  }
  static rJ(e) {
    if (e) {
      if (e.length === 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Resource", 1, "路径长度为零", ["path", e]);
        }
        return false;
      } else {
        return !!e.startsWith("/") || (Log_1.Log.CheckError() && Log_1.Log.Error("Resource", 1, "传入资源路径不符合规范", ["path", e]), false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Resource", 1, "路径为空");
      }
      return false;
    }
  }
  static nJ(e, s) {
    if (ResourceSystem.rJ(e)) {
      if (s) {
        var t = s.StaticClass();
        if (t) {
          if (t.IsValid()) {
            return t;
          }
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Resource", 1, "传入类型获取到的 UE Class 无效", ["path", e], ["type", s]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Resource", 1, "传入类型获取到的 UE Class 为空", ["path", e], ["type", s]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Resource", 1, "传入类型为空", ["path", e]);
      }
    }
  }
  static Ed(e, s, t) {
    var r = ResourceSystem.WY.GetAsset(s);
    ResourceSystem.WY.Release(s);
    if (ResourceSystem.sJ(r, e, t)) {
      return r;
    }
  }
  static sJ(e, s, t) {
    if (e) {
      if (e.IsValid()) {
        return !!e.IsA(t) || (Log_1.Log.CheckError() && Log_1.Log.Error("Resource", 1, "传入类型与资产类型不匹配", ["path", s], ["type", t.GetName()], ["asset", e.GetClass().GetName()]), false);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Resource", 1, "资源加载资产无效", ["path", s]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Resource", 1, "资源加载资产为空", ["path", s]);
      }
      return false;
    }
  }
  static Load(s, t, r = "js_undefined") {
    ResourceSystem.aJ.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph("RS.Load-" + s);
    o.Start();
    var t = ResourceSystem.nJ(s, t);
    if (t) {
      var c = ++ResourceSystem.hJ;
      let e = -1;
      if ((e = ResourceSystem.Sem ? (r = FNameUtil_1.FNameUtil.GetDynamicFName(r), ResourceSystem.WY.LoadWithIdAndTag(s, c, r)) : ResourceSystem.WY.LoadWithId(s, c)) !== -1) {
        r = ResourceSystem.Ed(s, c, t);
        o.Stop();
        ResourceSystem.aJ.Stop();
        return r;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Resource", 1, "资源加载异常", ["path", s]);
      }
    }
    o.Stop();
    ResourceSystem.aJ.Stop();
  }
  static GetLoadedAsset(e, s) {
    s = ResourceSystem.nJ(e, s);
    if (s) {
      var t = ResourceSystem.WY.GetLoadedAsset(e);
      if (ResourceSystem.sJ(t, e, s)) {
        return t;
      }
    }
  }
  static CheckAssetLoaded(e, s) {
    s = ResourceSystem.nJ(e, s);
    return !!s && !!(e = ResourceSystem.WY.GetLoadedAsset(e))?.IsValid() && !!e.IsA(s);
  }
  static LoadAsync(e, s, t, r = 100, o = "js_undefined") {
    ResourceSystem.lJ.Start();
    var c = Stats_1.Stat.CreateNoFlameGraph("RS.LoadAsync-" + e);
    c.Start();
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Resource", 1, "资源加载回调方法为空", ["path", e]);
      }
      c.Stop();
      ResourceSystem.lJ.Stop();
      return ResourceSystem.InvalidId;
    }
    if (r < 100 || r >= 106) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Resource", 1, "资源加载优先级错误", ["path", e], ["priority", r]);
      }
      c.Stop();
      ResourceSystem.lJ.Stop();
      return ResourceSystem.InvalidId;
    }
    let a = ++ResourceSystem.hJ;
    const u = undefined;
    const m = ResourceSystem.nJ(e, s);
    if (!m) {
      ResourceSystem.zY.Push(new LoadCallbackTask(a, r, undefined, () => {
        ResourceSystem.bxa(t, undefined, e, u);
      }));
      c.Stop();
      ResourceSystem.lJ.Stop();
      return ResourceSystem.InvalidId;
    }
    let y = -1;
    switch (y = ResourceSystem.Sem ? (s = FNameUtil_1.FNameUtil.GetDynamicFName(o), ResourceSystem.WY.LoadAsyncWithIdAndTag(e, a, r, s)) : ResourceSystem.WY.LoadAsyncWithId(e, a, r)) {
      case -1:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Resource", 1, "资源加载错误", ["path", e]);
        }
        ResourceSystem.zY.Push(new LoadCallbackTask(a, r, undefined, () => {
          ResourceSystem.bxa(t, undefined, e, u);
        }));
        a = ResourceSystem.InvalidId;
        break;
      case 0:
        {
          const R = TimerSystem_1.GameplayTimerSystem.Delay(() => {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Resource", 30, "资源加载超时", ["path", e]);
            }
          }, exports.ASYNC_LOAD_TIMEOUT_MS);
          ResourceSystem.Bxa.set(a, new LoadCallbackTask(a, r, R, () => {
            if (R?.Valid()) {
              TimerSystem_1.GameplayTimerSystem.Remove(R);
            }
            ResourceSystem.bxa(t, ResourceSystem.Ed(e, a, m), e, u);
          }));
        }
        break;
      case 1:
        ResourceSystem.zY.Push(new LoadCallbackTask(a, r, undefined, () => {
          ResourceSystem.bxa(t, ResourceSystem.Ed(e, a, m), e, u);
        }));
        ResourceSystem.UpdateDelayCallback(false);
    }
    c.Stop();
    ResourceSystem.lJ.Stop();
    return a;
  }
  static bxa(e, s, t, r) {
    var o = cpp_1.KuroTime.GetMicroseconds64();
    ResourceSystem._J.Start();
    r?.Start();
    try {
      e(s, t);
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Resource", 1, "资源加载回调方法执行异常", e, ["path", t], ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Resource", 1, "资源加载回调方法执行异常", ["path", t], ["error", e]);
      }
    }
    r?.Stop();
    ResourceSystem._J.Stop();
    e = cpp_1.KuroTime.GetMicroseconds64();
    ResourceSystem.YY.AddCost(e - o);
  }
  static CancelAsyncLoad(e) {
    ResourceSystem.WY.Release(e);
    var s = ResourceSystem.Bxa.get(e);
    if (s !== undefined) {
      if (s.TimeoutTimer?.Valid()) {
        TimerSystem_1.GameplayTimerSystem.Remove(s.TimeoutTimer);
      }
      ResourceSystem.Bxa.delete(e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Resource", 30, "取消Loading中的异步加载", ["id", e]);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Resource", 30, "取消等待回调的异步加载", ["id", e]);
      }
      ResourceSystem.ZY.add(e);
    }
  }
  static IsAsyncLoadingThreadEnabled() {
    return ResourceSystem.$Y;
  }
  static DebugDumpLoadingAssets() {
    ResourceSystem.WY.DebugDumpLoadingAssets();
  }
}
(exports.ResourceSystem = ResourceSystem).WY = undefined;
ResourceSystem.Bxa = new Map();
ResourceSystem.zY = new PriorityQueue_1.PriorityQueue((e, s) => e.Priority === s.Priority ? e.Id - s.Id : s.Priority - e.Priority);
ResourceSystem.ZY = new Set();
ResourceSystem.YY = new TimeLimit_1.TimeLimit();
ResourceSystem.LBn = false;
ResourceSystem.XY = new Map();
ResourceSystem.aJ = Stats_1.Stat.Create("RS.Load");
ResourceSystem.lJ = Stats_1.Stat.Create("RS.LoadASync");
ResourceSystem._J = Stats_1.Stat.Create("RS.LoadAsyncCallback");
ResourceSystem.JY = Stats_1.Stat.Create("RS.UpdateDelayCallback");
ResourceSystem.hJ = 0;
ResourceSystem.$Y = false;
ResourceSystem.InvalidId = -1;
ResourceSystem.Sem = true;
ResourceSystem.Initialize(); //# sourceMappingURL=ResourceSystem.js.map