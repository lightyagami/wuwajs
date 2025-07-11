"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineActionSendGameplayEvent = undefined;
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionSendGameplayEvent extends AiStateMachineAction_1.AiStateMachineAction {
  constructor() {
    super(...arguments);
    this.Qor = undefined;
  }
  OnInit(t) {
    this.Qor = t.ActionSendGameplayEvent?.TagId;
    return true;
  }
  DoAction() {
    var t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(this.Qor ?? 0);
    if (t) {
      this.Node?.AbilityComponent?.SendGameplayEventToActor(t);
    }
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineActionSendGameplayEvent = AiStateMachineActionSendGameplayEvent;
//# sourceMappingURL=AiStateMachineActionSendGameplayEvent.js.map