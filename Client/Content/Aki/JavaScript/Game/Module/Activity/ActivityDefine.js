"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityLogReportInfo = exports.ACTIVITY_BUBBLE_CACHE_KEY = exports.hideActivityTypeList = exports.NORMAL_MEMORY_CACHE_VIEW_COUNT = exports.LOW_MEMORY_CACHE_VIEW_COUNT = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
exports.LOW_MEMORY_CACHE_VIEW_COUNT = 3;
exports.NORMAL_MEMORY_CACHE_VIEW_COUNT = 10;
exports.hideActivityTypeList = [Protocol_1.Aki.Protocol.uks.Proto_PhantomBattleRecord];
exports.ACTIVITY_BUBBLE_CACHE_KEY = 1011;
class ActivityLogReportInfo {
  constructor(o, t) {
    this.Id = 0;
    this.Type = 0;
    this.Id = o;
    this.Type = t;
  }
}
exports.ActivityLogReportInfo = ActivityLogReportInfo;
//# sourceMappingURL=ActivityDefine.js.map