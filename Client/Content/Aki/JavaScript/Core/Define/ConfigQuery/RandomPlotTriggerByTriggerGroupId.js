"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRandomPlotTriggerByTriggerGroupId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RandomPlotTrigger_1 = require("../Config/RandomPlotTrigger");
const DB = "db_randomplot.db";
const FILE = "x.系统随机剧情.xlsx";
const TABLE = "RandomPlotTrigger";
const COMMAND = "select BinData from `RandomPlotTrigger` where TriggerGroupId=?";
const KEY_PREFIX = "RandomPlotTriggerByTriggerGroupId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRandomPlotTriggerByTriggerGroupId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRandomPlotTriggerByTriggerGroupId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configRandomPlotTriggerByTriggerGroupId.GetConfigList(";
exports.configRandomPlotTriggerByTriggerGroupId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var r = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (e) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const e = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["TriggerGroupId", o]) !== 1) {
            break;
          }
          var g = undefined;
          [t, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TriggerGroupId", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          g = RandomPlotTrigger_1.RandomPlotTrigger.getRootAsRandomPlotTrigger(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          e.push(g);
        }
        if (i) {
          r = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(r, e, e.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return e;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RandomPlotTriggerByTriggerGroupId.js.map