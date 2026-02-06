"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadModeManager = undefined;
const Info_1 = require("../../Common/Info");
const Log_1 = require("../../Common/Log");
const TimerSystem_1 = require("../../Timer/TimerSystem");
const LoadModeHandlers_1 = require("./LoadModeHandlers");
const RESET_TIME = 180000;
const RESET_TIME_PIE = 900000;
const loadModeToDataRecord = {
  None: {
    Priority: -1,
    SharedStayTimeLimit: -1,
    HandlerCtor: LoadModeHandlers_1.LoadModeHandlerNone
  },
  InGame: {
    Priority: 0,
    SharedStayTimeLimit: -1,
    HandlerCtor: LoadModeHandlers_1.LoadModeHandlerInGame
  },
  InGameLoading: {
    Priority: 5,
    get SharedStayTimeLimit() {
      if (Info_1.Info.IsPlayInEditor) {
        return RESET_TIME_PIE;
      } else {
        return RESET_TIME;
      }
    },
    HandlerCtor: LoadModeHandlers_1.LoadModeHandlerInGameLoading
  },
  Loading: {
    Priority: 10,
    get SharedStayTimeLimit() {
      if (Info_1.Info.IsPlayInEditor) {
        return RESET_TIME_PIE;
      } else {
        return RESET_TIME;
      }
    },
    HandlerCtor: LoadModeHandlers_1.LoadModeHandlerLoading
  },
  ForceInGame: {
    Priority: 99,
    SharedStayTimeLimit: -1,
    HandlerCtor: LoadModeHandlers_1.LoadModeHandlerInGame
  }
};
class LoadModeManager {
  static xVg(e) {
    var o = this.BVg.get(loadModeToDataRecord[e].HandlerCtor);
    if (!o) {
      o = new (e = loadModeToDataRecord[e].HandlerCtor)();
      this.BVg.set(e, o);
    }
    return o;
  }
  static kVg() {
    this.qVg(this.OVg());
  }
  static OVg() {
    let e = "InGame";
    for (const o of this.GVg.values()) {
      if (loadModeToDataRecord[o].Priority > loadModeToDataRecord[e].Priority) {
        e = o;
      }
    }
    return e;
  }
  static qVg(e) {
    if (e !== this.Iwa) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("GameMode", 39, "[LoadModeManager] UpdateLoadMode", ["OldLoadMode", this.Iwa], ["NewLoadMode", e]);
      }
      this.xVg(this.Iwa).ExitMode(Info_1.Info.GameInstance);
      this.Iwa = e;
      this.xVg(e).EnterMode(Info_1.Info.GameInstance);
      this.FVg();
    }
  }
  static FVg() {
    this.NVg();
    var e = loadModeToDataRecord[this.Iwa].SharedStayTimeLimit;
    if (e > 0) {
      this.VVg(e);
    }
  }
  static VVg(e) {
    this.NVg();
    this.HVg = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameMode", 39, "[LoadModeManager] 长时间处于限时LoadMode中，触发超时重置保底", ["LoadMode", this.Iwa]);
      }
      this.NVg();
      this.ClearReasonAndResetLoadMode("LoadModeManager内部超时重置保底");
    }, e, undefined, "LoadModeResetTimer", false);
  }
  static NVg() {
    if (this.HVg && TimerSystem_1.GameplayTimerSystem.Has(this.HVg)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.HVg);
    }
    this.HVg = undefined;
  }
  static GetLoadMode() {
    return this.Iwa;
  }
  static SetLoadModeByReason(e, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GameMode", 39, "[LoadModeManager] SetLoadModeByReason", ["LoadMode", e], ["Reason", o]);
    }
    let a = e;
    if (e === "None") {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GameMode", 39, "[LoadModeManager] SetLoadModeByReason时发现传入了不允许外部设置的LoadMode，自动转为InGame", ["Reason", o]);
      }
      a = "InGame";
    }
    if (a === "InGame") {
      if (this.Iwa !== "None" && !this.IsReasonTargetNotDefault(o)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GameMode", 39, "[LoadModeManager] SetLoadModeByReason时发现不成对", ["TargetLoadMode", a], ["CurrentLoadMode", this.GVg.get(o)], ["Reason", o]);
        }
      }
      this.GVg.delete(o);
    } else {
      this.GVg.set(o, a);
    }
    this.kVg();
  }
  static ResetLoadModeByReason(e) {
    this.SetLoadModeByReason("InGame", e);
  }
  static IsReasonTargetNotDefault(e) {
    e = this.GVg.get(e);
    return e !== undefined && e !== "InGame";
  }
  static ClearReasonAndResetLoadMode(e) {
    if ((this.GVg.size || this.GetLoadMode() !== "InGame") && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("GameMode", 39, "[LoadModeManager] 调用了特殊接口清除所有设置LoadMode的原因并重置LoadMode", ["DebugReason", e], ["CurrentLoadMode", this.GetLoadMode()], ["CurrentReasonMap", this.GVg]);
    }
    this.GVg.clear();
    this.kVg();
  }
  static IsLoadModeInGameOrForceInGame() {
    return this.Iwa === "InGame" || this.Iwa === "ForceInGame";
  }
}
(exports.LoadModeManager = LoadModeManager).Iwa = "None";
LoadModeManager.BVg = new Map();
LoadModeManager.GVg = new Map();
LoadModeManager.HVg = undefined; //# sourceMappingURL=LoadModeManager.js.map