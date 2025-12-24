"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourRankData = undefined;
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
class MotorParkourRankData {
  constructor(t, i, s = [], e = false) {
    this.Name = t;
    this.Time = i;
    this.LapTime = s;
    this.IsOwn = e;
    this.ShowTimeString = "";
  }
  UpdateShowTimeString(t, i, s) {
    t = this.LapTime[t - 1];
    if (s) {
      s = MathUtils_1.MathUtils.GetFloatPointFloor(Math.abs(i - t) * TimeUtil_1.TimeUtil.Millisecond, 2);
      this.ShowTimeString = t < i ? `-${s}s` : `+${s}s`;
    } else {
      this.ShowTimeString = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat5(t * TimeUtil_1.TimeUtil.Millisecond);
    }
  }
}
exports.MotorParkourRankData = MotorParkourRankData;
//# sourceMappingURL=MotorParkourRankData.js.map