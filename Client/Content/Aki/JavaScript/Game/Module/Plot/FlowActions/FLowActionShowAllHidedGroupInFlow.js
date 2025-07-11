"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionShowAllHidedGroupInFlow = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionShowAllHidedGroupInFlow extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    ModelManager_1.ModelManager.PlotModel.PlotCleanRange.Close();
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionShowAllHidedGroupInFlow = FlowActionShowAllHidedGroupInFlow;
//# sourceMappingURL=FLowActionShowAllHidedGroupInFlow.js.map