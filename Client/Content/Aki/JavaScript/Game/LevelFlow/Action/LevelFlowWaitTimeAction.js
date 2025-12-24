"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowWaitTimeAction = undefined;
const TimeUtil_1 = require("../../Common/TimeUtil");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowWaitTimeAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.DXd = 0;
    this.Cce = 0;
  }
  Init(e) {
    this.DXd = e * TimeUtil_1.TimeUtil.InverseMillisecond;
    return this;
  }
  OnExecute() {
    this.Cce = 0;
  }
  OnTick(e) {
    this.Cce += e;
    if (this.Cce >= this.DXd) {
      this.FinishExecute(true);
    }
  }
}
exports.LevelFlowWaitTimeAction = LevelFlowWaitTimeAction;
//# sourceMappingURL=LevelFlowWaitTimeAction.js.map