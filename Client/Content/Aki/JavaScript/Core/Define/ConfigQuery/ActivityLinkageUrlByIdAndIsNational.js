"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configActivityLinkageUrlByIdAndIsNational = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ActivityLinkageUrl_1 = require("../Config/ActivityLinkageUrl");
const DB = "db_activitylinkage.db";
const FILE = "h.活动联动页活动.xlsx";
const TABLE = "ActivityLinkageUrl";
const COMMAND = "select BinData from `ActivityLinkageUrl` where ActivityLinkageId=? And IsNational=?";
const KEY_PREFIX = "ActivityLinkageUrlByIdAndIsNational";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configActivityLinkageUrlByIdAndIsNational.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configActivityLinkageUrlByIdAndIsNational.GetConfig");
const CONFIG_STAT_PREFIX = "configActivityLinkageUrlByIdAndIsNational.GetConfig(";
exports.configActivityLinkageUrlByIdAndIsNational = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, n, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i}#${n})`);
    o?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (t) {
        var e = `${KEY_PREFIX}#${i}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (g) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.BindBool(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ActivityLinkageId", i], ["IsNational", n]) > 0) {
        e = undefined;
        [a, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityLinkageId", i], ["IsNational", n]);
        if (a) {
          const g = ActivityLinkageUrl_1.ActivityLinkageUrl.getRootAsActivityLinkageUrl(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            a = `${KEY_PREFIX}#${i}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ActivityLinkageUrlByIdAndIsNational.js.map