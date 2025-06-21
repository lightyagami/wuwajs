"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PerformActionBase = void 0;
class PerformActionBase {
  constructor(t) {
    this.Name = t, this.Id = 0, this.Mode = 0, this.Executed = !1, this.Param = void 0, this.PerformComp = void 0, this.OnFinish = void 0, this.OnBeforeExecute = void 0, this.OnAfterExecute = void 0, this.IsAtomic = !1, this.IsValid = !1, this.IsPersistent = !1
  }
  Execute() {
    this.IsValid ? this.Executed ? this.OnRestore() : (this.Executed = !0, this.OnBeforeExecute?.(this.Id), this.OnExecute()) : this.OnFinish()
  }
  FinishExecute() {
    this.OnAfterExecute?.(this.Id), this.OnFinish()
  }
  Interrupt() {
    this.OnInterrupt()
  }
  Reset() {
    this.IsValid = !1, this.Id = 0, this.Executed = !1, this.Param = void 0, this.PerformComp = void 0, this.Mode = 0, this.IsPersistent = !1, this.OnFinish = void 0, this.OnBeforeExecute = void 0, this.OnReset()
  }
  OnExecute() {}
  OnInterrupt() {}
  OnRestore() {
    this.OnExecute()
  }
  OnReset() {}
}
exports.PerformActionBase = PerformActionBase;
//# sourceMappingURL=PerformActionBase.js.map