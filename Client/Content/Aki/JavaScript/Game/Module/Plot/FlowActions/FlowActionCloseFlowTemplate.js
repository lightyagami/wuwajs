"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionCloseFlowTemplate = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionCloseFlowTemplate extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !== "LevelC") {
      this.FinishExecute(true, true);
    } else {
      ModelManager_1.ModelManager.PlotModel.EndPlotTemplate(this.ActionInfo.Params, () => {
        this.FinishExecute(true);
      });
    }
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionCloseFlowTemplate = FlowActionCloseFlowTemplate;
//# sourceMappingURL=FlowActionCloseFlowTemplate.js.map