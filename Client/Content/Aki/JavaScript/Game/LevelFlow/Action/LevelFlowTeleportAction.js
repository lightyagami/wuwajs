"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowTeleportAction = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowTeleportAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this._se = 0;
  }
  Init(e) {
    this._se = e;
    return this;
  }
  OnExecute() {
    if (ModelManager_1.ModelManager.LevelFlowModel.IsEnd) {
      this.FinishExecute(true);
    } else {
      ControllerHolder_1.ControllerHolder.LevelFlowController.LevelFlowTeleportRequest(this._se, e => {
        this.FinishExecute(e);
      });
    }
  }
}
exports.LevelFlowTeleportAction = LevelFlowTeleportAction;
//# sourceMappingURL=LevelFlowTeleportAction.js.map