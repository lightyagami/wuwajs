"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGachaRoleDevelopInsByRoleId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GachaRoleDevelopIns_1 = require("../Config/GachaRoleDevelopIns");
const DB = "db_gacharoledevelop.db";
const FILE = "d.当期卡池角色养成推荐.xlsx";
const TABLE = "GachaRoleDevelopIns";
const COMMAND = "select BinData from `GachaRoleDevelopIns` where RoleId=?";
const KEY_PREFIX = "GachaRoleDevelopInsByRoleId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGachaRoleDevelopInsByRoleId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configGachaRoleDevelopInsByRoleId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configGachaRoleDevelopInsByRoleId.GetConfigList(";
exports.configGachaRoleDevelopInsByRoleId = {
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
        const l = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (l) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const l = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["RoleId", o]) !== 1) {
            break;
          }
          var a = undefined;
          [i, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RoleId", o]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = GachaRoleDevelopIns_1.GachaRoleDevelopIns.getRootAsGachaRoleDevelopIns(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          l.push(a);
        }
        if (e) {
          t = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, l, l.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return l;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=GachaRoleDevelopInsByRoleId.js.map