"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowWaitLoadingDone = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowWaitLoadingDone extends LevelFlowActionBase_1.LevelFlowActionBase {
  OnExecute() {
    if (!ModelManager_1.ModelManager.LoadingModel.IsLoading) {
      this.FinishExecute(true);
    }
  }
  OnTick(e) {
    if (!ModelManager_1.ModelManager.LoadingModel.IsLoading) {
      this.FinishExecute(true);
    }
  }
}
exports.LevelFlowWaitLoadingDone = LevelFlowWaitLoadingDone;
//# sourceMappingURL=LevelFlowWaitLoadingDone.js.map