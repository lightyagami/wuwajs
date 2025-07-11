"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionSetFlowTemplate = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionSetFlowTemplate extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel !== "LevelC") {
      this.FinishExecute(true, true);
    } else {
      ModelManager_1.ModelManager.PlotModel.SetPlotTemplate(this.ActionInfo.Params, () => {
        this.FinishExecute(true);
      });
    }
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionSetFlowTemplate = FlowActionSetFlowTemplate;
//# sourceMappingURL=FlowActionSetFlowTemplate.js.map