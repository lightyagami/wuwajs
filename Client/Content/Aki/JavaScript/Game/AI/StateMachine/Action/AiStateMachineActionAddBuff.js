"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineActionAddBuff = undefined;
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionAddBuff extends AiStateMachineAction_1.AiStateMachineAction {
  constructor() {
    super(...arguments);
    this.BuffId = undefined;
  }
  OnInit(t) {
    this.BuffId = BigInt(t.ActionAddBuff.BuffId);
    return true;
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineActionAddBuff = AiStateMachineActionAddBuff;
//# sourceMappingURL=AiStateMachineActionAddBuff.js.map