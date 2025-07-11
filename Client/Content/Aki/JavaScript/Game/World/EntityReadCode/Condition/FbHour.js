"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHour = undefined;
class FbHour {
  constructor(t) {
    this.FbDataInternal = t;
    this.q1h = false;
    this.k1h = 0;
    this.G1h = false;
    this.O1h = 0;
  }
  static Create(t) {
    if (t) {
      return new FbHour(t);
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
}
exports.FbHour = FbHour;
//# sourceMappingURL=FbHour.js.map