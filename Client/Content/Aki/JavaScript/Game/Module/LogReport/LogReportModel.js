"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogReportModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimeUtil_1 = require("../../Common/TimeUtil");
const LogReportController_1 = require("./LogReportController");
const LogReportDefine_1 = require("./LogReportDefine");
const RECORD_HANG_UP_OFFSET = 30;
class LogReportModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Jba = new Map();
  }
  OnInit() {
    this.Jba.set("1012", new LogReportDefine_1.ExploreToolAssemblyLogData("1001"));
    this.Jba.set("1013", new LogReportDefine_1.ExploreToolAssemblyLogData("1003"));
    this.Jba.set("1014", new LogReportDefine_1.ExploreToolAssemblyLogData("1004"));
    this.Jba.set("1025", new LogReportDefine_1.ExploreToolAssemblyLogData("1013"));
    return true;
  }
  static get HangUpTime() {
    return this.Vvi;
  }
  static RecordOperateTime(e = false, t = "", o = 0) {
    var r = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    if (this.Hvi === 0) {
      this.Hvi = r;
    }
    if (e && t) {
      e = this.jvi.get(t);
      if (e === 0) {
        this.jvi.set(t, o);
      }
      if (e === o) {
        return;
      }
      this.jvi.set(t, o);
    }
    e = (r - this.Hvi) * TimeUtil_1.TimeUtil.Millisecond;
    if (e > RECORD_HANG_UP_OFFSET) {
      this.Vvi += e;
      (t = new LogReportDefine_1.HangUpTimeLogData()).f_hang_up_time = e.toString();
      LogReportController_1.LogReportController.LogReport(t);
    }
    this.Hvi = r;
  }
  GetTimerAssemblyLogData(e) {
    return this.Jba.get(e);
  }
  GetAllTimerAssemblyLogData() {
    return Array.from(this.Jba.values());
  }
}
(exports.LogReportModel = LogReportModel).Hvi = 0;
LogReportModel.Vvi = 0;
LogReportModel.jvi = new Map(); //# sourceMappingURL=LogReportModel.js.map