"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configLevelPlayNodeDataByKey = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LevelPlayNodeData_1 = require("../Config/LevelPlayNodeData");
const DB = "db_levelplaynodedata.db";
const FILE = "UniverseEditor/LevelPlay/节点_*";
const TABLE = "LevelPlayNodeData";
const COMMAND = "select BinData from `LevelPlayNodeData` where Key=?";
const KEY_PREFIX = "LevelPlayNodeDataByKey";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configLevelPlayNodeDataByKey.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configLevelPlayNodeDataByKey.GetConfig");
const CONFIG_STAT_PREFIX = "configLevelPlayNodeDataByKey.GetConfig(";
exports.configLevelPlayNodeDataByKey = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var a = `${KEY_PREFIX}#${e})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (i) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Key", e]) > 0) {
        a = undefined;
        [t, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Key", e]);
        if (t) {
          const i = LevelPlayNodeData_1.LevelPlayNodeData.getRootAsLevelPlayNodeData(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (o) {
            t = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=LevelPlayNodeDataByKey.js.map