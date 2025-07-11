"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineTask = undefined;
class AiStateMachineTask {
  constructor(t, i) {
    this.Node = undefined;
    this.bne = undefined;
    this.CanBeInterrupt = false;
    this.IsAsyncTask = false;
    this.Node = t;
    this.bne = i;
    this.CanBeInterrupt = i.CanBeInterrupt;
  }
  get Type() {
    return this.bne.Type;
  }
  Init() {
    return this.OnInit(this.bne);
  }
  OnInit(t) {
    return true;
  }
  OnEnter(t) {}
  OnExit(t) {}
  OnActivate(t) {}
  OnDeactivate(t) {}
  OnExecuted(t) {}
  Tick(t, i) {
    this.OnTick(t, i);
  }
  OnTick(t, i) {}
  Clear() {
    this.OnClear();
    this.Node = undefined;
    this.bne = undefined;
  }
  OnClear() {}
  ToString(t, i = 0) {}
}
exports.AiStateMachineTask = AiStateMachineTask;
//# sourceMappingURL=AiStateMachineTask.js.map