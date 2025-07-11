"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDurabilityState = undefined;
class FbDurabilityState {
  constructor(t) {
    this.FbDataInternal = t;
    this.e3h = false;
    this.t3h = 0;
    this.Bch = false;
    this.Cbo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDurabilityState(t);
    }
  }
  get Durability() {
    if (!this.e3h) {
      this.e3h = true;
      this.t3h = this.FbDataInternal.durability();
    }
    return this.t3h;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
}
exports.FbDurabilityState = FbDurabilityState;
//# sourceMappingURL=FbDurabilityState.js.map