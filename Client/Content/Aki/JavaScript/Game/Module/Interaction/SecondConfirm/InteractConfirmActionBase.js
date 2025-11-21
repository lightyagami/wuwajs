"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractConfirmBoxActionBase = exports.InteractConfirmActionBase = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class InteractConfirmActionBase {
  constructor() {
    this.Context = undefined;
  }
  Execute(t) {
    this.Context = t;
    return this.OnExecute(t);
  }
  Cancel() {
    this.OnCancel();
    this.Clear();
  }
  Clear() {
    this.Context = undefined;
    this.OnClear();
  }
  OnExecute(t) {
    return true;
  }
  OnCancel() {}
  OnClear() {}
  ExecuteFinish(t) {
    if (this.Context) {
      if (this.Context.ConfirmCallback) {
        this.Context.ConfirmCallback(this.Context.Handle, t, this.Context.Option);
      }
      this.Clear();
    }
  }
}
class InteractConfirmBoxActionBase extends (exports.InteractConfirmActionBase = InteractConfirmActionBase) {
  OnExecute(t) {
    return !!t.Option?.ConfirmBox && !!(t = this.ConfigConfirmBoxData()) && (ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t), true);
  }
  OnCancel() {
    if (ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen()) {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
    }
    this.ExecuteFinish(false);
  }
}
exports.InteractConfirmBoxActionBase = InteractConfirmBoxActionBase;
//# sourceMappingURL=InteractConfirmActionBase.js.map