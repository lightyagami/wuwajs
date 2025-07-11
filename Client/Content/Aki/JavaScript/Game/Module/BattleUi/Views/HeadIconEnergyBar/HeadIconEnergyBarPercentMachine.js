"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadIconEnergyBarPercentMachine = undefined;
class HeadIconEnergyBarPercentMachine {
  constructor() {
    this.Sst = 0;
    this.yst = 0;
    this.Ist = 0;
    this.A51 = 0;
    this.P51 = 0;
    this.XFt = 0;
    this.x51 = undefined;
  }
  SetWaitTimeWhenGrow(t) {
    this.A51 = t;
  }
  Init(t, s, i = 100, h) {
    this.yst = t;
    this.Sst = t;
    this.A51 = s;
    this.P51 = i;
    this.x51 = h;
  }
  SetTargetPercent(t) {
    var s;
    if (t !== this.Sst) {
      s = this.Sst;
      if (t > this.Sst) {
        if (this.yst >= this.Sst) {
          this.XFt = this.A51;
        }
        this.Sst = t;
        this.yst = Math.min(this.yst, t);
        this.Ist = (t - this.yst) / this.P51;
      } else {
        this.Sst = t;
        this.yst = t;
        this.Ist = 0;
      }
      this.x51?.(this.Sst, s);
    }
  }
  Update(t) {
    return this.Ist !== 0 && (this.XFt > 0 ? (this.XFt -= t, false) : (this.yst += this.Ist * t, this.yst >= this.Sst && (this.yst = this.Sst, this.Ist = 0), true));
  }
  GetCurPercent() {
    return this.yst;
  }
  GetTargetPercent() {
    return this.Sst;
  }
}
exports.HeadIconEnergyBarPercentMachine = HeadIconEnergyBarPercentMachine;
//# sourceMappingURL=HeadIconEnergyBarPercentMachine.js.map