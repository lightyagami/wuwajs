"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionCheckLastState = undefined;
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionCheckLastState extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this._ne = undefined;
    this.cne = undefined;
  }
  OnInit(t) {
    this._ne = t.CondCheckLastState.TargetStateName;
    return true;
  }
  OnTick() {
    this.ResultSelf = this.Node.Owner.CheckLastActivatedNode(this._ne);
  }
  ToString(t, i = 0) {
    super.ToString(t, i);
    if (this.cne) {
      t.Append(`检查上一帧节点激活 [${this.cne.Name}]
`);
    } else {
      t.Append(`检查上一帧节点激活 [${this._ne}] 目标节点不存在`);
    }
  }
}
exports.AiStateMachineConditionCheckLastState = AiStateMachineConditionCheckLastState;
//# sourceMappingURL=AiStateMachineConditionCheckLastState.js.map