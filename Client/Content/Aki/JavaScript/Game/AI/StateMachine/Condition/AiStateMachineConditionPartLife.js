"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionPartLife = undefined;
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionPartLife extends AiStateMachineCondition_1.AiStateMachineCondition {
  OnInit(t) {
    return true;
  }
  ToString(t, i = 0) {
    super.ToString(t, i);
    t.Append("[部位血量]");
  }
}
exports.AiStateMachineConditionPartLife = AiStateMachineConditionPartLife;
//# sourceMappingURL=AiStateMachineConditionPartLife.js.map