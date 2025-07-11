"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiBehaviorBaseProxy = undefined;
const ComponentAction_1 = require("./ComponentAction");
class UiBehaviorBaseProxy extends ComponentAction_1.ComponentAction {
  constructor(e) {
    super();
    this.U_r = e;
  }
  async OnCreateAsyncImplement() {
    await this.U_r.OnUiCreateAsync?.();
    return true;
  }
  async OnStartAsyncImplement() {
    this.U_r.OnAfterUiStart?.();
    return Promise.resolve();
  }
  async OnShowAsyncImplement() {
    this.U_r.OnAfterUiShow?.();
    return Promise.resolve();
  }
  async OnHideAsyncImplement() {
    this.U_r.OnBeforeUiHide?.();
    return Promise.resolve();
  }
  async OnDestroyAsyncImplement() {
    if (this.U_r !== undefined) {
      this.U_r.OnBeforeDestroy?.();
      this.U_r = undefined;
    }
    return Promise.resolve();
  }
  OnDestroyImplementCompatible() {
    if (this.U_r !== undefined) {
      this.U_r.OnBeforeDestroy?.();
      this.U_r = undefined;
    }
  }
}
exports.UiBehaviorBaseProxy = UiBehaviorBaseProxy;
//# sourceMappingURL=UiBehaviorBase.js.map