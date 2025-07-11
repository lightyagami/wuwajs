"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotSwitchSubLevel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
class PlotSwitchSubLevel {
  async CheckSwitchSubLevelPromise() {
    if (ModelManager_1.ModelManager.SubLevelLoadingModel.LoadSubLevelPromise && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 45, "开始检查切换子关卡"), await ModelManager_1.ModelManager.SubLevelLoadingModel.LoadSubLevelPromise?.Promise, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Plot", 45, "检查切换子关卡完成通过");
    }
  }
}
exports.PlotSwitchSubLevel = PlotSwitchSubLevel;
//# sourceMappingURL=PlotSwitchSubLevel.js.map