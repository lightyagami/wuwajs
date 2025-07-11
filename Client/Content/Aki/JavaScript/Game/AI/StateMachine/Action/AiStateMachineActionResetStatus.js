"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineActionResetStatus = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionResetStatus extends AiStateMachineAction_1.AiStateMachineAction {
  DoAction() {
    if (this.Node.AiController) {
      ModelManager_1.ModelManager.CombatMessageModel.AnyHateChange = true;
    }
  }
  ToString(e, t = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(e, t);
  }
}
exports.AiStateMachineActionResetStatus = AiStateMachineActionResetStatus;
//# sourceMappingURL=AiStateMachineActionResetStatus.js.map