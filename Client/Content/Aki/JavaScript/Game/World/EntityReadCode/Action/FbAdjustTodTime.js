"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAdjustTodTime = undefined;
class FbAdjustTodTime {
  constructor(t) {
    this.FbDataInternal = t;
    this.q1h = false;
    this.k1h = 0;
    this.G1h = false;
    this.O1h = 0;
    this.F1h = false;
    this.N1h = false;
  }
  static Create(t) {
    if (t) {
      return new FbAdjustTodTime(t);
    }
  }
  get Hour() {
    if (!this.q1h) {
      this.q1h = true;
      this.k1h = this.FbDataInternal.hour();
    }
    return this.k1h;
  }
  get Min() {
    if (!this.G1h) {
      this.G1h = true;
      this.O1h = this.FbDataInternal.min();
    }
    return this.O1h;
  }
  get ShowUi() {
    if (!this.F1h) {
      this.F1h = true;
      this.N1h = this.FbDataInternal.showUi();
    }
    return this.N1h;
  }
}
exports.FbAdjustTodTime = FbAdjustTodTime;
//# sourceMappingURL=FbAdjustTodTime.js.map