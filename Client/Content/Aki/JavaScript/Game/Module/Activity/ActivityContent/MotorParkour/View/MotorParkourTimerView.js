"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourTimerView = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../../Core/Common/Time");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const ONE_HUNDRED = 100;
class MotorParkourTimerView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.$Tf = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.$Tf = this.OpenParam;
  }
  OnTick(i) {
    var e;
    var t;
    var r;
    if (this.$Tf !== 0 && (r = (TimeUtil_1.TimeUtil.GetServerStopTimeStamp() - this.$Tf) * TimeUtil_1.TimeUtil.Millisecond, Time_1.Time.FlowTimeDilation !== 0)) {
      e = ((e = Math.floor(r % TimeUtil_1.TimeUtil.Hour / TimeUtil_1.TimeUtil.Minute)) < 10 ? "0" : "") + e;
      t = ((t = Math.floor(r % TimeUtil_1.TimeUtil.Minute)) < 10 ? "0" : "") + t;
      r = ((r = Math.floor((r - Math.floor(r)) * ONE_HUNDRED)) < 10 ? "0" : "") + r;
      this.GetText(0)?.SetText(`${e}:${t}:${r}`);
    }
  }
}
exports.MotorParkourTimerView = MotorParkourTimerView;
//# sourceMappingURL=MotorParkourTimerView.js.map