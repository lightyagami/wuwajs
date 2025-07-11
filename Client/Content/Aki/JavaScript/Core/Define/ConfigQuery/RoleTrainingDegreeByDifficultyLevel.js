"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoleTrainingDegreeByDifficultyLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoleTrainingDegree_1 = require("../Config/RoleTrainingDegree");
const DB = "db_roletrainingdegree.db";
const FILE = "j.角色练度标准.xlsx";
const TABLE = "RoleTrainingDegree";
const COMMAND = "select BinData from `RoleTrainingDegree` where DifficultyLevel = ?";
const KEY_PREFIX = "RoleTrainingDegreeByDifficultyLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoleTrainingDegreeByDifficultyLevel.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRoleTrainingDegreeByDifficultyLevel.GetConfig");
const CONFIG_STAT_PREFIX = "configRoleTrainingDegreeByDifficultyLevel.GetConfig(";
exports.configRoleTrainingDegreeByDifficultyLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    n?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (i) {
        var t = `${KEY_PREFIX}#${e})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["DifficultyLevel", e]) > 0) {
        t = undefined;
        [o, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["DifficultyLevel", e]);
        if (o) {
          const g = RoleTrainingDegree_1.RoleTrainingDegree.getRootAsRoleTrainingDegree(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (i) {
            o = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(o, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RoleTrainingDegreeByDifficultyLevel.js.map