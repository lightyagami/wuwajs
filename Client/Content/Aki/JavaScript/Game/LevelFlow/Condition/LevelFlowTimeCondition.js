"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowTimeCondition = undefined;
const LevelFlowConditionBase_1 = require("./LevelFlowConditionBase");
class LevelFlowTimeCondition extends LevelFlowConditionBase_1.LevelFlowConditionBase {
  constructor() {
    super(...arguments);
    this.DXd = 0;
    this.Cce = 0;
  }
  Init(e) {
    this.DXd = e;
    this.Cce = 0;
  }
  OnTick(e) {
    this.Cce += e;
    if (this.Cce >= this.DXd) {
      this.FinishExecute(true);
    }
  }
}
exports.LevelFlowTimeCondition = LevelFlowTimeCondition;
//# sourceMappingURL=LevelFlowTimeCondition.js.map