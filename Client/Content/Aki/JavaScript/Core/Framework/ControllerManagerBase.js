"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControllerManagerBase = undefined;
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const TickSystem_1 = require("../Tick/TickSystem");
class ControllerManagerBase {
  constructor() {}
  static Add(r) {
    this.Controllers.set(r.name, r);
    r.SetControllerManager(this);
  }
  static Init() {
    for (const o of this.Controllers) {
      try {
        if (!o[1].Init()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiCore", 1, "控制器初始化失败，请往上查看具体出错模块日志解决问题", ["controller", o[0]]);
          }
        }
      } catch (r) {
        if (r instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("UiCore", 1, "控制器初始化执行异常", r, ["error", r.message], ["controller", o[0]]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 1, "控制器初始化执行异常", ["error", r], ["controller", o[0]]);
        }
      }
    }
  }
  static Tick(r) {
    for (const t of this.TickControllers) {
      var o;
      if (!!t.CheckTick(this.IsInFight, r) && (!TickSystem_1.TickSystem.IsPaused || !!t.IsTickEvenPaused)) {
        if (o = t.GetPerformanceStateObject()) {
          o.Start();
        }
        t.Tick(r);
        if (o) {
          o.Stop();
        }
      }
    }
  }
  static AddTickController(r) {
    var o;
    this.TickControllers.push(r);
    if (Stats_1.Stat.Enable) {
      o = r.prototype.constructor.name;
      r.SetPerformanceStateObject(o);
    }
  }
  static Clear() {
    for (const o of this.Controllers) {
      try {
        if (!o[1].Clear()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiCore", 1, "控制器清理失败，请往上查看具体出错模块日志解决问题", ["controller", o[0]]);
          }
        }
      } catch (r) {
        if (r instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("UiCore", 1, "控制器清理执行异常", r, ["error", r.message], ["controller", o[0]]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 1, "控制器清理执行异常", ["error", r], ["controller", o[0]]);
        }
      }
    }
    if (!this.OnClear()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 1, "控制器系统清理失败，请往上查看具体出错模块日志解决问题");
      }
    }
    this.Controllers.clear();
    this.TickControllers.splice(0, this.TickControllers.length);
  }
  static Preload() {
    var r = new Array();
    for (const t of this.Controllers) {
      var o = t[1].Preload();
      if (o) {
        r.push(o);
      }
    }
    return r;
  }
  static LeaveLevel() {
    for (const o of this.Controllers) {
      try {
        if (!o[1].LeaveLevel()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiCore", 1, "控制器退出关卡失败，请往上查看具体出错模块日志解决问题", ["controller", o[0]]);
          }
        }
      } catch (r) {
        if (r instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("UiCore", 1, "控制器退出关卡执行异常", r, ["error", r.message], ["controller", o[0]]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 1, "控制器退出关卡执行异常", ["error", r], ["controller", o[0]]);
        }
      }
    }
    if (!this.OnLeaveLevel()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 1, "控制器退出关卡失败，请往上查看具体出错模块日志解决问题");
      }
    }
  }
  static ChangeMode() {
    for (const o of this.Controllers) {
      try {
        if (!o[1].ChangeMode()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiCore", 3, "控制器退出模式失败，请往上查看具体出错模块日志解决问题", ["controller", o[0]]);
          }
        }
      } catch (r) {
        if (r instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("UiCore", 1, "控制器退出模式执行异常", r, ["error", r.message], ["controller", o[0]]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 1, "控制器退出模式执行异常", ["error", r], ["controller", o[0]]);
        }
      }
    }
    if (!this.OnChangeMode()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 3, "控制器退出模式失败，请往上查看具体出错模块日志解决问题");
      }
    }
  }
  static GetControllerByName(r) {
    return this.Controllers.get(r);
  }
  static OnClear() {
    return true;
  }
  static OnLeaveLevel() {
    return true;
  }
  static OnChangeMode() {
    return true;
  }
}
(exports.ControllerManagerBase = ControllerManagerBase).Controllers = new Map();
ControllerManagerBase.TickControllers = new Array();
ControllerManagerBase.IsInFight = false; //# sourceMappingURL=ControllerManagerBase.js.map