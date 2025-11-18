"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configKujiActivityByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const KujiActivity_1 = require("../Config/KujiActivity");
const DB = "db_wuwukuji.db";
const FILE = "w.呜呜一番赏.xlsx";
const TABLE = "KujiActivity";
const COMMAND = "select BinData from `KujiActivity` where ActivityId=?";
const KEY_PREFIX = "KujiActivityByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configKujiActivityByActivityId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configKujiActivityByActivityId.GetConfig");
const CONFIG_STAT_PREFIX = "configKujiActivityByActivityId.GetConfig(";
exports.configKujiActivityByActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    o?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (t) {
        var e = `${KEY_PREFIX}#${i})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ActivityId", i]) > 0) {
        e = undefined;
        [n, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", i]);
        if (n) {
          const C = KujiActivity_1.KujiActivity.getRootAsKujiActivity(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            n = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=KujiActivityByActivityId.js.map