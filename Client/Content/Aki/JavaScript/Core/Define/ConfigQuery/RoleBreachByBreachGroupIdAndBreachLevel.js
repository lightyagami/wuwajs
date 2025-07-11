"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoleBreachByBreachGroupIdAndBreachLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoleBreach_1 = require("../Config/RoleBreach");
const DB = "db_role_level.db";
const FILE = "j.角色升级突破.xlsx";
const TABLE = "RoleBreach";
const COMMAND = "select BinData from `RoleBreach` where BreachGroupId=? AND BreachLevel=?";
const KEY_PREFIX = "RoleBreachByBreachGroupIdAndBreachLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoleBreachByBreachGroupIdAndBreachLevel.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRoleBreachByBreachGroupIdAndBreachLevel.GetConfig");
const CONFIG_STAT_PREFIX = "configRoleBreachByBreachGroupIdAndBreachLevel.GetConfig(";
exports.configRoleBreachByBreachGroupIdAndBreachLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var r = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e}#${o})`);
    r?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (n) {
        var i = `${KEY_PREFIX}#${e}#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t) {
          r?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["BreachGroupId", e], ["BreachLevel", o]) > 0) {
        i = undefined;
        [a, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["BreachGroupId", e], ["BreachLevel", o]);
        if (a) {
          const t = RoleBreach_1.RoleBreach.getRootAsRoleBreach(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (n) {
            a = `${KEY_PREFIX}#${e}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    r?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RoleBreachByBreachGroupIdAndBreachLevel.js.map