"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDebugCommandConfigById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DebugCommandConfig_1 = require("../Config/DebugCommandConfig");
const DB = "db_debugview.db";
const FILE = "t.调试界面.xlsx";
const TABLE = "DebugCommandConfig";
const COMMAND = "select BinData from `DebugCommandConfig` where Id=?";
const KEY_PREFIX = "DebugCommandConfigById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDebugCommandConfigById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configDebugCommandConfigById.GetConfig");
const CONFIG_STAT_PREFIX = "configDebugCommandConfigById.GetConfig(";
exports.configDebugCommandConfigById = {
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
        var e = `${KEY_PREFIX}#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (t) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (C = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        e = undefined;
        [C, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (C) {
          const t = DebugCommandConfig_1.DebugCommandConfig.getRootAsDebugCommandConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (n) {
            C = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(C, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=DebugCommandConfigById.js.map