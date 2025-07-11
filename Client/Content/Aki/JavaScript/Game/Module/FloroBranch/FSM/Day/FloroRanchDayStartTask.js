"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDayStartTask = undefined;
const FloroRanchEntityActionSystem_1 = require("../../Entity/FloroRanchEntityActionSystem");
const FloroRanchDailyTaskBase_1 = require("./FloroRanchDailyTaskBase");
class FloroRanchDayStartTask extends FloroRanchDailyTaskBase_1.FloroRanchDailyTaskBase {
  constructor(t) {
    super();
    this.Plu = undefined;
    this.Plu = t;
  }
  OnExecute() {
    FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.DayStart(this.Plu).then(() => {
      this.Complete();
    });
  }
}
exports.FloroRanchDayStartTask = FloroRanchDayStartTask;
//# sourceMappingURL=FloroRanchDayStartTask.js.map