"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineActionEnterFight = undefined;
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionEnterFight extends AiStateMachineAction_1.AiStateMachineAction {
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineActionEnterFight = AiStateMachineActionEnterFight;
//# sourceMappingURL=AiStateMachineActionEnterFight.js.map