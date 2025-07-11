"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionTrue = undefined;
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionTrue extends AiStateMachineCondition_1.AiStateMachineCondition {
  OnInit(e) {
    return this.ResultSelf = true;
  }
  ToString(e, t = 0) {
    super.ToString(e, t);
    e.Append("[True]");
  }
}
exports.AiStateMachineConditionTrue = AiStateMachineConditionTrue;
//# sourceMappingURL=AiStateMachineConditionTrue.js.map