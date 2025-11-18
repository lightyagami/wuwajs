"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configLevelEntityForCSharpConfigByMapIdAndEntityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LevelEntityForCSharpConfig_1 = require("../Config/LevelEntityForCSharpConfig");
const DB = "db_level_entity_csharp.db";
const FILE = "UniverseEditor/Entity/LevelEntityForCSharp.csv";
const TABLE = "LevelEntityForCSharpConfig";
const COMMAND = "select BinData from `LevelEntityForCSharpConfig` where MapId=? and EntityId=?";
const KEY_PREFIX = "LevelEntityForCSharpConfigByMapIdAndEntityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configLevelEntityForCSharpConfigByMapIdAndEntityId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configLevelEntityForCSharpConfigByMapIdAndEntityId.GetConfig");
const CONFIG_STAT_PREFIX = "configLevelEntityForCSharpConfigByMapIdAndEntityId.GetConfig(";
exports.configLevelEntityForCSharpConfigByMapIdAndEntityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n}#${o})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (t) {
        var C = `${KEY_PREFIX}#${n}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (a) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MapId", n], ["EntityId", o]) > 0) {
        C = undefined;
        [e, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MapId", n], ["EntityId", o]);
        if (e) {
          const a = LevelEntityForCSharpConfig_1.LevelEntityForCSharpConfig.getRootAsLevelEntityForCSharpConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (t) {
            e = `${KEY_PREFIX}#${n}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=LevelEntityForCSharpConfigByMapIdAndEntityId.js.map