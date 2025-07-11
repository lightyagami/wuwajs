"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAchievementStarLevelByLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AchievementStarLevel_1 = require("../Config/AchievementStarLevel");
const DB = "db_achievement.db";
const FILE = "c.成就.xlsx";
const TABLE = "AchievementStarLevel";
const COMMAND = "select BinData from `AchievementStarLevel` where Level=?";
const KEY_PREFIX = "AchievementStarLevelByLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAchievementStarLevelByLevel.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configAchievementStarLevelByLevel.GetConfig");
const CONFIG_STAT_PREFIX = "configAchievementStarLevelByLevel.GetConfig(";
exports.configAchievementStarLevelByLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    o?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var i = `${KEY_PREFIX}#${e})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Level", e]) > 0) {
        i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Level", e]);
        if (t) {
          const a = AchievementStarLevel_1.AchievementStarLevel.getRootAsAchievementStarLevel(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (n) {
            t = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=AchievementStarLevelByLevel.js.map