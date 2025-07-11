"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInhaledPerformance = undefined;
class FbInhaledPerformance {
  constructor(e) {
    this.FbDataInternal = e;
    this.mYh = false;
    this.CYh = 0;
  }
  static Create(e) {
    if (e) {
      return new FbInhaledPerformance(e);
    }
  }
  get InhaledTime() {
    if (!this.mYh) {
      this.mYh = true;
      this.CYh = this.FbDataInternal.inhaledTime();
    }
    return this.CYh;
  }
}
exports.FbInhaledPerformance = FbInhaledPerformance;
//# sourceMappingURL=FbInhaledPerformance.js.map