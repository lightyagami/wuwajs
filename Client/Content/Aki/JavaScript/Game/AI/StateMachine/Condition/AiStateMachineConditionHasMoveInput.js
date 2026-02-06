"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionHasMoveInput = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionHasMoveInput extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.Awu = (t, e) => {
      this.ResultSelf = this.Node.MoveComponent.HasMoveInput || this.Node.FloatingComponent.HasFloatingMoveInput;
      if (this.Node?.Activated) {
        this.Node.Owner.TickStateMachine(this.Result, "AiStateMachineConditionHasMoveInput", this.Node.Name);
      }
    };
    this.Q6g = (t, e) => {
      this.ResultSelf = this.Node.MoveComponent.HasMoveInput || this.Node.FloatingComponent.HasFloatingMoveInput;
      if (this.Node?.Activated) {
        this.Node.Owner.TickStateMachine(this.Result, "AiStateMachineConditionHasFloatingMoveInput", this.Node.Name);
      }
    };
  }
  RegisterEvents() {
    if (super.RegisterEvents() && this.Node && this.Node.Entity) {
      let t = false;
      if (!EventSystem_1.EventSystem.HasWithTarget(this.Node.Entity, EventDefine_1.EEventName.OnInputMoveChanged, this.Awu)) {
        EventSystem_1.EventSystem.AddWithTarget(this.Node.Entity, EventDefine_1.EEventName.OnInputMoveChanged, this.Awu);
        t = true;
      }
      if (!EventSystem_1.EventSystem.HasWithTarget(this.Node.Entity, EventDefine_1.EEventName.OnFloatingMoveInputChanged, this.Q6g)) {
        EventSystem_1.EventSystem.AddWithTarget(this.Node.Entity, EventDefine_1.EEventName.OnFloatingMoveInputChanged, this.Q6g);
        t = true;
      }
      return t;
    }
    return false;
  }
  UnregisterEvents() {
    if (super.UnregisterEvents() && this.Node && this.Node.Entity) {
      let t = false;
      if (EventSystem_1.EventSystem.HasWithTarget(this.Node.Entity, EventDefine_1.EEventName.OnInputMoveChanged, this.Awu)) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.Node.Entity, EventDefine_1.EEventName.OnInputMoveChanged, this.Awu);
        t = true;
      }
      if (EventSystem_1.EventSystem.HasWithTarget(this.Node.Entity, EventDefine_1.EEventName.OnFloatingMoveInputChanged, this.Q6g)) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.Node.Entity, EventDefine_1.EEventName.OnFloatingMoveInputChanged, this.Q6g);
        t = true;
      }
      return t;
    }
    return false;
  }
  OnInit(t) {
    this.RegisterEvents();
    return true;
  }
  OnClear() {
    this.UnregisterEvents();
  }
  OnTick() {
    this.ResultSelf = this.Node.MoveComponent.HasMoveInput || this.Node.FloatingComponent.HasFloatingMoveInput;
  }
  ToString(t, e = 0) {
    super.ToString(t, e);
    t.Append(`有移动输入
`);
  }
}
exports.AiStateMachineConditionHasMoveInput = AiStateMachineConditionHasMoveInput;
//# sourceMappingURL=AiStateMachineConditionHasMoveInput.js.map