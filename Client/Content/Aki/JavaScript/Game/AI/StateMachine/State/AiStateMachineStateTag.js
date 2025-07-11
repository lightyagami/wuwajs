"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineStateTag = undefined;
const CombatLog_1 = require("../../../Utils/CombatLog");
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateTag extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments);
    this.TagId = 0;
    this.TagName = "";
    this.TagHandle = undefined;
  }
  OnInit(t) {
    this.TagId = t.BindTag.TagId;
    return true;
  }
  OnActivate(t) {
    this.TagHandle ||= this.Node.BuffComponent.AddTagWithReturnHandle([this.TagId]);
  }
  OnDeactivate(t) {
    let e = false;
    if (t && t.BindStates && t.BindStates?.length > 0) {
      for (const i of t.BindStates) {
        if (i instanceof AiStateMachineStateTag && i.TagId === this.TagId) {
          i.TagHandle = this.TagHandle;
          e = true;
        }
      }
    }
    if (!this.TagHandle) {
      CombatLog_1.CombatLog.Error("StateMachineNew", this.Node.Entity, "AiStateMachineStateTag移除Tag失败，TagHandle不存在", ["node", this.Node.Name]);
    }
    if (!e) {
      this.Node.BuffComponent.RemoveBuffByHandle(this.TagHandle);
    }
    this.TagHandle = undefined;
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineStateTag = AiStateMachineStateTag;
//# sourceMappingURL=AiStateMachineStateTag.js.map