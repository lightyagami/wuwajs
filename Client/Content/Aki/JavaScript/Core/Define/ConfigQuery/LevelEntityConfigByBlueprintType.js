"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configLevelEntityConfigByBlueprintType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LevelEntityConfig_1 = require("../Config/LevelEntityConfig");
const DB = "db_level_entity.db";
const FILE = "UniverseEditor/Entity/LevelEntity.csv";
const TABLE = "LevelEntityConfig";
const COMMAND = "select BinData from `LevelEntityConfig` where BlueprintType=?";
const KEY_PREFIX = "LevelEntityConfigByBlueprintType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configLevelEntityConfigByBlueprintType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configLevelEntityConfigByBlueprintType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configLevelEntityConfigByBlueprintType.GetConfigList(";
exports.configLevelEntityConfigByBlueprintType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${n})`);
    t?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (i) {
        var e = `${KEY_PREFIX}#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (f) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, n, ...logPair)) {
        const f = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["BlueprintType", n]) !== 1) {
            break;
          }
          var C = undefined;
          [o, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["BlueprintType", n]);
          if (!o) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = LevelEntityConfig_1.LevelEntityConfig.getRootAsLevelEntityConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          f.push(C);
        }
        if (i) {
          e = `${KEY_PREFIX}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, f, f.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return f;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=LevelEntityConfigByBlueprintType.js.map