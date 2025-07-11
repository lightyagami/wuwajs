"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineActionChangeInstState = undefined;
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionChangeInstState extends AiStateMachineAction_1.AiStateMachineAction {
  constructor() {
    super(...arguments);
    this.TagId = 0;
    this.TagName = "";
  }
  OnInit(t) {
    this.TagId = t.ActionInstChangeStateTag.TagId;
    this.TagName = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(this.TagId);
    return true;
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineActionChangeInstState = AiStateMachineActionChangeInstState;
//# sourceMappingURL=AiStateMachineActionChangeInstState.js.map