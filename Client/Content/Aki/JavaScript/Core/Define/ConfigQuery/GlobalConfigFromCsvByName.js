"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGlobalConfigFromCsvByName = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GlobalConfigFromCsv_1 = require("../Config/GlobalConfigFromCsv");
const DB = "db_global_config.db";
const FILE = "k.可视化编辑/c.Csv/q.全局配置/*.csv*";
const TABLE = "GlobalConfigFromCsv";
const COMMAND = "select BinData from `GlobalConfigFromCsv` where Name=?";
const KEY_PREFIX = "GlobalConfigFromCsvByName";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGlobalConfigFromCsvByName.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configGlobalConfigFromCsvByName.GetConfig");
const CONFIG_STAT_PREFIX = "configGlobalConfigFromCsvByName.GetConfig(";
exports.configGlobalConfigFromCsvByName = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    i?.Start();
    var C = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (C) {
      if (n) {
        var t = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (e) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (C = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Name", o]) > 0) {
        t = undefined;
        [C, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Name", o]);
        if (C) {
          const e = GlobalConfigFromCsv_1.GlobalConfigFromCsv.getRootAsGlobalConfigFromCsv(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (n) {
            C = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(C, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=GlobalConfigFromCsvByName.js.map