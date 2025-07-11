"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configActivityQuestConfigByQuestId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ActivityQuestConfig_1 = require("../Config/ActivityQuestConfig");
const DB = "db_activityquestconfig.db";
const FILE = "h.活动任务.xlsx";
const TABLE = "ActivityQuestConfig";
const COMMAND = "select BinData from `ActivityQuestConfig` where QuestId=?";
const KEY_PREFIX = "ActivityQuestConfigByQuestId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configActivityQuestConfigByQuestId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configActivityQuestConfigByQuestId.GetConfig");
const CONFIG_STAT_PREFIX = "configActivityQuestConfigByQuestId.GetConfig(";
exports.configActivityQuestConfigByQuestId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t})`);
    o?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (i) {
        var e = `${KEY_PREFIX}#${t})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["QuestId", t]) > 0) {
        e = undefined;
        [n, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["QuestId", t]);
        if (n) {
          const C = ActivityQuestConfig_1.ActivityQuestConfig.getRootAsActivityQuestConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (i) {
            n = `${KEY_PREFIX}#${t})`;
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
//# sourceMappingURL=ActivityQuestConfigByQuestId.js.map