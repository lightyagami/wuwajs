"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionHate = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionHate extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.Pwu = (e, t) => {
      this.xwu();
      if (this.Node?.Activated) {
        this.Node.Owner.TickStateMachine(this.Result, "AiStateMachineConditionHate", this.Node.Name);
      }
    };
  }
  RegisterEvents() {
    var e;
    var t;
    return !!super.RegisterEvents() && (e = this.Node.AiController?.CharAiDesignComp?.Entity, t = this.Node.SummonerAiController?.CharAiDesignComp?.Entity, e && !EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.AiHateTargetChanged, this.Pwu) && EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.AiHateTargetChanged, this.Pwu), t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.AiHateTargetChanged, this.Pwu) && EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.AiHateTargetChanged, this.Pwu), true);
  }
  UnregisterEvents() {
    var e;
    var t;
    return !!super.UnregisterEvents() && (e = this.Node.AiController?.CharAiDesignComp?.Entity, t = this.Node.SummonerAiController?.CharAiDesignComp?.Entity, e && EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.AiHateTargetChanged, this.Pwu) && EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.AiHateTargetChanged, this.Pwu), t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.AiHateTargetChanged, this.Pwu) && EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.AiHateTargetChanged, this.Pwu), true);
  }
  xwu() {
    this.ResultSelf = !!this.Node.AiController.AiHateList.GetCurrentTarget();
    if (this.ResultSelf && this.Node.SummonerAiController) {
      this.ResultSelf = !!this.Node.SummonerAiController.AiHateList.GetCurrentTarget();
    }
  }
  OnTick() {
    this.xwu();
  }
  ToString(e, t = 0) {
    super.ToString(e, t);
    e.Append(`有仇恨
`);
  }
}
exports.AiStateMachineConditionHate = AiStateMachineConditionHate;
//# sourceMappingURL=AiStateMachineConditionHate.js.map