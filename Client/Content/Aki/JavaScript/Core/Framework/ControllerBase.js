"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControllerBase = undefined;
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
class ControllerBase {
  constructor() {}
  static get IsTickEvenPaused() {
    return this.IsTickEvenPausedInternal;
  }
  static SetControllerManager(t) {
    this.Manager = t;
  }
  static Init() {
    return this.OnInit();
  }
  static Clear() {
    this.vK = true;
    return this.OnClear();
  }
  static PauseTick() {
    this.vDe = false;
  }
  static ResumeTick() {
    this.vDe = true;
  }
  static InitTickOptimize(t = 1, e = 1) {
    this.TickInterval = t;
    this.TickIntervalInFight = e;
    this.Xyl = false;
  }
  static get vDe() {
    return this.Yyl;
  }
  static set vDe(t) {
    if (this.Yyl !== t) {
      this.Yyl = t;
      this.Xyl = false;
      this.zyl = 0;
      this.Jyl = 0;
    }
  }
  static CheckTick(t, e) {
    if (!this.Xyl) {
      if (!this.vDe) {
        return false;
      }
      if (t) {
        if (this.TickIntervalInFight < 0) {
          return false;
        }
        this.zyl++;
        this.Jyl += e;
        if (this.TickIntervalInFight > this.zyl) {
          return false;
        }
      } else {
        if (this.TickInterval < 0) {
          return false;
        }
        this.zyl++;
        this.Jyl += e;
        if (this.TickInterval > this.zyl) {
          return false;
        }
      }
      this.zyl = 0;
    }
    return true;
  }
  static Tick(e) {
    if (!this.vK) {
      let t = e;
      if (this.Jyl !== 0) {
        t = this.Jyl;
        this.Jyl = 0;
      }
      try {
        this.OnTick(t);
      } catch (t) {
        if (t instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("Controller", 3, "Tick方法执行异常", t, ["name", this.name], ["error", t.message]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Controller", 3, "Tick方法执行异常", ["name", this.name], ["error", t]);
        }
      }
    }
  }
  static AfterTick(t) {
    if (!this.vK) {
      this.OnAfterTick(t);
    }
  }
  static Preload() {
    return this.OnPreload();
  }
  static LeaveLevel() {
    return this.OnLeaveLevel();
  }
  static ChangeMode() {
    return this.OnChangeMode();
  }
  static SetPerformanceStateObject(t, e = "", i = "") {
    this.PerformanceState = Stats_1.Stat.CreateNoFlameGraph(t, e, i);
  }
  static GetPerformanceStateObject() {
    return this.OnGetPerformanceStateObject();
  }
  static OnInit() {
    return true;
  }
  static OnTick(t) {}
  static OnAfterTick(t) {}
  static OnClear() {
    return true;
  }
  static OnPreload() {}
  static OnLeaveLevel() {
    return true;
  }
  static OnGetPerformanceStateObject() {
    return this.PerformanceState;
  }
  static OnChangeMode() {
    return true;
  }
}
(exports.ControllerBase = ControllerBase).Manager = undefined;
ControllerBase.PerformanceState = undefined;
ControllerBase.IsTickEvenPausedInternal = false;
ControllerBase.vK = false;
ControllerBase.Xyl = true;
ControllerBase.Yyl = true;
ControllerBase.TickIntervalInFight = 1;
ControllerBase.TickInterval = 1;
ControllerBase.zyl = 0;
ControllerBase.Jyl = 0; //# sourceMappingURL=ControllerBase.js.map