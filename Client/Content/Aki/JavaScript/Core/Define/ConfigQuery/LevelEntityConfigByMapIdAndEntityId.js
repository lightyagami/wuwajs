"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configLevelEntityConfigByMapIdAndEntityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LevelEntityConfig_1 = require("../Config/LevelEntityConfig");
const DB = "db_level_entity.db";
const FILE = "UniverseEditor/Entity/LevelEntity.csv";
const TABLE = "LevelEntityConfig";
const COMMAND = "select BinData from `LevelEntityConfig` where MapId=? and EntityId=?";
const KEY_PREFIX = "LevelEntityConfigByMapIdAndEntityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configLevelEntityConfigByMapIdAndEntityId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configLevelEntityConfigByMapIdAndEntityId.GetConfig");
const CONFIG_STAT_PREFIX = "configLevelEntityConfigByMapIdAndEntityId.GetConfig(";
exports.configLevelEntityConfigByMapIdAndEntityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, t, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n}#${t})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (o) {
        var C = `${KEY_PREFIX}#${n}#${t})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (f) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MapId", n], ["EntityId", t]) > 0) {
        C = undefined;
        [e, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MapId", n], ["EntityId", t]);
        if (e) {
          const f = LevelEntityConfig_1.LevelEntityConfig.getRootAsLevelEntityConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (o) {
            e = `${KEY_PREFIX}#${n}#${t})`;
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
//# sourceMappingURL=LevelEntityConfigByMapIdAndEntityId.js.map