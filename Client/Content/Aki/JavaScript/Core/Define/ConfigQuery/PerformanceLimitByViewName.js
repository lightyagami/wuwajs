"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPerformanceLimitByViewName = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PerformanceLimit_1 = require("../Config/PerformanceLimit");
const DB = "db_uiextrabehavior.db";
const FILE = "u.Ui额外行为.xlsx";
const TABLE = "PerformanceLimit";
const COMMAND = "select BinData from `PerformanceLimit` where ViewName=?";
const KEY_PREFIX = "PerformanceLimitByViewName";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPerformanceLimitByViewName.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPerformanceLimitByViewName.GetConfig");
const CONFIG_STAT_PREFIX = "configPerformanceLimitByViewName.GetConfig(";
exports.configPerformanceLimitByViewName = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    e?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (i) {
        var t = `${KEY_PREFIX}#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (m) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ViewName", o]) > 0) {
        t = undefined;
        [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ViewName", o]);
        if (n) {
          const m = PerformanceLimit_1.PerformanceLimit.getRootAsPerformanceLimit(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (i) {
            n = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, m);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PerformanceLimitByViewName.js.map