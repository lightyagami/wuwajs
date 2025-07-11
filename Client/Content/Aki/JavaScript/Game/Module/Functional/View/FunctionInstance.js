"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionInstance = undefined;
class FunctionInstance {
  constructor(t, e) {
    this.rKa = false;
    this.ige = t;
    this.w7t = e;
  }
  GetFunctionId() {
    return this.w7t;
  }
  GetIsShow() {
    return (this.ige & 1) > 0;
  }
  GetIsOpen() {
    return (this.ige & 2) > 0;
  }
  GetHasManualShowUi() {
    return (this.ige & 4) > 0;
  }
  SetFlag(t) {
    this.ige = t;
  }
  SetIsLockByBehaviorTree(t) {
    this.rKa = t;
  }
  GetIsLockByBehaviorTree() {
    return this.rKa;
  }
}
exports.FunctionInstance = FunctionInstance;
//# sourceMappingURL=FunctionInstance.js.map