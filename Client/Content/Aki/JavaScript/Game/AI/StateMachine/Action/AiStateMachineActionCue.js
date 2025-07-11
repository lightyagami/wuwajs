"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineActionCue = undefined;
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionCue extends AiStateMachineAction_1.AiStateMachineAction {
  constructor() {
    super(...arguments);
    this.Vre = undefined;
  }
  OnInit(t) {
    this.Vre = [];
    for (const e of t.ActionCue.CueIds) {
      this.Vre.push(e);
    }
    return true;
  }
  DoAction() {
    this.Node.BuffComponent.AddGameplayCue(this.Vre, 0, "状态机");
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineActionCue = AiStateMachineActionCue;
//# sourceMappingURL=AiStateMachineActionCue.js.map