"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackScreenViewData = undefined;
class BlackScreenViewData {
  constructor() {
    this.ac = 0;
    this.x0t = new Map();
  }
  w0t(e) {
    this.x0t.get(e)?.();
  }
  RegisterStateDelegate(e, t) {
    this.x0t.set(e, t);
  }
  TriggerCurrentStateDelegate() {
    this.w0t(this.ac);
  }
  SwitchState(e) {
    return this.ac !== e && (this.ac = e, this.w0t(e), true);
  }
}
exports.BlackScreenViewData = BlackScreenViewData;
//# sourceMappingURL=BlackScreenViewData.js.map