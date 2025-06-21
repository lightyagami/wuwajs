"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivityLinkageTabData = void 0;
const TimeUtil_1 = require("../../../../Common/TimeUtil");
class ActivityLinkageTabData {
  constructor() {
    this.TabId = 0, this.StartTimeStamp = 0, this.EndTimeStamp = 0, this.IsReceive = !1, this.IsInShowTime = !1
  }
  IsInShowTimeChange() {
    let t = !1;
    var i = TimeUtil_1.TimeUtil.GetServerTimeStamp(),
      i = (t = this.StartTimeStamp <= i && i <= this.EndTimeStamp ? !0 : t) !== this.IsInShowTime;
    return this.IsInShowTime = t, i
  }
}
exports.ActivityLinkageTabData = ActivityLinkageTabData;
//# sourceMappingURL=ActivityLinkageDefine.js.map