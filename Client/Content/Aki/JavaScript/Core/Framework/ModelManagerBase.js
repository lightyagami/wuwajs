"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelManagerBase = undefined;
const Log_1 = require("../Common/Log");
class ModelManagerBase {
  constructor() {}
  static Add(o) {
    this.MK.push(o);
  }
  static Init() {
    for (const r of this.MK) {
      try {
        if (!r.Init()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiCore", 1, "模块初始化失败，请往上查看具体出错模块日志解决问题", ["model", r.constructor.name]);
          }
          return false;
        }
      } catch (o) {
        if (o instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("UiCore", 1, "模块初始化执行异常", o, ["error", o.message], ["model", r.constructor.name]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 1, "模块初始化执行异常", ["error", o], ["model", r.constructor.name]);
        }
        return false;
      }
    }
    return true;
  }
  static Clear() {
    let r = true;
    for (const e of this.MK) {
      try {
        if (!e.Clear()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiCore", 63, "模块清理失败，请往上查看具体出错模块日志解决问题", ["model", e.constructor.name]);
          }
          r = false;
        }
      } catch (o) {
        if (o instanceof Error) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.ErrorWithStack("UiCore", 63, "模块清理执行异常", o, ["error", o.message], ["model", e.constructor.name]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 63, "模块清理执行异常", ["error", o], ["model", e.constructor.name]);
        }
        r = false;
      }
    }
    this.MK.length = 0;
    return r;
  }
  static LeaveLevel() {
    for (const o of this.MK) {
      if (!o.LeaveLevel()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 1, "模块系统退出关卡失败，请往上查看具体出错模块日志解决问题", ["model", o.constructor.name]);
        }
        return false;
      }
    }
    return !!this.OnLeaveLevel() || (Log_1.Log.CheckError() && Log_1.Log.Error("UiCore", 1, "模块系统退出关卡失败，请往上查看具体出错模块日志解决问题"), false);
  }
  static ChangeMode() {
    for (const o of this.MK) {
      if (!o.ChangeMode()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 3, "模块系统退出模式失败，请往上查看具体出错模块日志解决问题", ["model", o.constructor.name]);
        }
        return false;
      }
    }
    return !!this.OnChangeMode() || (Log_1.Log.CheckError() && Log_1.Log.Error("UiCore", 3, "模块系统退出模式失败，请往上查看具体出错模块日志解决问题"), false);
  }
  static OnInit() {
    return true;
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
(exports.ModelManagerBase = ModelManagerBase).MK = [];
//# sourceMappingURL=ModelManagerBase.js.map