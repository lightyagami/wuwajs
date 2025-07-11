"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRolePropertyGrowthByLevelAndBreachLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RolePropertyGrowth_1 = require("../Config/RolePropertyGrowth");
const DB = "db_property.db";
const FILE = "s.属性.xlsx";
const TABLE = "RolePropertyGrowth";
const COMMAND = "select BinData from `RolePropertyGrowth` where Level = ? AND BreachLevel = ?";
const KEY_PREFIX = "RolePropertyGrowthByLevelAndBreachLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRolePropertyGrowthByLevelAndBreachLevel.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRolePropertyGrowthByLevelAndBreachLevel.GetConfig");
const CONFIG_STAT_PREFIX = "configRolePropertyGrowthByLevelAndBreachLevel.GetConfig(";
exports.configRolePropertyGrowthByLevelAndBreachLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${e})`);
    n?.Start();
    var r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (r) {
      if (t) {
        var i = `${KEY_PREFIX}#${o}#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (r = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Level", o], ["BreachLevel", e]) > 0) {
        i = undefined;
        [r, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Level", o], ["BreachLevel", e]);
        if (r) {
          const C = RolePropertyGrowth_1.RolePropertyGrowth.getRootAsRolePropertyGrowth(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (t) {
            r = `${KEY_PREFIX}#${o}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(r, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RolePropertyGrowthByLevelAndBreachLevel.js.map