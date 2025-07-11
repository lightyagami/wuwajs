"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBossRushActivityByActivityIdAndInstanceId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BossRushActivity_1 = require("../Config/BossRushActivity");
const DB = "db_activity.db";
const FILE = "b.bossrush活动.xlsx";
const TABLE = "BossRushActivity";
const COMMAND = "select BinData from `BossRushActivity` where ActivityId=? And InstId=?";
const KEY_PREFIX = "BossRushActivityByActivityIdAndInstanceId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBossRushActivityByActivityIdAndInstanceId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configBossRushActivityByActivityIdAndInstanceId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configBossRushActivityByActivityIdAndInstanceId.GetConfigList(";
exports.configBossRushActivityByActivityIdAndInstanceId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t, i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${t}#${i})`);
    n?.Start();
    var s = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (s) {
      if (o) {
        var e = `${KEY_PREFIX}#${t}#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (s = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActivityId", t], ["InstId", i]) !== 1) {
            break;
          }
          var C = undefined;
          [s, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", t], ["InstId", i]);
          if (!s) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = BossRushActivity_1.BossRushActivity.getRootAsBossRushActivity(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          a.push(C);
        }
        if (o) {
          e = `${KEY_PREFIX}#${t}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=BossRushActivityByActivityIdAndInstanceId.js.map