"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionLeaveFight = undefined;
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionLeaveFight extends AiStateMachineCondition_1.AiStateMachineCondition {
  ToString(e, i = 0) {
    super.ToString(e, i);
    e.Append(`离开战斗
`);
  }
}
exports.AiStateMachineConditionLeaveFight = AiStateMachineConditionLeaveFight;
//# sourceMappingURL=AiStateMachineConditionLeaveFight.js.map