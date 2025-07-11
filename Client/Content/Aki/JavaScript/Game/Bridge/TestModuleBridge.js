"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestModuleBridge = undefined;
const Log_1 = require("../../Core/Common/Log");
class TestModuleBridge {
  static TryGetLoadedTestModuleExports() {
    if (this.QUa) {
      return this.QUa;
    }
  }
  static async TryGetTestModuleExports() {
    if (this.QUa) {
      return this.QUa;
    }
    try {
      var e = await Promise.resolve().then(() => require("../../Test/TestModuleExports"));
      if (e) {
        this.QUa = e.TestModuleExports;
        return this.QUa;
      }
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Game", 62, "找不到Test模块入口", ["error", e.stack || e.message]);
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Game", 62, "找不到Test模块入口", ["error", e]);
      }
    }
  }
}
(exports.TestModuleBridge = TestModuleBridge).QUa = undefined;
//# sourceMappingURL=TestModuleBridge.js.map