"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionTaskFinish = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionTaskFinish extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.Ewu = t => {
      this.ResultSelf = this.Node.CurrentLeafNode.TaskFinished;
      this.Node?.Owner.TickStateMachine(this.Result, "AiStateMachineConditionTaskFinish", this.Node?.Name);
    };
  }
  RegisterEvents() {
    if (super.RegisterEvents()) {
      var t = this.Node.CurrentLeafNode;
      if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnStateTaskFinished, this.Ewu)) {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.OnStateTaskFinished, this.Ewu);
        return true;
      }
    }
    return false;
  }
  UnregisterEvents() {
    if (super.UnregisterEvents()) {
      var t = this.Node.CurrentLeafNode;
      if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnStateTaskFinished, this.Ewu)) {
        EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnStateTaskFinished, this.Ewu);
        return true;
      }
    }
    return false;
  }
  OnInit(t) {
    return this.HasTaskFinishCondition = true;
  }
  OnClear() {
    this.HasTaskFinishCondition = false;
  }
  OnEnter() {
    this.ResultSelf = this.Node.CurrentLeafNode.TaskFinished;
  }
  OnTick() {
    this.ResultSelf = this.Node.CurrentLeafNode.TaskFinished;
  }
  ToString(t, e = 0) {
    super.ToString(t, e);
    t.Append(`节点任务完成
`);
  }
}
exports.AiStateMachineConditionTaskFinish = AiStateMachineConditionTaskFinish;
//# sourceMappingURL=AiStateMachineConditionTaskFinish.js.map