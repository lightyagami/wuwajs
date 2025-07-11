"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineAction = undefined;
class AiStateMachineAction {
  constructor(t, i) {
    this.Node = undefined;
    this.Fre = undefined;
    this.Node = t;
    this.Fre = i;
  }
  DoAction(t) {}
  Init() {
    return this.OnInit(this.Fre);
  }
  OnInit(t) {
    return true;
  }
  Clear() {
    this.OnClear();
    this.Node = undefined;
  }
  OnClear() {}
  ToString(t, i = 0) {}
}
exports.AiStateMachineAction = AiStateMachineAction;
//# sourceMappingURL=AiStateMachineAction.js.map