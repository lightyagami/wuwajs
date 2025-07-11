"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceSystem = exports.ASYNC_LOAD_TIMEOUT_MS = exports.SYNC_LOAD_PRIORITY = exports.WAIT_RENDER_ASSET_DURATION = exports.RENDER_ASSETS_TIMEOUT = exports.RENDER_ASSETS_RADIUS = exports.STREAMING_SOURCE_RADIUS = exports.CHECK_RENDERASSETS_INTERVAL = exports.CHECK_STREAMING_INTERVAL = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../Common/Info");
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const PriorityQueue_1 = require("../Container/PriorityQueue");
const ClassDefine_1 = require("../Define/ClassDefine");
const GameBudgetInterfaceController_1 = require("../GameBudgetAllocator/GameBudgetInterfaceController");
const TimeLimit_1 = require("../Performance/TimeLimit");
const TimerSystem_1 = require("../Timer/TimerSystem");
exports.CHECK_STREAMING_INTERVAL = 100;
exports.CHECK_RENDERASSETS_INTERVAL = 100;
exports.STREAMING_SOURCE_RADIUS = 7000;
exports.RENDER_ASSETS_RADIUS = 7000;
exports.RENDER_ASSETS_TIMEOUT = 40000;
exports.WAIT_RENDER_ASSET_DURATION = 42;
exports.SYNC_LOAD_PRIORITY = 1073741823;
exports.ASYNC_LOAD_TIMEOUT_MS = 60000;
const RESET_TIME = 180000;
const RESET_TIME_PIE = 900000;
class LoadCallbackTask {
  constructor(e, s, t, o) {
    this.Id = e;
    this.Priority = s;
    this.TimeoutTimer = t;
    this.Callback = o;
  }
}
class ResourceSystem {
  static GetLoadMode() {
    return this.Iwa;
  }
  static IsLoadingReasonNotEmpty(e) {
    return ResourceSystem.uJ.get(e);
  }
  static Initialize() {
    (0, puerts_1.registerLoadType)(e => {
      ResourceSystem.jY(e);
    });
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
  static eJ(s, t) {
    if (s.size === 0) {
      t?.();
    }
    const o = Date.now();
    for (const r of s) {
      ResourceSystem.LoadTypeAsync(r, () => {
        var e;
        s.delete(r);
        if (s.size === 0) {
          e = Date.now();
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Resource", 1, "预加载类型结束 ", ["count", s.size], ["cost", e - o]);
          }
          t?.();
        }
      });
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
    ResourceSystem.eJ(s, e);
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
    ResourceSystem.eJ(s, e);
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
        var o = ResourceSystem.oJ(s, t);
        if (o) {
          var r = t[0];
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Resource", 1, "运行时加载类型", ["name", s], ["type", r], ["path", o]);
          }
          let e = undefined;
          switch (r) {
            case 0:
              e = ResourceSystem.Load(o, UE.BlueprintGeneratedClass);
              break;
            case 1:
              e = ResourceSystem.Load(o, UE.UserDefinedStruct);
              break;
            case 2:
              e = ResourceSystem.Load(o, UE.UserDefinedEnum);
              break;
            default:
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Resource", 1, "加载类型错误", ["name", s], ["type", r], ["path", o]);
              }
              return;
          }
          if (e) {
            ResourceSystem.XY.set(s, e);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Resource", 1, "加载类型失败", ["name", s], ["type", r], ["path", o]);
          }
        }
      }
    }
  }
  static LoadTypeAsync(t, o) {
    if (ResourceSystem.XY.has(t)) {
      o();
    } else {
      var e = ResourceSystem.iJ(t);
      if (e) {
        var s = ResourceSystem.oJ(t, e);
        if (s) {
          const a = e[0];
          var r = (e, s) => {
            if (e) {
              ResourceSystem.XY.set(t, e);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Resource", 1, "异步加载类型失败", ["name", t], ["type", a], ["path", s]);
            }
            o();
          };
          switch (a) {
            case 0:
              ResourceSystem.LoadAsync(s, UE.BlueprintGeneratedClass, r, 100);
              break;
            case 1:
              ResourceSystem.LoadAsync(s, UE.UserDefinedStruct, r, 100);
              break;
            case 2:
              ResourceSystem.LoadAsync(s, UE.UserDefinedEnum, r, 100);
              break;
            default:
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Resource", 1, "异步加载类型错误", ["name", t], ["type", a], ["path", s]);
              }
              o();
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
    var o = ResourceSystem.WY.GetAsset(s);
    ResourceSystem.WY.Release(s);
    if (ResourceSystem.sJ(o, e, t)) {
      return o;
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
  static Load(e, s) {
    ResourceSystem.aJ.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph("RS.Load-" + e);
    t.Start();
    var s = ResourceSystem.nJ(e, s);
    if (s) {
      var o = ++ResourceSystem.hJ;
      if (ResourceSystem.WY.LoadWithId(e, o) !== -1) {
        o = ResourceSystem.Ed(e, o, s);
        t.Stop();
        ResourceSystem.aJ.Stop();
        return o;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Resource", 1, "资源加载异常", ["path", e]);
      }
    }
    t.Stop();
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
  static LoadAsync(e, s, t, o = 100) {
    ResourceSystem.lJ.Start();
    var r = Stats_1.Stat.CreateNoFlameGraph("RS.LoadAsync-" + e);
    r.Start();
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Resource", 1, "资源加载回调方法为空", ["path", e]);
      }
      r.Stop();
      ResourceSystem.lJ.Stop();
      return ResourceSystem.InvalidId;
    }
    if (o < 100 || o >= 106) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Resource", 1, "资源加载优先级错误", ["path", e], ["priority", o]);
      }
      r.Stop();
      ResourceSystem.lJ.Stop();
      return ResourceSystem.InvalidId;
    }
    let a = ++ResourceSystem.hJ;
    const c = undefined;
    const m = ResourceSystem.nJ(e, s);
    if (!m) {
      ResourceSystem.zY.Push(new LoadCallbackTask(a, o, undefined, () => {
        ResourceSystem.bxa(t, undefined, e, c);
      }));
      r.Stop();
      ResourceSystem.lJ.Stop();
      return ResourceSystem.InvalidId;
    }
    switch (ResourceSystem.WY.LoadAsyncWithId(e, a, o)) {
      case -1:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Resource", 1, "资源加载错误", ["path", e]);
        }
        ResourceSystem.zY.Push(new LoadCallbackTask(a, o, undefined, () => {
          ResourceSystem.bxa(t, undefined, e, c);
        }));
        a = ResourceSystem.InvalidId;
        break;
      case 0:
        {
          const i = TimerSystem_1.GameplayTimerSystem.Delay(() => {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Resource", 30, "资源加载超时", ["path", e]);
            }
          }, exports.ASYNC_LOAD_TIMEOUT_MS);
          ResourceSystem.Bxa.set(a, new LoadCallbackTask(a, o, i, () => {
            if (i?.Valid()) {
              TimerSystem_1.GameplayTimerSystem.Remove(i);
            }
            ResourceSystem.bxa(t, ResourceSystem.Ed(e, a, m), e, c);
          }));
        }
        break;
      case 1:
        ResourceSystem.zY.Push(new LoadCallbackTask(a, o, undefined, () => {
          ResourceSystem.bxa(t, ResourceSystem.Ed(e, a, m), e, c);
        }));
        ResourceSystem.UpdateDelayCallback(false);
    }
    r.Stop();
    ResourceSystem.lJ.Stop();
    return a;
  }
  static bxa(e, s, t, o) {
    var r = cpp_1.KuroTime.GetMicroseconds64();
    ResourceSystem._J.Start();
    o?.Start();
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
    o?.Stop();
    ResourceSystem._J.Stop();
    e = cpp_1.KuroTime.GetMicroseconds64();
    ResourceSystem.YY.AddCost(e - r);
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
  static SetLoadModeInLoading(e, s) {
    var t;
    if (s && s.length !== 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 4, "[SetLoadMode]InLoading", ["Reason", s]);
      }
      if (ResourceSystem.uJ.has(s)) {
        t = ResourceSystem.uJ.get(s);
        ResourceSystem.uJ.set(s, ++t);
      } else {
        ResourceSystem.uJ.set(s, 1);
        if (!(ResourceSystem.uJ.size > 1)) {
          if (ResourceSystem.FUa) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("GameMode", 38, "进入 LoadModeInLoading 忽略，因为处于强制游戏模式中。");
            }
          } else {
            this.SFa(e);
          }
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GameMode", 3, "SetLoadModeInLoading reason 为空");
    }
  }
  static SetLoadModeInGame(e, s) {
    var t = ResourceSystem.uJ.get(s);
    if (t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 4, "[SetLoadMode]:InGame", ["Reason", s]);
      }
      if (t > 1) {
        ResourceSystem.uJ.set(s, t - 1);
      } else {
        ResourceSystem.uJ.delete(s);
      }
      if (!(ResourceSystem.uJ.size > 0)) {
        if (ResourceSystem.FUa) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("GameMode", 38, "退出 LoadModeInLoading 忽略，因为处于强制游戏模式中。");
          }
        } else {
          this.EFa(e);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GameMode", 3, "SetLoadModeInGame reason 不成对", ["Reason", s], ["Count", t]);
    }
  }
  static SetForceLoadModeInGame(e, s) {
    if (ResourceSystem.FUa = s) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("GameMode", 38, "开启 ForceLoadModeInGame");
      }
      this.EFa(e);
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("GameMode", 38, "退出 ForceLoadModeInGame");
      }
      if (ResourceSystem.uJ.size > 0) {
        this.SFa(e);
      }
    }
  }
  static EFa(e) {
    ResourceSystem.mJ.Start();
    cpp_1.FKuroPerfSightHelper.EndExtTag("InLoadingMode");
    if (Info_1.Info.IsPlayInEditor) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.AsyncLoadingTimeLimit 20");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.LevelStreamingActorsUpdateTimeLimit 20");
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.AsyncLoadingTimeLimit 5");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.LevelStreamingActorsUpdateTimeLimit 5");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "wp.Runtime.MaxLoadingStreamingCells 4");
    UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "wp.Runtime.BlockOnSlowStreaming 0");
    ResourceSystem.SetCallbackTimeLimit(5);
    GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateMinUpdateFifoBudgetTime(3);
    if (this.Ska) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Ska);
      this.Ska = undefined;
    }
    this.Iwa = 2;
    ResourceSystem.mJ.Stop();
  }
  static SFa(e) {
    ResourceSystem.cJ.Start();
    cpp_1.FKuroPerfSightHelper.BeginExtTag("InLoadingMode");
    if (Info_1.Info.IsPlayInEditor) {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.AsyncLoadingTimeLimit 5000");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.LevelStreamingActorsUpdateTimeLimit 1000");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "wp.Runtime.MaxLoadingStreamingCells 200");
    } else {
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.AsyncLoadingTimeLimit 50");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "s.LevelStreamingActorsUpdateTimeLimit 1000");
      UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "wp.Runtime.MaxLoadingStreamingCells 40");
    }
    UE.KismetSystemLibrary.ExecuteConsoleCommand(e, "wp.Runtime.BlockOnSlowStreaming 0");
    ResourceSystem.SetCallbackTimeLimit(0);
    GameBudgetInterfaceController_1.GameBudgetInterfaceController.UpdateMinUpdateFifoBudgetTime(9999);
    if (this.Ska) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Ska);
    }
    e = Info_1.Info.IsPlayInEditor ? RESET_TIME_PIE : RESET_TIME;
    this.Ska = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.Ska = undefined;
      this.ResetLoadMode(Info_1.Info.GameInstance);
    }, e, undefined, "ResetLoadModeTimer", false);
    this.Iwa = 1;
    ResourceSystem.cJ.Stop();
  }
  static ResetLoadMode(e, s = false) {
    if (this.Iwa !== 2) {
      if (s) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GameMode", 4, "处于InLoading加载模式，进入战斗保底", ["LoadingReasonMap", this.uJ]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameMode", 4, "长时间处于InLoading加载模式，触发保底", ["LoadingReasonMap", this.uJ]);
      }
      ResourceSystem.Eka();
      ResourceSystem.EFa(e);
    }
  }
  static Eka() {
    ResourceSystem.uJ.clear();
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
ResourceSystem.FUa = false;
ResourceSystem.XY = new Map();
ResourceSystem.aJ = Stats_1.Stat.Create("RS.Load");
ResourceSystem.lJ = Stats_1.Stat.Create("RS.LoadASync");
ResourceSystem._J = Stats_1.Stat.Create("RS.LoadAsyncCallback");
ResourceSystem.JY = Stats_1.Stat.Create("RS.UpdateDelayCallback");
ResourceSystem.cJ = Stats_1.Stat.Create("RS.SetLoadModeInLoading");
ResourceSystem.mJ = Stats_1.Stat.Create("RS.SetLoadModeInGame");
ResourceSystem.hJ = 0;
ResourceSystem.$Y = false;
ResourceSystem.InvalidId = -1;
ResourceSystem.uJ = new Map();
ResourceSystem.Ska = undefined;
ResourceSystem.Iwa = 0;
ResourceSystem.Initialize(); //# sourceMappingURL=ResourceSystem.js.map