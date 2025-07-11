"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDelayChangeState = undefined;
class FbDelayChangeState {
  constructor(t) {
    this.FbDataInternal = t;
    this.Fph = false;
    this.Nph = 0;
    this.JUh = false;
    this.ZUh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbDelayChangeState(t);
    }
  }
  get Time() {
    if (!this.Fph) {
      this.Fph = true;
      this.Nph = this.FbDataInternal.time();
    }
    return this.Nph;
  }
  get NewState() {
    if (!this.JUh) {
      this.JUh = true;
      this.ZUh = this.FbDataInternal.newState();
    }
    return this.ZUh;
  }
}
exports.FbDelayChangeState = FbDelayChangeState;
//# sourceMappingURL=FbDelayChangeState.js.map