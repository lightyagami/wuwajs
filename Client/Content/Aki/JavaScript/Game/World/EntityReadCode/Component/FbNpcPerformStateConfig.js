"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcPerformStateConfig = undefined;
class FbNpcPerformStateConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.Bch = false;
    this.Cbo = undefined;
    this.L6h = false;
    this.A6h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNpcPerformStateConfig(t);
    }
  }
  get State() {
    if (!this.Bch) {
      this.Bch = true;
      this.Cbo = this.FbDataInternal.state();
    }
    return this.Cbo;
  }
  get MaterialDa() {
    if (!this.L6h) {
      this.L6h = true;
      this.A6h = this.FbDataInternal.materialDa();
    }
    return this.A6h;
  }
}
exports.FbNpcPerformStateConfig = FbNpcPerformStateConfig;
//# sourceMappingURL=FbNpcPerformStateConfig.js.map