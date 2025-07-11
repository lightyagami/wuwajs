"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeState = undefined;
class FbChangeState {
  constructor(t) {
    this.FbDataInternal = t;
    this.Q_h = false;
    this.K_h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbChangeState(t);
    }
  }
  get StateId() {
    if (!this.Q_h) {
      this.Q_h = true;
      this.K_h = this.FbDataInternal.stateId();
    }
    return this.K_h;
  }
}
exports.FbChangeState = FbChangeState;
//# sourceMappingURL=FbChangeState.js.map