"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PlotSwitchSubLevel = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  ModelManager_1 = require("../../Manager/ModelManager");
class PlotSwitchSubLevel {
  async CheckSwitchSubLevelPromise() {
    ModelManager_1.ModelManager.SubLevelLoadingModel.LoadSubLevelPromise && (Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 45, "开始检查切换子关卡"), await ModelManager_1.ModelManager.SubLevelLoadingModel.LoadSubLevelPromise?.Promise, Log_1.Log.CheckInfo()) && Log_1.Log.Info("Plot", 45, "检查切换子关卡完成通过")
  }
}
exports.PlotSwitchSubLevel = PlotSwitchSubLevel;
//# sourceMappingURL=PlotSwitchSubLevel.js.map