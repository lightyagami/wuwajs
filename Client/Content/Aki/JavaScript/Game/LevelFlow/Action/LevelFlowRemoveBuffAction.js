"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowRemoveBuffAction = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowRemoveBuffAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.E0 = 0;
    this.jQo = [];
  }
  Init(e, o) {
    this.E0 = e;
    this.jQo = o;
    return this;
  }
  OnExecute() {
    ControllerHolder_1.ControllerHolder.LevelFlowController.LevelFlowRemoveBuffRequest(this.jQo);
    this.FinishExecute(true);
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["EntityId", this.E0], ["BuffIds", this.jQo.toString()]);
    }
  }
}
exports.LevelFlowRemoveBuffAction = LevelFlowRemoveBuffAction;
//# sourceMappingURL=LevelFlowRemoveBuffAction.js.map