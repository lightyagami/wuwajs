"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPreHeatTaskActivityById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PreHeatTaskActivity_1 = require("../Config/PreHeatTaskActivity");
const DB = "db_preheattaskactivity.db";
const FILE = "y.预热活动.xlsx";
const TABLE = "PreHeatTaskActivity";
const COMMAND = "select BinData from `PreHeatTaskActivity` where Id=?";
const KEY_PREFIX = "PreHeatTaskActivityById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPreHeatTaskActivityById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPreHeatTaskActivityById.GetConfig");
const CONFIG_STAT_PREFIX = "configPreHeatTaskActivityById.GetConfig(";
exports.configPreHeatTaskActivityById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t})`);
    o?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (i) {
        var n = `${KEY_PREFIX}#${t})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (a) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", t]) > 0) {
        n = undefined;
        [e, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", t]);
        if (e) {
          const a = PreHeatTaskActivity_1.PreHeatTaskActivity.getRootAsPreHeatTaskActivity(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (i) {
            e = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, a);
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
//# sourceMappingURL=PreHeatTaskActivityById.js.map