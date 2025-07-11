"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configExploreRouletteReplaceById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ExploreRouletteReplace_1 = require("../Config/ExploreRouletteReplace");
const DB = "db_explore_skill.db";
const FILE = "t.探索工具.xlsx";
const TABLE = "ExploreRouletteReplace";
const COMMAND = "select BinData from `ExploreRouletteReplace` where Id=?";
const KEY_PREFIX = "ExploreRouletteReplaceById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configExploreRouletteReplaceById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configExploreRouletteReplaceById.GetConfig");
const CONFIG_STAT_PREFIX = "configExploreRouletteReplaceById.GetConfig(";
exports.configExploreRouletteReplaceById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var i = `${KEY_PREFIX}#${e})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (l) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", e]) > 0) {
        i = undefined;
        [n, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", e]);
        if (n) {
          const l = ExploreRouletteReplace_1.ExploreRouletteReplace.getRootAsExploreRouletteReplace(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (o) {
            n = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, l);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ExploreRouletteReplaceById.js.map