"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configLevelPlayInfoMappingConfigById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LevelPlayInfoMappingConfig_1 = require("../Config/LevelPlayInfoMappingConfig");
const DB = "db_levelplayinfomappingconfig.db";
const FILE = "k.可视化编辑/c.Csv/w.玩法信息映射/*.csv*";
const TABLE = "LevelPlayInfoMappingConfig";
const COMMAND = "select BinData from `LevelPlayInfoMappingConfig` where Id=?";
const KEY_PREFIX = "LevelPlayInfoMappingConfigById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configLevelPlayInfoMappingConfigById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configLevelPlayInfoMappingConfigById.GetConfig");
const CONFIG_STAT_PREFIX = "configLevelPlayInfoMappingConfigById.GetConfig(";
exports.configLevelPlayInfoMappingConfigById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (o) {
        var f = `${KEY_PREFIX}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (g) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        f = undefined;
        [e, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (e) {
          const g = LevelPlayInfoMappingConfig_1.LevelPlayInfoMappingConfig.getRootAsLevelPlayInfoMappingConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          if (o) {
            e = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=LevelPlayInfoMappingConfigById.js.map