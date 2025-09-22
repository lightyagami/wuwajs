"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSurvivorsActivityConfigByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SurvivorsActivityConfig_1 = require("../Config/SurvivorsActivityConfig");
const DB = "db_survivors.db";
const FILE = "x.幸存者_活动.xlsx";
const TABLE = "SurvivorsActivityConfig";
const COMMAND = "select BinData from `SurvivorsActivityConfig` where ActivityId=?";
const KEY_PREFIX = "SurvivorsActivityConfigByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSurvivorsActivityConfigByActivityId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSurvivorsActivityConfigByActivityId.GetConfig");
const CONFIG_STAT_PREFIX = "configSurvivorsActivityConfigByActivityId.GetConfig(";
exports.configSurvivorsActivityConfigByActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var C = `${KEY_PREFIX}#${i})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (r) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ActivityId", i]) > 0) {
        C = undefined;
        [n, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", i]);
        if (n) {
          const r = SurvivorsActivityConfig_1.SurvivorsActivityConfig.getRootAsSurvivorsActivityConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (o) {
            n = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SurvivorsActivityConfigByActivityId.js.map