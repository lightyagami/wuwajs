"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTimePathConfig = undefined;
class FbTimePathConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.SCh = false;
    this.MCh = 0;
    this.o9h = false;
    this.n9h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTimePathConfig(t);
    }
  }
  get TotalTime() {
    if (!this.SCh) {
      this.SCh = true;
      this.MCh = this.FbDataInternal.totalTime();
    }
    return this.MCh;
  }
  get TimePathCurve() {
    if (!this.o9h) {
      this.o9h = true;
      this.n9h = this.FbDataInternal.timePathCurve();
    }
    return this.n9h;
  }
}
exports.FbTimePathConfig = FbTimePathConfig;
//# sourceMappingURL=FbTimePathConfig.js.map