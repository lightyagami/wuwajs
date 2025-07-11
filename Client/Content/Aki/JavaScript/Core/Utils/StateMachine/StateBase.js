"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateBase = undefined;
class StateBase {
  constructor(t, e, s) {
    this.StateMachine = s;
    this.Owner = t;
    this.State = e;
  }
  GetState(t) {
    return this.StateMachine?.GetState(t);
  }
  Create(t) {
    this.OnCreate(t);
  }
  Start() {
    this.OnStart();
  }
  Update(t) {
    this.OnUpdate(t);
  }
  Enter(t) {
    this.OnEnter(t);
  }
  ReEnter() {
    this.OnReEnter();
  }
  Exit(t) {
    this.OnExit(t);
  }
  Destroy() {
    this.OnDestroy();
    this.Owner = undefined;
    this.State = undefined;
  }
  CanReEnter() {
    return false;
  }
  CanChangeFrom(t) {
    return true;
  }
  OnCreate(t) {}
  OnStart() {}
  OnUpdate(t) {}
  OnEnter(t) {}
  OnReEnter() {}
  OnExit(t) {}
  OnDestroy() {}
}
exports.StateBase = StateBase;
//# sourceMappingURL=StateBase.js.map