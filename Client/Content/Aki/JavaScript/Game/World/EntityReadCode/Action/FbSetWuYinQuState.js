"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetWuYinQuState = undefined;
class FbSetWuYinQuState {
  constructor(t) {
    this.FbDataInternal = t;
    this.Jph = false;
    this.Zph = undefined;
    this.Bch = false;
    this.Cbo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetWuYinQuState(t);
    }
  }
  get WuYinQuName() {
    if (!this.Jph) {
      this.Jph = true;
      this.Zph = this.FbDataInternal.wuYinQuName();
    }
    return this.Zph;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
}
exports.FbSetWuYinQuState = FbSetWuYinQuState;
//# sourceMappingURL=FbSetWuYinQuState.js.map