"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMultiPlatformGuideStepById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MultiPlatformGuideStep_1 = require("../Config/MultiPlatformGuideStep");
const DB = "db_guide_new.db";
const FILE = "y.引导(新).xlsx";
const TABLE = "MultiPlatformGuideStep";
const COMMAND = "select BinData from `MultiPlatformGuideStep` where Id=?";
const KEY_PREFIX = "MultiPlatformGuideStepById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMultiPlatformGuideStepById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMultiPlatformGuideStepById.GetConfig");
const CONFIG_STAT_PREFIX = "configMultiPlatformGuideStepById.GetConfig(";
exports.configMultiPlatformGuideStepById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (t) {
        var n = `${KEY_PREFIX}#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (f) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        n = undefined;
        [e, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (e) {
          const f = MultiPlatformGuideStep_1.MultiPlatformGuideStep.getRootAsMultiPlatformGuideStep(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (t) {
            e = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MultiPlatformGuideStepById.js.map