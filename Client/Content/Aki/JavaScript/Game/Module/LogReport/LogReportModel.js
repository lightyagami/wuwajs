"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogReportModel = undefined;
const UE = require("ue");
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
  static RecordOperateTime(e = false, t = "", r = 0) {
    var o = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    if (this.Hvi === 0) {
      this.Hvi = o;
    }
    if (e && t) {
      e = this.jvi.get(t);
      if (e === 0) {
        this.jvi.set(t, r);
      }
      if (e === r) {
        return;
      }
      this.jvi.set(t, r);
    }
    e = (o - this.Hvi) * TimeUtil_1.TimeUtil.Millisecond;
    if (e > RECORD_HANG_UP_OFFSET) {
      this.Vvi += e;
      (t = new LogReportDefine_1.HangUpTimeLogData()).f_hang_up_time = e.toString();
      LogReportController_1.LogReportController.LogReport(t);
    }
    this.Hvi = o;
  }
  SetTimerAssemblyLogData(e, t) {
    this.Jba.set(e, t);
  }
  GetTimerAssemblyLogData(e) {
    return this.Jba.get(e);
  }
  GetAllTimerAssemblyLogData() {
    return Array.from(this.Jba.values());
  }
  GetPresetProperties() {
    var e = new LogReportDefine_1.PresetProperties();
    e.system_language = UE.KismetInternationalizationLibrary.GetCurrentLanguage();
    e.os_version = UE.KuroStaticLibrary.GetOSVersion();
    e.device_id = UE.ThinkingAnalytics.GetDeviceId();
    var t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetGameResolution();
    e.screen_height = t.Y.toString();
    e.screen_width = t.X.toString();
    return e;
  }
}
(exports.LogReportModel = LogReportModel).Hvi = 0;
LogReportModel.Vvi = 0;
LogReportModel.jvi = new Map(); //# sourceMappingURL=LogReportModel.js.map