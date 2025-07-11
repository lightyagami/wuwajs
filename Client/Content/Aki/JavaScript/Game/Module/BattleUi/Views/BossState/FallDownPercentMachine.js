"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FallDownPercentMachine = undefined;
const DURATION = 100;
class FallDownPercentMachine {
  constructor() {
    this.Sst = 0;
    this.yst = 0;
    this.Ist = 0;
  }
  SetTargetPercent(t) {
    if (t !== this.Sst) {
      if (t > this.Sst && t < 1) {
        this.Sst = t;
        this.Ist = (t - this.yst) / DURATION;
      } else {
        this.Sst = t;
        this.yst = t;
        this.Ist = 0;
      }
    }
  }
  Update(t) {
    return this.Ist !== 0 && (this.yst += this.Ist * t, this.yst >= this.Sst && (this.yst = this.Sst, this.Ist = 0), true);
  }
  GetCurPercent() {
    return this.yst;
  }
}
exports.FallDownPercentMachine = FallDownPercentMachine;
//# sourceMappingURL=FallDownPercentMachine.js.map