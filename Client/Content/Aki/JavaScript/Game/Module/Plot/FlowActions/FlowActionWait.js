"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionWait = undefined;
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionWait extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments);
    this.IRe = undefined;
  }
  OnExecute() {
    var e = this.ActionInfo.Params;
    this.IRe = TimerSystem_1.GameplayTimerSystem.Delay(e => {
      this.IRe = undefined;
      this.FinishExecute(true);
    }, e.Time * TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  OnInterruptExecute() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.IRe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
    }
    this.FinishExecute(true);
  }
}
exports.FlowActionWait = FlowActionWait;
//# sourceMappingURL=FlowActionWait.js.map