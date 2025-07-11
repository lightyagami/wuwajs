"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configLevelPlayInfoMappingConfigAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LevelPlayInfoMappingConfig_1 = require("../Config/LevelPlayInfoMappingConfig");
const DB = "db_levelplayinfomappingconfig.db";
const FILE = "k.可视化编辑/c.Csv/w.玩法信息映射/*.csv*";
const TABLE = "LevelPlayInfoMappingConfig";
const COMMAND = "select BinData from `LevelPlayInfoMappingConfig`";
const KEY_PREFIX = "LevelPlayInfoMappingConfigAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configLevelPlayInfoMappingConfigAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configLevelPlayInfoMappingConfigAll.GetConfigList");
exports.configLevelPlayInfoMappingConfigAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (n = true) => {
    var o;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (n) {
        var i = KEY_PREFIX + ")";
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      const t = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var e = undefined;
        [o, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!o) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        e = LevelPlayInfoMappingConfig_1.LevelPlayInfoMappingConfig.getRootAsLevelPlayInfoMappingConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
        t.push(e);
      }
      if (n) {
        i = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(i, t, t.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return t;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=LevelPlayInfoMappingConfigAll.js.map