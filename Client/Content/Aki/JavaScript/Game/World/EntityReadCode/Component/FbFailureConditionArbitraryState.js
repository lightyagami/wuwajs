"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFailureConditionArbitraryState = undefined;
class FbFailureConditionArbitraryState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Bch = false;
    this.Cbo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFailureConditionArbitraryState(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
}
exports.FbFailureConditionArbitraryState = FbFailureConditionArbitraryState;
//# sourceMappingURL=FbFailureConditionArbitraryState.js.map