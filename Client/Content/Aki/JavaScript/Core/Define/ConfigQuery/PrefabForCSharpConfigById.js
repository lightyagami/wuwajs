"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPrefabForCSharpConfigById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PrefabForCSharpConfig_1 = require("../Config/PrefabForCSharpConfig");
const DB = "db_prefab_csharp.db";
const FILE = "UniverseEditor/Entity/PrefabForCSharp.csv";
const TABLE = "PrefabForCSharpConfig";
const COMMAND = "select BinData from `PrefabForCSharpConfig` where Id=?";
const KEY_PREFIX = "PrefabForCSharpConfigById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPrefabForCSharpConfigById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPrefabForCSharpConfigById.GetConfig");
const CONFIG_STAT_PREFIX = "configPrefabForCSharpConfigById.GetConfig(";
exports.configPrefabForCSharpConfigById = {
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
    var r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (r) {
      if (n) {
        var C = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (e) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (r = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        C = undefined;
        [r, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (r) {
          const e = PrefabForCSharpConfig_1.PrefabForCSharpConfig.getRootAsPrefabForCSharpConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (n) {
            r = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(r, e);
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
//# sourceMappingURL=PrefabForCSharpConfigById.js.map