"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetInteractionLockState = undefined;
class FbSetInteractionLockState {
  constructor(t) {
    this.FbDataInternal = t;
    this.OAh = false;
    this.FAh = false;
  }
  static Create(t) {
    if (t) {
      return new FbSetInteractionLockState(t);
    }
  }
  get IsLock() {
    if (!this.OAh) {
      this.OAh = true;
      this.FAh = this.FbDataInternal.isLock();
    }
    return this.FAh;
  }
}
exports.FbSetInteractionLockState = FbSetInteractionLockState;
//# sourceMappingURL=FbSetInteractionLockState.js.map