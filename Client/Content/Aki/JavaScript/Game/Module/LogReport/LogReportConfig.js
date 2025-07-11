"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogReportConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const BeginnerGuideById_1 = require("../../../Core/Define/ConfigQuery/BeginnerGuideById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LogReportConfig extends ConfigBase_1.ConfigBase {
  GetBeginnerGuideConfig(e) {
    var o = BeginnerGuideById_1.configBeginnerGuideById.GetConfig(e);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LogReport", 8, "新手打点表分表BeginnerGuide配置找不到", ["Id", e]);
      }
    }
    return o;
  }
}
exports.LogReportConfig = LogReportConfig;
//# sourceMappingURL=LogReportConfig.js.map