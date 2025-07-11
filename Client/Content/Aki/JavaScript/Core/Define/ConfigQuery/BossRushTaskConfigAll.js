"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBossRushTaskConfigAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BossRushTaskConfig_1 = require("../Config/BossRushTaskConfig");
const DB = "db_activity.db";
const FILE = "b.bossrush活动.xlsx";
const TABLE = "BossRushTaskConfig";
const COMMAND = "select BinData from `BossRushTaskConfig`";
const KEY_PREFIX = "BossRushTaskConfigAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBossRushTaskConfigAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configBossRushTaskConfigAll.GetConfigList");
exports.configBossRushTaskConfigAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var n;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var i = KEY_PREFIX + ")";
        const s = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (s) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return s;
        }
      }
      const s = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var t = undefined;
        [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!n) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        t = BossRushTaskConfig_1.BossRushTaskConfig.getRootAsBossRushTaskConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
        s.push(t);
      }
      if (o) {
        i = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(i, s, s.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return s;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=BossRushTaskConfigAll.js.map