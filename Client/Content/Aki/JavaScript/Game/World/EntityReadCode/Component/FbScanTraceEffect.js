"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbScanTraceEffect = undefined;
class FbScanTraceEffect {
  constructor(t) {
    this.FbDataInternal = t;
    this.sUh = false;
    this.aUh = undefined;
    this.ldh = false;
    this.NHo = 0;
  }
  static Create(t) {
    if (t) {
      return new FbScanTraceEffect(t);
    }
  }
  get Effect() {
    if (!this.sUh) {
      this.sUh = true;
      this.aUh = this.FbDataInternal.effect();
    }
    return this.aUh;
  }
  get Target() {
    if (!this.ldh) {
      this.ldh = true;
      this.NHo = this.FbDataInternal.target();
    }
    return this.NHo;
  }
}
exports.FbScanTraceEffect = FbScanTraceEffect;
//# sourceMappingURL=FbScanTraceEffect.js.map