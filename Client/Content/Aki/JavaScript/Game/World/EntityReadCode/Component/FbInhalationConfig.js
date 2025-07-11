"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInhalationConfig = undefined;
const FbInhalationMatching_1 = require("./FbInhalationMatching");
const UnionInhalationPerformanceHelper_1 = require("./UnionInhalationPerformanceHelper");
class FbInhalationConfig {
  constructor(n) {
    this.FbDataInternal = n;
    this.eYh = false;
    this.tYh = undefined;
    this.iYh = false;
    this.rYh = undefined;
  }
  static Create(n) {
    if (n) {
      return new FbInhalationConfig(n);
    }
  }
  get InhalationMatching() {
    if (!this.eYh) {
      this.eYh = true;
      this.tYh = FbInhalationMatching_1.FbInhalationMatching.Create(this.FbDataInternal.inhalationMatching());
    }
    return this.tYh;
  }
  get InhalationPerformance() {
    var n;
    var t;
    if (!this.iYh && (this.iYh = true, n = this.FbDataInternal.inhalationPerformanceType(), t = UnionInhalationPerformanceHelper_1.UnionInhalationPerformanceHelper.GetUnionInhalationPerformanceObject(n))) {
      this.rYh = UnionInhalationPerformanceHelper_1.UnionInhalationPerformanceHelper.ReadUnionInhalationPerformance(n, this.FbDataInternal.inhalationPerformance(t));
    }
    return this.rYh;
  }
}
exports.FbInhalationConfig = FbInhalationConfig;
//# sourceMappingURL=FbInhalationConfig.js.map