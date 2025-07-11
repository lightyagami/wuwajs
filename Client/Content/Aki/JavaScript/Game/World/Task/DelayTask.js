"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DelayTask = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const TaskBase_1 = require("./TaskBase");
const DEFAULT_DELAY_TIME = 1000;
class DelayTask extends TaskBase_1.TaskBase {
  constructor(e, s, t, r = DEFAULT_DELAY_TIME, i) {
    super(e, t, i);
    this.kMt = new CustomPromise_1.CustomPromise();
    this.jEr = s;
    this.rbt = Math.max(r, TimerSystem_1.MIN_TIME);
  }
  async OnRun() {
    return (!this.jEr || !this.jEr()) && !(TimerSystem_1.TimerSystem.Delay(() => {
      this.kMt.SetResult(true);
    }, this.rbt), await this.kMt.Promise, 0);
  }
}
exports.DelayTask = DelayTask;
//# sourceMappingURL=DelayTask.js.map