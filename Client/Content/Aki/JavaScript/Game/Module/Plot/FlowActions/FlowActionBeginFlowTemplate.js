"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionBeginFlowTemplate = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionBeginFlowTemplate extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !== "LevelC" || ModelManager_1.ModelManager.PlotModel.IsInTemplate()) {
      this.FinishExecute(true);
    } else {
      ModelManager_1.ModelManager.PlotModel.StartPlotTemplate(this.ActionInfo.Params, this.Context, () => {
        this.FinishExecute(true);
      });
    }
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionBeginFlowTemplate = FlowActionBeginFlowTemplate;
//# sourceMappingURL=FlowActionBeginFlowTemplate.js.map