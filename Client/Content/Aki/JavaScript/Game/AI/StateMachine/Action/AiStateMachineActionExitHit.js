"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineActionExitHit = undefined;
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionExitHit extends AiStateMachineAction_1.AiStateMachineAction {
  DoAction() {
    this.Node.UnifiedStateComponent.ExitHitState();
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineActionExitHit = AiStateMachineActionExitHit;
//# sourceMappingURL=AiStateMachineActionExitHit.js.map