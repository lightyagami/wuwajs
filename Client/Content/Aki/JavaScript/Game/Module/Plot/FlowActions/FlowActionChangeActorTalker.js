"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionChangeActorTalker = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeActorTalker extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    if (e) {
      ModelManager_1.ModelManager.PlotModel.SetActorName(e);
    }
  }
}
exports.FlowActionChangeActorTalker = FlowActionChangeActorTalker;
//# sourceMappingURL=FlowActionChangeActorTalker.js.map