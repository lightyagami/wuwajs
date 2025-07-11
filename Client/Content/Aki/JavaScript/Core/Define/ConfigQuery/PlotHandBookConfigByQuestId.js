"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPlotHandBookConfigByQuestId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PlotHandBookConfig_1 = require("../Config/PlotHandBookConfig");
const DB = "db_plothandbook.db";
const FILE = "UniverseEditor/PlotHandBook/剧情图鉴_Json_PlotHandBook.csv";
const TABLE = "PlotHandBookConfig";
const COMMAND = "select BinData from `PlotHandBookConfig` where QuestId=?";
const KEY_PREFIX = "PlotHandBookConfigByQuestId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPlotHandBookConfigByQuestId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPlotHandBookConfigByQuestId.GetConfig");
const CONFIG_STAT_PREFIX = "configPlotHandBookConfigByQuestId.GetConfig(";
exports.configPlotHandBookConfigByQuestId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var e = `${KEY_PREFIX}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["QuestId", o]) > 0) {
        e = undefined;
        [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["QuestId", o]);
        if (i) {
          const C = PlotHandBookConfig_1.PlotHandBookConfig.getRootAsPlotHandBookConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (n) {
            i = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PlotHandBookConfigByQuestId.js.map