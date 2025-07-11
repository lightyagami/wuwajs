"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameBudgetTimeEstimationFramesOffset = undefined;
const cpp_1 = require("cpp");
const Info_1 = require("../Common/Info");
const Log_1 = require("../Common/Log");
const MathCommon_1 = require("../Utils/Math/MathCommon");
class GameBudgetTimeEstimationFramesOffset {
  constructor() {
    this.GK = 16.6;
    this.NK = 5;
    this.kK = 60;
    this.FK = 0;
    this.VK = 1 / 30;
    this.HK = this.GK * this.VK;
    this.jK = -1;
    this.WK = [];
    this.TickBudgetTime = 8;
    this.KK = false;
  }
  Initialize() {
    cpp_1.FKuroGameBudgetAllocatorInterface.SetBudgetTime(this.TickBudgetTime);
  }
  SetMaximumFrameRate(t) {
    this.GK = 1000 / t * (Info_1.Info.IsMobilePlatform() ? 0.8 : 0.95);
    this.NK = this.GK / (Info_1.Info.IsMobilePlatform() ? 2.33 : 1.5);
    this.TickBudgetTime = Math.floor(this.GK / 2);
    this.HK = this.GK * this.VK;
    this.kK = t;
    this.jK = -1;
    this.WK.length = 0;
    this.FK = 0;
    cpp_1.FKuroGameBudgetAllocatorInterface.SetBudgetTime(this.TickBudgetTime);
  }
  UpdateBudgetTime(t) {
    var i = cpp_1.FKuroGameBudgetAllocatorInterface.GetLastFrameGameThreadConsumeTime();
    if (this.WK.length < this.kK) {
      this.WK.push(i - this.GK);
      if (this.WK.length === this.kK) {
        let t = 0;
        for (const h of this.WK) {
          t += h;
        }
        this.FK = t / this.kK;
        this.jK = -1;
      }
    } else {
      this.jK++;
      if (this.jK >= this.kK) {
        this.jK = 0;
      }
      var s = this.WK[this.jK];
      var i = i - this.GK;
      this.WK[this.jK] = i;
      this.FK += (i - s) / this.kK;
      if (this.FK < -this.HK) {
        i = (this.HK - this.FK) / this.HK;
        this.TickBudgetTime += this.HK * i / this.kK;
      } else if (this.FK > this.HK) {
        s = (this.FK - this.HK) / this.HK;
        this.TickBudgetTime -= this.HK * s / this.kK;
      }
      this.TickBudgetTime = MathCommon_1.MathCommon.Clamp(this.TickBudgetTime, 0, this.NK);
      cpp_1.FKuroGameBudgetAllocatorInterface.SetBudgetTime(this.TickBudgetTime);
      if (this.KK && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Game", 24, "GameBudgetTimeEstimationFramesOffset.UpdateBudgetTime", ["GtAverageOffsetTime", this.FK], ["TickBudgetTime", this.TickBudgetTime], ["GtOffsetToleranceTime", this.HK]);
      }
    }
  }
}
exports.GameBudgetTimeEstimationFramesOffset = GameBudgetTimeEstimationFramesOffset;
//# sourceMappingURL=GameBudgetTimeEstimationFramesOffset.js.map