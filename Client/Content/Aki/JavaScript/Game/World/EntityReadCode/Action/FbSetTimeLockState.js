"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetTimeLockState = undefined;
class FbSetTimeLockState {
  constructor(t) {
    this.FbDataInternal = t;
    this.ibh = false;
    this.rbh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetTimeLockState(t);
    }
  }
  get LockState() {
    if (!this.ibh) {
      this.ibh = true;
      this.rbh = this.FbDataInternal.lockState();
    }
    return this.rbh;
  }
}
exports.FbSetTimeLockState = FbSetTimeLockState;
//# sourceMappingURL=FbSetTimeLockState.js.map