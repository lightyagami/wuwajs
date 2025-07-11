"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModelManagerBase = undefined;
const Log_1 = require("../Common/Log");
class ModelManagerBase {
  constructor() {}
  static Add(t) {
    this.MK.push(t);
  }
  static Init() {
    for (const t of this.MK) {
      if (!t.Init()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 1, "模块初始化失败，请往上查看具体出错模块日志解决问题", ["model", t.constructor.name]);
        }
        return false;
      }
    }
    return true;
  }
  static Clear() {
    for (const t of this.MK) {
      if (!t.Clear()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 1, "模块清理失败，请往上查看具体出错模块日志解决问题", ["model", t.constructor.name]);
        }
        return false;
      }
    }
    return !(this.MK.length = 0);
  }
  static LeaveLevel() {
    for (const t of this.MK) {
      if (!t.LeaveLevel()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 1, "模块系统退出关卡失败，请往上查看具体出错模块日志解决问题", ["model", t.constructor.name]);
        }
        return false;
      }
    }
    return !!this.OnLeaveLevel() || (Log_1.Log.CheckError() && Log_1.Log.Error("UiCore", 1, "模块系统退出关卡失败，请往上查看具体出错模块日志解决问题"), false);
  }
  static ChangeMode() {
    for (const t of this.MK) {
      if (!t.ChangeMode()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 3, "模块系统退出模式失败，请往上查看具体出错模块日志解决问题", ["model", t.constructor.name]);
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