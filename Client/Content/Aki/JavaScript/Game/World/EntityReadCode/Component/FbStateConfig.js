"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStateConfig = undefined;
class FbStateConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.Bch = false;
    this.Cbo = undefined;
    this.I_h = false;
    this.y6o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbStateConfig(t);
    }
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get Duration() {
    if (!this.I_h) {
      this.I_h = true;
      this.y6o = this.FbDataInternal.duration();
    }
    return this.y6o;
  }
}
exports.FbStateConfig = FbStateConfig;
//# sourceMappingURL=FbStateConfig.js.map