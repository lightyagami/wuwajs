"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineActionActivateSkillGroup = undefined;
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionActivateSkillGroup extends AiStateMachineAction_1.AiStateMachineAction {
  constructor() {
    super(...arguments);
    this.ConfigId = 0;
    this.Activate = false;
  }
  OnInit(t) {
    this.ConfigId = t.ActionActivateSkillGroup.ConfigId;
    this.Activate = t.ActionActivateSkillGroup.Activate;
    return true;
  }
  DoAction() {
    this.Node.AiController?.AiSkill?.ActivateSkillGroup(this.ConfigId, this.Activate);
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineActionActivateSkillGroup = AiStateMachineActionActivateSkillGroup;
//# sourceMappingURL=AiStateMachineActionActivateSkillGroup.js.map