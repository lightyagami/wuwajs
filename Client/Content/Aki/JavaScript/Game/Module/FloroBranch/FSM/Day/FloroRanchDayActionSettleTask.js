"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDayActionSettleTask = undefined;
const FloroRanchEntityActionSystem_1 = require("../../Entity/FloroRanchEntityActionSystem");
const FloroRanchDailyTaskBase_1 = require("./FloroRanchDailyTaskBase");
class FloroRanchDayActionSettleTask extends FloroRanchDailyTaskBase_1.FloroRanchDailyTaskBase {
  constructor(t) {
    super();
    this.agu = undefined;
    this.agu = t;
  }
  OnExecute() {
    var t = this.agu.qyu;
    FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.ExecuteActionList(t).then(() => {
      this.Complete();
    });
  }
}
exports.FloroRanchDayActionSettleTask = FloroRanchDayActionSettleTask;
//# sourceMappingURL=FloroRanchDayActionSettleTask.js.map