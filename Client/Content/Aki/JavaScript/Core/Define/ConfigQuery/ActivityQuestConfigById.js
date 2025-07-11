"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configActivityQuestConfigById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ActivityQuestConfig_1 = require("../Config/ActivityQuestConfig");
const DB = "db_activityquestconfig.db";
const FILE = "h.活动任务.xlsx";
const TABLE = "ActivityQuestConfig";
const COMMAND = "select BinData from `ActivityQuestConfig` where Id=?";
const KEY_PREFIX = "ActivityQuestConfigById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configActivityQuestConfigById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configActivityQuestConfigById.GetConfig");
const CONFIG_STAT_PREFIX = "configActivityQuestConfigById.GetConfig(";
exports.configActivityQuestConfigById = {
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
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", i]) > 0) {
        e = undefined;
        [n, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", i]);
        if (n) {
          const C = ActivityQuestConfig_1.ActivityQuestConfig.getRootAsActivityQuestConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
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
//# sourceMappingURL=ActivityQuestConfigById.js.map