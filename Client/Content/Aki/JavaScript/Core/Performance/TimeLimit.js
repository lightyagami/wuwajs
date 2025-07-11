"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeLimit = undefined;
class TimeLimit {
  constructor(t) {
    this.FY = 0;
    this.VY = 0;
    this.cY = true;
    if (t) {
      this.VY = t;
    }
  }
  SetEnable(t) {
    this.cY = t;
  }
  get CurrentCost() {
    return this.FY;
  }
  ResetCost() {
    this.FY = 0;
  }
  set TimeLimit(t) {
    this.VY = t;
  }
  get TimeLimit() {
    return this.VY;
  }
  AddCost(t) {
    this.FY += t;
  }
  IsTimeLimitExceeded() {
    return this.cY && this.VY > 0 && this.FY >= this.VY;
  }
}
exports.TimeLimit = TimeLimit;
//# sourceMappingURL=TimeLimit.js.map