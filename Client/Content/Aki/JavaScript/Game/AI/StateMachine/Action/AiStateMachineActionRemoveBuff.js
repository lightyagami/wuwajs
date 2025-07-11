"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineActionRemoveBuff = undefined;
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionRemoveBuff extends AiStateMachineAction_1.AiStateMachineAction {
  constructor() {
    super(...arguments);
    this.BuffId = undefined;
  }
  OnInit(t) {
    this.BuffId = BigInt(t.ActionRemoveBuff.BuffId);
    return true;
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineActionRemoveBuff = AiStateMachineActionRemoveBuff;
//# sourceMappingURL=AiStateMachineActionRemoveBuff.js.map