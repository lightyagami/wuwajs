"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAudioState = undefined;
class FbAudioState {
  constructor(t) {
    this.FbDataInternal = t;
    this.XAh = false;
    this.p$a = undefined;
    this.Bch = false;
    this.Cbo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAudioState(t);
    }
  }
  get Group() {
    if (!this.XAh) {
      this.XAh = true;
      this.p$a = this.FbDataInternal.group();
    }
    return this.p$a;
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
}
exports.FbAudioState = FbAudioState;
//# sourceMappingURL=FbAudioState.js.map