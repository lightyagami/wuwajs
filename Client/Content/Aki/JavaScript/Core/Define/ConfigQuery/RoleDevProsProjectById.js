"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoleDevProsProjectById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoleDevProsProject_1 = require("../Config/RoleDevProsProject");
const DB = "db_roledev.db";
const FILE = "g.共鸣者培养计划.xlsx";
const TABLE = "RoleDevProsProject";
const COMMAND = "select BinData from `RoleDevProsProject` where Id=?";
const KEY_PREFIX = "RoleDevProsProjectById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoleDevProsProjectById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRoleDevProsProjectById.GetConfig");
const CONFIG_STAT_PREFIX = "configRoleDevProsProjectById.GetConfig(";
exports.configRoleDevProsProjectById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (e) {
        var i = `${KEY_PREFIX}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (t) {
          const r = RoleDevProsProject_1.RoleDevProsProject.getRootAsRoleDevProsProject(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (e) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RoleDevProsProjectById.js.map