"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineState = undefined;
class AiStateMachineState {
  constructor(t, i) {
    this.Node = undefined;
    this.StateData = undefined;
    this.Node = t;
    this.StateData = i;
  }
  Init() {
    return this.OnInit(this.StateData);
  }
  OnInit(t) {
    return true;
  }
  OnEnter(t, i) {}
  OnExit(t, i) {}
  OnActivate(t, i) {}
  OnDeactivate(t, i) {}
  OnExecuted(t) {}
  Tick(t, i) {
    this.OnTick(t, i);
  }
  OnTick(t, i) {}
  Clear() {
    this.OnClear();
    this.Node = undefined;
  }
  OnClear() {}
  ToString(t, i = 0) {}
}
exports.AiStateMachineState = AiStateMachineState;
//# sourceMappingURL=AiStateMachineState.js.map