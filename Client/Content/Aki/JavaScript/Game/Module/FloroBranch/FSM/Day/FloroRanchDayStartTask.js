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
    this.m_u = undefined;
    this.m_u = t;
  }
  OnExecute() {
    FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.DayStart(this.m_u).then(() => {
      this.AsyncComplete();
    });
  }
}
exports.FloroRanchDayStartTask = FloroRanchDayStartTask;
//# sourceMappingURL=FloroRanchDayStartTask.js.map