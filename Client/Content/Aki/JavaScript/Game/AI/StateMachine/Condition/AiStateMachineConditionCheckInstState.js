"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionCheckInstState = undefined;
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionCheckInstState extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.TagName = "";
    this.TagId = 0;
    this.vJ = undefined;
    this.lne = (t, i) => {
      this.ResultSelf = i;
      if (this.Node?.Activated) {
        this.Node.Owner.TickStateMachine(this.Result, "AiStateMachineConditionCheckInstState", this.Node.Name);
      }
    };
  }
  OnInit(t) {
    this.TagId = t.CondInstStateChange.TagId;
    this.TagName = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(this.TagId);
    this.vJ = this.Node.TagComponent.ListenForTagAddOrRemove(this.TagId, this.lne);
    this.ResultSelf = this.Node.TagComponent.HasTag(this.TagId);
    return true;
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
exports.AiStateMachineConditionCheckInstState = AiStateMachineConditionCheckInstState;
//# sourceMappingURL=AiStateMachineConditionCheckInstState.js.map