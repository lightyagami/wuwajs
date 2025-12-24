"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcyclePercentMachine = undefined;
const DURATION = 100;
class MotorcyclePercentMachine {
  constructor() {
    this.Sst = 0;
    this.yst = 0;
    this.Ist = 0;
    this.Duration = DURATION;
  }
  Init(t, s) {
    this.yst = t;
    this.Sst = t;
    if (s) {
      this.Duration = s;
      this.Ist = 0;
    }
  }
  SetTargetPercent(t) {
    if (t !== this.Sst) {
      this.Sst = t;
      this.Ist = (t - this.yst) / this.Duration;
    }
  }
  Update(t) {
    return this.Ist !== 0 && (this.Ist > 0 ? (this.yst += this.Ist * t, this.yst >= this.Sst && (this.yst = this.Sst, this.Ist = 0)) : (this.yst += this.Ist * t, this.yst <= this.Sst && (this.yst = this.Sst, this.Ist = 0)), true);
  }
  GetCurPercent() {
    return this.yst;
  }
  GetTargetPercent() {
    return this.Sst;
  }
}
exports.MotorcyclePercentMachine = MotorcyclePercentMachine;
//# sourceMappingURL=MotorcyclePercentMachine.js.map