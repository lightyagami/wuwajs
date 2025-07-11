"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionHideByRangeInFlow = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionHideByRangeInFlow extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    ModelManager_1.ModelManager.PlotModel.PlotCleanRange.Open(e);
  }
  OnBackgroundExecute() {}
}
exports.FlowActionHideByRangeInFlow = FlowActionHideByRangeInFlow;
//# sourceMappingURL=FlowActionHideByRangeInFlow.js.map