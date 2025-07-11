"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineStateDeathMontage = undefined;
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateDeathMontage extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments);
    this.DeathType = 0;
    this.MontageName = "";
    this.Handle = -1;
  }
  OnActivate() {
    var t = this.Node.DeathComponent;
    if (t) {
      switch (this.DeathType) {
        case 1:
          this.Handle = t.ReplaceDeathMontage(1, this.MontageName);
          break;
        case 2:
          this.Handle = t.ReplaceDeathMontage(2, this.MontageName);
          break;
        default:
          this.Handle = t.ReplaceDeathMontage(0, this.MontageName);
      }
    }
  }
  OnDeactivate() {
    this.Node.DeathComponent?.ResetDeathMontage(this.Handle);
    this.Handle = -1;
  }
  OnInit(t) {
    this.DeathType = t.BindDeathMontage.DeathType;
    this.MontageName = t.BindDeathMontage.MontageName;
    return true;
  }
  ToString(t, e = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, e);
  }
}
exports.AiStateMachineStateDeathMontage = AiStateMachineStateDeathMontage;
//# sourceMappingURL=AiStateMachineStateDeathMontage.js.map