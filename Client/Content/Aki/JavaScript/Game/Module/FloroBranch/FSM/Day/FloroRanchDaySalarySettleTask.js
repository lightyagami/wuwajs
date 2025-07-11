"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDaySalarySettleTask = undefined;
const FloroRanchEntityActionSystem_1 = require("../../Entity/FloroRanchEntityActionSystem");
const FloroRanchDailyTaskBase_1 = require("./FloroRanchDailyTaskBase");
class FloroRanchDaySalarySettleTask extends FloroRanchDailyTaskBase_1.FloroRanchDailyTaskBase {
  constructor(t) {
    super();
    this.aGu = undefined;
    this.aGu = t;
  }
  OnExecute() {
    FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.ExecuteWageSettleAction(this.aGu).then(() => {
      this.Complete();
    });
  }
}
exports.FloroRanchDaySalarySettleTask = FloroRanchDaySalarySettleTask;
//# sourceMappingURL=FloroRanchDaySalarySettleTask.js.map