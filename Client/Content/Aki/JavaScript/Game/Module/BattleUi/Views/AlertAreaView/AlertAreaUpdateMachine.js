"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertAreaUpdateMachine = undefined;
const BAR_ANI_DURATION = 500;
class AlertAreaUpdateMachine {
  constructor() {
    this.LMl = 0;
    this.RMl = 0;
    this.UMl = 0;
    this.xMl = 0;
  }
  Init(t) {
    this.RMl = t;
    this.LMl = t;
  }
  Update(t) {
    return this.PMl(t);
  }
  ChangeTargetPercent(t) {
    if (t !== this.LMl) {
      if (t > this.LMl) {
        this.RMl = Math.min(this.RMl, this.LMl);
      } else {
        this.RMl = Math.max(this.RMl, this.LMl);
      }
      this.LMl = t;
      this.UMl = (t - this.RMl) / BAR_ANI_DURATION;
      this.xMl = Math.sign(this.UMl);
    }
  }
  PMl(t) {
    return this.UMl !== 0 && (this.RMl += this.UMl * t, (this.UMl > 0 && this.RMl >= this.LMl || this.UMl < 0 && this.RMl <= this.LMl) && (this.RMl = this.LMl, this.UMl = 0), true);
  }
  GetBarCurPercent() {
    return this.RMl;
  }
  GetBarTargetPercent() {
    return this.LMl;
  }
  GetProgressDir() {
    return this.xMl;
  }
}
exports.AlertAreaUpdateMachine = AlertAreaUpdateMachine;
//# sourceMappingURL=AlertAreaUpdateMachine.js.map