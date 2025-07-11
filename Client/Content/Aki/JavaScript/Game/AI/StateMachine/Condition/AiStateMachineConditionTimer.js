"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionTimer = undefined;
const TimeUtil_1 = require("../../../Common/TimeUtil");
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionTimer extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.pne = -0;
    this.vne = -0;
  }
  OnInit(i) {
    this.pne = i.CondTimer.MinTime;
    this.vne = i.CondTimer.MaxTime;
    return true;
  }
  ToString(i, t = 0) {
    super.ToString(i, t);
    i.Append(`延迟 [时间:${(this.pne * TimeUtil_1.TimeUtil.Millisecond).toFixed(1)}-${(this.vne * TimeUtil_1.TimeUtil.Millisecond).toFixed(1)}]
`);
  }
}
exports.AiStateMachineConditionTimer = AiStateMachineConditionTimer;
//# sourceMappingURL=AiStateMachineConditionTimer.js.map