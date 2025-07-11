"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHitLogicChangeNextAndLockTargetState = undefined;
class FbHitLogicChangeNextAndLockTargetState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.IOh = false;
    this.TOh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbHitLogicChangeNextAndLockTargetState(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TargetState() {
    if (!this.IOh) {
      this.IOh = true;
      this.TOh = this.FbDataInternal.targetState();
    }
    return this.TOh;
  }
}
exports.FbHitLogicChangeNextAndLockTargetState = FbHitLogicChangeNextAndLockTargetState;
//# sourceMappingURL=FbHitLogicChangeNextAndLockTargetState.js.map