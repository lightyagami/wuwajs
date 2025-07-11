"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityLinkageTabData = undefined;
const TimeUtil_1 = require("../../../../Common/TimeUtil");
class ActivityLinkageTabData {
  constructor() {
    this.TabId = 0;
    this.StartTimeStamp = 0;
    this.EndTimeStamp = 0;
    this.IsReceive = false;
    this.IsInShowTime = false;
  }
  IsInShowTimeChange() {
    let t = false;
    var i = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    var i = (t = this.StartTimeStamp <= i && i <= this.EndTimeStamp ? true : t) !== this.IsInShowTime;
    this.IsInShowTime = t;
    return i;
  }
}
exports.ActivityLinkageTabData = ActivityLinkageTabData;
//# sourceMappingURL=ActivityLinkageDefine.js.map