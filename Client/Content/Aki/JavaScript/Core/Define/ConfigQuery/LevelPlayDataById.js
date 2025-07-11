"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configLevelPlayDataById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LevelPlayData_1 = require("../Config/LevelPlayData");
const DB = "db_levelplaydata.db";
const FILE = "UniverseEditor/LevelPlay/玩法*";
const TABLE = "LevelPlayData";
const COMMAND = "select BinData from `LevelPlayData` where LevelPlayId=?";
const KEY_PREFIX = "LevelPlayDataById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configLevelPlayDataById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configLevelPlayDataById.GetConfig");
const CONFIG_STAT_PREFIX = "configLevelPlayDataById.GetConfig(";
exports.configLevelPlayDataById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var a = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    a?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var t = `${KEY_PREFIX}#${e})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (i) {
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["LevelPlayId", e]) > 0) {
        t = undefined;
        [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["LevelPlayId", e]);
        if (n) {
          const i = LevelPlayData_1.LevelPlayData.getRootAsLevelPlayData(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (o) {
            n = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=LevelPlayDataById.js.map