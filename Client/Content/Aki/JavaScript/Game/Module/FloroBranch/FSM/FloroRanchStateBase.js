"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchStateBase = undefined;
class FloroRanchStateBase {
  constructor(t) {
    this.IsActive = false;
    this.AutoExitAfterEnter = false;
    this.IsForceExit = false;
    this.StageFsm = undefined;
    this.StageFsm = t;
  }
  Create() {
    this.OnCreate();
  }
  Enter() {
    this.IsActive = true;
    this.OnEnter();
    this.OnAddEventListener();
  }
  Tick(t) {
    if (this.IsActive) {
      this.OnTick(t);
    }
  }
  Exit() {
    this.OnRemoveEventListener();
    this.OnExit();
    this.IsActive = false;
  }
  OnCreate() {}
  OnEnter() {}
  OnAddEventListener() {}
  OnTick(t) {}
  OnRemoveEventListener() {}
  OnExit() {}
  ForceExit() {
    this.IsForceExit = true;
    this.AutoExitAfterEnter = true;
  }
}
exports.FloroRanchStateBase = FloroRanchStateBase;
//# sourceMappingURL=FloroRanchStateBase.js.map