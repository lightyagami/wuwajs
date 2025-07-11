"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineStateBuff = undefined;
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateBuff extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments);
    this.BuffId = undefined;
  }
  OnInit(t) {
    this.BuffId = BigInt(t.BindBuff.BuffId);
    return true;
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineStateBuff = AiStateMachineStateBuff;
//# sourceMappingURL=AiStateMachineStateBuff.js.map