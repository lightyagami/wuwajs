"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleShieldPercentMachine = undefined;
const DURATION = 100;
class MotorcycleShieldPercentMachine {
  constructor() {
    this.Sst = 0;
    this.yst = 0;
    this.Ist = 0;
    this.Duration = DURATION;
  }
  Init(t) {
    this.yst = t;
    this.Sst = t;
    this.Ist = 0;
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
  IsDecreasing() {
    return this.Ist < 0;
  }
}
exports.MotorcycleShieldPercentMachine = MotorcycleShieldPercentMachine;
//# sourceMappingURL=MotorcycleShieldPercentMachine.js.map