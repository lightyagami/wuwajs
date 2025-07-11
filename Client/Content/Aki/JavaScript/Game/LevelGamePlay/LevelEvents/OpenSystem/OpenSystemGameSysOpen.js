"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemGameSysOpen = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemGameSysOpen extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Functional", 10, "行为节点触发功能开启");
    }
    if (e.BoardId) {
      return ControllerHolder_1.ControllerHolder.FunctionController.ManualOpenFunctionOpenView(e.BoardId);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Functional", 10, "手动打开功能开启界面参数有问题");
      }
      return false;
    }
  }
  GetViewName(e, o) {
    return "FunctionOpenView";
  }
}
exports.OpenSystemGameSysOpen = OpenSystemGameSysOpen;
//# sourceMappingURL=OpenSystemGameSysOpen.js.map