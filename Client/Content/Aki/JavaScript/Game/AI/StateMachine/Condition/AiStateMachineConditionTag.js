"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionTag = undefined;
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionTag extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.TagName = "";
    this.TagId = 0;
    this.vJ = undefined;
    this.lne = (t, i) => {
      this.ResultSelf = i;
      this.Node?.Owner.TickStateMachine(this.Result, "AiStateMachineConditionTag", this.Node?.Name);
    };
  }
  OnInit(t) {
    this.TagId = t.CondTag.TagId;
    this.TagName = t.CondTag.TagName;
    this.vJ = this.Node.TagComponent.ListenForTagAddOrRemove(this.TagId, this.lne);
    this.ResultSelf = this.Node.TagComponent.HasTag(this.TagId);
    return true;
  }
  OnEnter() {
    this.ResultSelf = this.Node.TagComponent.HasTag(this.TagId);
  }
  OnClear() {
    this.vJ.EndTask();
    this.vJ = undefined;
  }
  ToString(t, i = 0) {
    super.ToString(t, i);
    t.Append(`Tag[${this.TagName}]
`);
  }
}
exports.AiStateMachineConditionTag = AiStateMachineConditionTag;
//# sourceMappingURL=AiStateMachineConditionTag.js.map