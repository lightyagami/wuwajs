"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbChangeActorState = undefined;
class FbChangeActorState {
  constructor(t) {
    this.FbDataInternal = t;
    this.Bch = false;
    this.Cbo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbChangeActorState(t);
    }
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
}
exports.FbChangeActorState = FbChangeActorState;
//# sourceMappingURL=FbChangeActorState.js.map