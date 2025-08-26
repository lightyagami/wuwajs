"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionCheckPositionState = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionCheckPositionState extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.ftl = CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
    this.PVr = (t, e) => {
      this.ResultSelf = this.Node.UnifiedStateComponent.PositionState === this.ftl;
      if (this.Node?.Activated) {
        this.Node.Owner.TickStateMachine(this.Result, "AiStateMachineConditionCheckPositionState", this.Node.Name);
      }
    };
  }
  RegisterEvents() {
    return !!super.RegisterEvents() && !!this.Node.Entity && !EventSystem_1.EventSystem.HasWithTarget(this.Node.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.PVr) && !(EventSystem_1.EventSystem.AddWithTarget(this.Node.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.PVr), 0);
  }
  UnregisterEvents() {
    return !!super.UnregisterEvents() && !!this.Node.Entity && !!EventSystem_1.EventSystem.HasWithTarget(this.Node.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.PVr) && (EventSystem_1.EventSystem.RemoveWithTarget(this.Node.Entity, EventDefine_1.EEventName.CharOnPositionStateChanged, this.PVr), true);
  }
  OnInit(t) {
    this.ftl = t.CondCheckPositionState.PositionState;
    return true;
  }
  OnTick() {
    this.ResultSelf = this.Node.UnifiedStateComponent.PositionState === this.ftl;
  }
  ToString(t, e = 0) {
    super.ToString(t, e);
    t.Append(`有仇恨
`);
  }
}
exports.AiStateMachineConditionCheckPositionState = AiStateMachineConditionCheckPositionState;
//# sourceMappingURL=AiStateMachineConditionCheckPositionState.js.map