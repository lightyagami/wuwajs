"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateBase = undefined;
class StateBase {
  constructor(t, e, r) {
    this.Owner = t;
    this.State = e;
    this.StateMachine = r;
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