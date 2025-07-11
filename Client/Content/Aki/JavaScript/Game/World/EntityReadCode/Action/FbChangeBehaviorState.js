"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeBehaviorState = undefined;
class FbChangeBehaviorState {
  constructor(t) {
    this.FbDataInternal = t;
    this.Q_h = false;
    this.K_h = 0;
    this.qch = false;
    this.kch = false;
  }
  static Create(t) {
    if (t) {
      return new FbChangeBehaviorState(t);
    }
  }
  get StateId() {
    if (!this.Q_h) {
      this.Q_h = true;
      this.K_h = this.FbDataInternal.stateId();
    }
    return this.K_h;
  }
  get IsInstant() {
    if (!this.qch) {
      this.qch = true;
      this.kch = this.FbDataInternal.isInstant();
    }
    return this.kch;
  }
}
exports.FbChangeBehaviorState = FbChangeBehaviorState;
//# sourceMappingURL=FbChangeBehaviorState.js.map