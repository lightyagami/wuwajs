"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSurvivorsActivityConfigById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SurvivorsActivityConfig_1 = require("../Config/SurvivorsActivityConfig");
const DB = "db_survivors.db";
const FILE = "x.幸存者_活动.xlsx";
const TABLE = "SurvivorsActivityConfig";
const COMMAND = "select BinData from `SurvivorsActivityConfig` where Id=?";
const KEY_PREFIX = "SurvivorsActivityConfigById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSurvivorsActivityConfigById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSurvivorsActivityConfigById.GetConfig");
const CONFIG_STAT_PREFIX = "configSurvivorsActivityConfigById.GetConfig(";
exports.configSurvivorsActivityConfigById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var C = `${KEY_PREFIX}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (r) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        C = undefined;
        [t, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (t) {
          const r = SurvivorsActivityConfig_1.SurvivorsActivityConfig.getRootAsSurvivorsActivityConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (i) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SurvivorsActivityConfigById.js.map