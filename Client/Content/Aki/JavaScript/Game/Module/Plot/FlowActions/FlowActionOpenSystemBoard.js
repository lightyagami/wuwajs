"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionOpenSystemBoard = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FlowActionLevelAsyncAction_1 = require("./FlowActionLevelAsyncAction");
class FlowActionOpenSystemBoard extends FlowActionLevelAsyncAction_1.FlowActionLevelAsyncAction {
  OnExecute() {
    if (ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(false);
    }
    super.OnExecute();
  }
  OnBackgroundExecute() {
    this.FinishExecute(true);
  }
  OnActionFinish(e) {
    if (ModelManager_1.ModelManager.SequenceModel.IsPlaying) {
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(true);
    }
    this.FinishExecute(true);
  }
}
exports.FlowActionOpenSystemBoard = FlowActionOpenSystemBoard;
//# sourceMappingURL=FlowActionOpenSystemBoard.js.map