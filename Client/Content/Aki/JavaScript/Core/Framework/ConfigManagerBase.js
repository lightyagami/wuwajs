"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigManagerBase = undefined;
const Log_1 = require("../Common/Log");
class ConfigManagerBase {
  constructor() {}
  static Add(t) {
    this.pK.push(t);
  }
  static Init() {
    for (const t of this.pK) {
      if (!t.Init()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 1, "配置初始化失败，请往上查看具体出错模块日志解决问题", ["config", t.constructor.name]);
        }
        return false;
      }
    }
    return true;
  }
  static Clear() {
    for (const t of this.pK) {
      if (!t.Clear()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiCore", 1, "配置清理失败，请往上查看具体出错模块日志解决问题", ["config", t.constructor.name]);
        }
        return false;
      }
    }
    return !(this.pK.length = 0);
  }
  static OnInit() {
    return true;
  }
  static OnClear() {
    return true;
  }
}
(exports.ConfigManagerBase = ConfigManagerBase).pK = [];
//# sourceMappingURL=ConfigManagerBase.js.map