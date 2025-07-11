"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeNpcPerformState = undefined;
class FbChangeNpcPerformState {
  constructor(t) {
    this.FbDataInternal = t;
    this.a_h = false;
    this.I9o = 0;
    this.Bch = false;
    this.Cbo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChangeNpcPerformState(t);
    }
  }
  get EntityId() {
    if (!this.a_h) {
      this.a_h = true;
      this.I9o = this.FbDataInternal.entityId();
    }
    return this.I9o;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
}
exports.FbChangeNpcPerformState = FbChangeNpcPerformState;
//# sourceMappingURL=FbChangeNpcPerformState.js.map