"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowConditionBase = undefined;
class LevelFlowConditionBase {
  constructor() {
    this.yUe = false;
    this.d_u = undefined;
  }
  Enter() {
    this.yUe = false;
    this.OnEnter();
  }
  Exit() {
    this.OnExit();
    this.yUe = true;
  }
  Tick(t) {
    if (!this.yUe) {
      this.OnTick(t);
    }
  }
  Reset() {
    this.yUe = false;
    this.OnReset();
  }
  FinishExecute(t) {
    this.Exit();
    this.d_u(t);
  }
  BindCompleteCallBack(t) {
    this.d_u = t;
  }
  OnEnter() {}
  OnTick(t) {}
  OnExit() {}
  OnReset() {}
}
exports.LevelFlowConditionBase = LevelFlowConditionBase;
//# sourceMappingURL=LevelFlowConditionBase.js.map