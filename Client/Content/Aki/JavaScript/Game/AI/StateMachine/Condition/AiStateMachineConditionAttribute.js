"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionAttribute = undefined;
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionAttribute extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.ine = 0;
    this.one = 0;
    this.rne = 0;
    this.oie = (t, i, s) => {
      this.ResultSelf = i >= this.one && i <= this.rne;
      this.Node?.Owner.TickStateMachine(this.Result, "AiStateMachineConditionAttribute", this.Node?.Name);
    };
  }
  OnInit(t) {
    this.ine = t.CondAttribute.AttributeId;
    this.one = t.CondAttribute.Min;
    this.rne = t.CondAttribute.Max;
    this.Node.AttributeComponent.AddListener(this.ine, this.oie, "AiConditionEvent");
    t = this.Node.AttributeComponent.GetCurrentValue(this.ine);
    this.ResultSelf = t >= this.one && t <= this.rne;
    return true;
  }
  OnClear() {
    this.Node.AttributeComponent?.RemoveListener(this.ine, this.oie);
  }
  ToString(t, i = 0) {
    super.ToString(t, i);
    t.Append(`属性 [${this.ine}, ${this.one}, ${this.rne}]
`);
  }
}
exports.AiStateMachineConditionAttribute = AiStateMachineConditionAttribute;
//# sourceMappingURL=AiStateMachineConditionAttribute.js.map