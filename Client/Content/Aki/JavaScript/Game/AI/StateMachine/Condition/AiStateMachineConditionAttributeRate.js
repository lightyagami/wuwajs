"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionAttributeRate = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const ATTRIBUTE_RATE_COE = 0.0001;
class AiStateMachineConditionAttributeRate extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.nne = 0;
    this.sne = 0;
    this.one = -0;
    this.rne = -0;
    this.ane = -0;
    this.hne = -0;
    this.aie = (t, i, s) => {
      if (t === this.nne) {
        this.ane = i;
      } else if (t === this.sne) {
        this.hne = i;
      }
      t = this.ane / this.hne;
      this.ResultSelf = t >= this.one && t <= this.rne;
      this.Node?.Owner.TickStateMachine(this.Result, "AiStateMachineConditionAttributeRate", this.Node?.Name);
    };
  }
  OnInit(t) {
    this.nne = t.CondAttributeRate.AttributeId;
    this.sne = t.CondAttributeRate.Denominator;
    this.one = t.CondAttributeRate.Min * ATTRIBUTE_RATE_COE;
    this.rne = t.CondAttributeRate.Max * ATTRIBUTE_RATE_COE;
    this.Node.AttributeComponent.AddListeners([this.nne, this.sne], this.aie, "AiConditionEvent");
    this.ane = this.Node.AttributeComponent.GetCurrentValue(this.nne);
    this.hne = this.Node.AttributeComponent.GetCurrentValue(this.sne);
    t = this.ane / this.hne;
    this.ResultSelf = t >= this.one && t <= this.rne;
    return true;
  }
  OnClear() {
    this.Node.AttributeComponent?.RemoveListeners([this.nne, this.sne], this.aie);
  }
  ToString(t, i = 0) {
    super.ToString(t, i);
    t.Append(`属性比例 [${EAttributeId[this.nne]}/${EAttributeId[this.sne]}, ${this.one}, ${this.rne}]
`);
  }
}
exports.AiStateMachineConditionAttributeRate = AiStateMachineConditionAttributeRate;
//# sourceMappingURL=AiStateMachineConditionAttributeRate.js.map