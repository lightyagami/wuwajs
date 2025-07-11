"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configLevelEntityConfigByMapId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LevelEntityConfig_1 = require("../Config/LevelEntityConfig");
const DB = "db_level_entity.db";
const FILE = "UniverseEditor/Entity/LevelEntity.csv";
const TABLE = "LevelEntityConfig";
const COMMAND = "select BinData from `LevelEntityConfig` where MapId=?";
const KEY_PREFIX = "LevelEntityConfigByMapId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configLevelEntityConfigByMapId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configLevelEntityConfigByMapId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configLevelEntityConfigByMapId.GetConfigList(";
exports.configLevelEntityConfigByMapId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${n})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var e = `${KEY_PREFIX}#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (f) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair)) {
        const f = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["MapId", n]) !== 1) {
            break;
          }
          var C = undefined;
          [t, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MapId", n]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = LevelEntityConfig_1.LevelEntityConfig.getRootAsLevelEntityConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          f.push(C);
        }
        if (o) {
          e = `${KEY_PREFIX}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, f, f.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return f;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=LevelEntityConfigByMapId.js.map