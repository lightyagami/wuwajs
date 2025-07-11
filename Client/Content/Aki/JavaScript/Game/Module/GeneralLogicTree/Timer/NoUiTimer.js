"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoUiTimer = undefined;
const TimeUtil_1 = require("../../../Common/TimeUtil");
const LogicTreeTimerBase_1 = require("./LogicTreeTimerBase");
class NoUiTimer extends LogicTreeTimerBase_1.LogicTreeTimerBase {
  constructor() {
    super(...arguments);
    this.MYt = -0;
    this.GP_ = -0;
  }
  StartShowTimer(e, i) {
    this.MYt = e;
    this.GP_ = i;
  }
  GetRemainTime() {
    var e = (this.MYt - TimeUtil_1.TimeUtil.GetServerStopTimeStamp()) / 1000;
    var i = this.GP_ !== 0 ? (this.MYt - this.GP_) / 1000 : -1;
    return Math.max(e, i, 0);
  }
}
exports.NoUiTimer = NoUiTimer;
//# sourceMappingURL=NoUiTimer.js.map