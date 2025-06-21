"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.AiStateMachineActionSendGameplayEvent = void 0;
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils"),
  AiStateMachine_1 = require("../AiStateMachine"),
  AiStateMachineAction_1 = require("./AiStateMachineAction");
class AiStateMachineActionSendGameplayEvent extends AiStateMachineAction_1.AiStateMachineAction {
  constructor() {
    super(...arguments), this.Qor = void 0
  }
  OnInit(t) {
    return this.Qor = t.ActionSendGameplayEvent?.TagId, !0
  }
  DoAction() {
    var t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(this.Qor ?? 0);
    t && this.Node?.AbilityComponent?.SendGameplayEventToActor(t)
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e)
  }
}
exports.AiStateMachineActionSendGameplayEvent = AiStateMachineActionSendGameplayEvent;
//# sourceMappingURL=AiStateMachineActionSendGameplayEvent.js.map