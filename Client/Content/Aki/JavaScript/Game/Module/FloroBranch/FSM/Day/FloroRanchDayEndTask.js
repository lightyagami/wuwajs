"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDayEndTask = undefined;
const FloroRanchEntityActionSystem_1 = require("../../Entity/FloroRanchEntityActionSystem");
const FloroRanchDailyTaskBase_1 = require("./FloroRanchDailyTaskBase");
class FloroRanchDayEndTask extends FloroRanchDailyTaskBase_1.FloroRanchDailyTaskBase {
  constructor() {
    super();
  }
  OnExecute() {
    FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.DayEnd();
    this.Complete();
  }
}
exports.FloroRanchDayEndTask = FloroRanchDayEndTask;
//# sourceMappingURL=FloroRanchDayEndTask.js.map