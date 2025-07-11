"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoguePopularEntrieArgBySeasonIdAndInstId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoguePopularEntrieArg_1 = require("../Config/RoguePopularEntrieArg");
const DB = "db_rogue.db";
const FILE = "r.肉鸽.xlsx";
const TABLE = "RoguePopularEntrieArg";
const COMMAND = "select BinData from `RoguePopularEntrieArg` where SeasonId=? AND InstId=?";
const KEY_PREFIX = "RoguePopularEntrieArgBySeasonIdAndInstId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoguePopularEntrieArgBySeasonIdAndInstId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRoguePopularEntrieArgBySeasonIdAndInstId.GetConfig");
const CONFIG_STAT_PREFIX = "configRoguePopularEntrieArgBySeasonIdAndInstId.GetConfig(";
exports.configRoguePopularEntrieArgBySeasonIdAndInstId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${n})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (e) {
        var r = `${KEY_PREFIX}#${o}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (g) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["SeasonId", o], ["InstId", n]) > 0) {
        r = undefined;
        [i, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["SeasonId", o], ["InstId", n]);
        if (i) {
          const g = RoguePopularEntrieArg_1.RoguePopularEntrieArg.getRootAsRoguePopularEntrieArg(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          if (e) {
            i = `${KEY_PREFIX}#${o}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RoguePopularEntrieArgBySeasonIdAndInstId.js.map