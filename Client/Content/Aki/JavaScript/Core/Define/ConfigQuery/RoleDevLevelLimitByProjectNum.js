"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoleDevLevelLimitByProjectNum = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoleDevLevelLimit_1 = require("../Config/RoleDevLevelLimit");
const DB = "db_roledev.db";
const FILE = "g.共鸣者培养计划.xlsx";
const TABLE = "RoleDevLevelLimit";
const COMMAND = "select BinData from `RoleDevLevelLimit` where ProjectNum=?";
const KEY_PREFIX = "RoleDevLevelLimitByProjectNum";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoleDevLevelLimitByProjectNum.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRoleDevLevelLimitByProjectNum.GetConfig");
const CONFIG_STAT_PREFIX = "configRoleDevLevelLimitByProjectNum.GetConfig(";
exports.configRoleDevLevelLimitByProjectNum = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var n = `${KEY_PREFIX}#${e})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (m) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ProjectNum", e]) > 0) {
        n = undefined;
        [t, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ProjectNum", e]);
        if (t) {
          const m = RoleDevLevelLimit_1.RoleDevLevelLimit.getRootAsRoleDevLevelLimit(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (o) {
            t = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, m);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RoleDevLevelLimitByProjectNum.js.map