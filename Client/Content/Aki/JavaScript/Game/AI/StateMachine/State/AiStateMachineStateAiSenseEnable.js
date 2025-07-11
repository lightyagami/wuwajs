"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineStateAiSenseEnable = undefined;
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateAiSenseEnable extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments);
    this.ConfigId = 0;
  }
  OnInit(t) {
    this.ConfigId = t.BindAiSenseEnable.ConfigId;
    return true;
  }
  OnActivate() {
    this.Node.AiController.AiPerception?.SetAiSenseEnable(this.ConfigId, true);
  }
  OnDeactivate() {
    this.Node.AiController.AiPerception?.SetAiSenseEnable(this.ConfigId, false);
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineStateAiSenseEnable = AiStateMachineStateAiSenseEnable;
//# sourceMappingURL=AiStateMachineStateAiSenseEnable.js.map