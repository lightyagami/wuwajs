"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionChangeFormation = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PlotController_1 = require("../PlotController");
const FlowActionServerAction_1 = require("./FlowActionServerAction");
class FlowActionChangeFormation extends FlowActionServerAction_1.FlowActionServerAction {
  OnExecute() {
    if (ModelManager_1.ModelManager.PlotModel.IsInSequencePlot() && ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
      PlotController_1.PlotController.ChangeFormation();
      this.RequestServerAction(false);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 26, "禁止在非Seq剧情中使用切编队");
    }
    this.FinishExecute(true);
  }
  OnBackgroundExecute() {
    this.FinishExecute(true);
  }
}
exports.FlowActionChangeFormation = FlowActionChangeFormation;
//# sourceMappingURL=FlowActionChangeFormation.js.map