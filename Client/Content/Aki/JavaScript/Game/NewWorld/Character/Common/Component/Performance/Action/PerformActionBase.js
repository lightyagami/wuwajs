"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformActionBase = undefined;
class PerformActionBase {
  constructor(t) {
    this.Name = t;
    this.Id = 0;
    this.Mode = 0;
    this.Executed = false;
    this.Param = undefined;
    this.PerformComp = undefined;
    this.OnFinish = undefined;
    this.OnBeforeExecute = undefined;
    this.OnAfterExecute = undefined;
    this.IsAtomic = false;
    this.IsValid = false;
    this.IsPersistent = false;
  }
  Execute() {
    if (this.IsValid) {
      if (this.Executed) {
        this.OnRestore();
      } else {
        this.Executed = true;
        this.OnBeforeExecute?.(this.Id);
        this.OnExecute();
      }
    } else {
      this.OnFinish();
    }
  }
  FinishExecute() {
    this.OnAfterExecute?.(this.Id);
    this.OnFinish();
  }
  Interrupt() {
    this.OnInterrupt();
  }
  Reset() {
    this.IsValid = false;
    this.Id = 0;
    this.Executed = false;
    this.Param = undefined;
    this.PerformComp = undefined;
    this.Mode = 0;
    this.IsPersistent = false;
    this.OnFinish = undefined;
    this.OnBeforeExecute = undefined;
    this.OnReset();
  }
  OnExecute() {}
  OnInterrupt() {}
  OnRestore() {
    this.OnExecute();
  }
  OnReset() {}
}
exports.PerformActionBase = PerformActionBase;
//# sourceMappingURL=PerformActionBase.js.map