"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoleBreachByBreachGroupId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoleBreach_1 = require("../Config/RoleBreach");
const DB = "db_role_level.db";
const FILE = "j.角色升级突破.xlsx";
const TABLE = "RoleBreach";
const COMMAND = "select BinData from `RoleBreach` where BreachGroupId=?";
const KEY_PREFIX = "RoleBreachByBreachGroupId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoleBreachByBreachGroupId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRoleBreachByBreachGroupId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configRoleBreachByBreachGroupId.GetConfigList(";
exports.configRoleBreachByBreachGroupId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (e) {
        var t = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["BreachGroupId", o]) !== 1) {
            break;
          }
          var r = undefined;
          [i, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["BreachGroupId", o]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = RoleBreach_1.RoleBreach.getRootAsRoleBreach(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          a.push(r);
        }
        if (e) {
          t = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RoleBreachByBreachGroupId.js.map