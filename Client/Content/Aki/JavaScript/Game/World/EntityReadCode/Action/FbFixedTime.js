"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFixedTime = undefined;
class FbFixedTime {
  constructor(t) {
    this.FbDataInternal = t;
    this.q1h = false;
    this.k1h = 0;
    this.tBh = false;
    this.iBh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbFixedTime(t);
    }
  }
  get Hour() {
    if (!this.q1h) {
      this.q1h = true;
      this.k1h = this.FbDataInternal.hour();
    }
    return this.k1h;
  }
  get Minutes() {
    if (!this.tBh) {
      this.tBh = true;
      this.iBh = this.FbDataInternal.minutes();
    }
    return this.iBh;
  }
}
exports.FbFixedTime = FbFixedTime;
//# sourceMappingURL=FbFixedTime.js.map