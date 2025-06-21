"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.HeadIconEnergyBarPercentMachine = void 0;
class HeadIconEnergyBarPercentMachine {
  constructor() {
    this.Sst = 0, this.yst = 0, this.Ist = 0, this.X61 = 0, this.Y61 = 0, this.XFt = 0, this.z61 = void 0
  }
  SetWaitTimeWhenGrow(t) {
    this.X61 = t
  }
  Init(t, s, i = 100, h) {
    this.yst = t, this.Sst = t, this.X61 = s, this.Y61 = i, this.z61 = h
  }
  SetTargetPercent(t) {
    var s;
    t !== this.Sst && (s = this.Sst, t > this.Sst ? (this.yst >= this.Sst && (this.XFt = this.X61), this.Sst = t, this.yst = Math.min(this.yst, t), this.Ist = (t - this.yst) / this.Y61) : (this.Sst = t, this.yst = t, this.Ist = 0), this.z61?.(this.Sst, s))
  }
  Update(t) {
    return 0 !== this.Ist && (0 < this.XFt ? (this.XFt -= t, !1) : (this.yst += this.Ist * t, this.yst >= this.Sst && (this.yst = this.Sst, this.Ist = 0), !0))
  }
  GetCurPercent() {
    return this.yst
  }
  GetTargetPercent() {
    return this.Sst
  }
}
exports.HeadIconEnergyBarPercentMachine = HeadIconEnergyBarPercentMachine;
//# sourceMappingURL=HeadIconEnergyBarPercentMachine.js.map