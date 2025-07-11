"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AntiCheatHeartbeatData = exports.AntiCheatBundleData = undefined;
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
class AntiCheatBundleData extends LogReportDefine_1.PlayerCommonLogData {
  constructor() {
    super();
    this.event_id = "8";
    this.s_bundle_id = "";
    this.s_version = "";
  }
}
exports.AntiCheatBundleData = AntiCheatBundleData;
class AntiCheatHeartbeatData extends LogReportDefine_1.PlayerCommonLogData {
  constructor() {
    super();
    this.i_exception_count = 0;
  }
}
exports.AntiCheatHeartbeatData = AntiCheatHeartbeatData;
//# sourceMappingURL=AntiCheatData.js.map