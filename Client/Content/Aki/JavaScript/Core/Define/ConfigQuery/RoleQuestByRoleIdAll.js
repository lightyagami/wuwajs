"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoleQuestByRoleIdAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoleQuest_1 = require("../Config/RoleQuest");
const DB = "db_rolequest.db";
const FILE = "j.角色任务.xlsx";
const TABLE = "RoleQuest";
const COMMAND = "select BinData from `RoleQuest` where RoleId =?";
const KEY_PREFIX = "RoleQuestByRoleIdAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoleQuestByRoleIdAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRoleQuestByRoleIdAll.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configRoleQuestByRoleIdAll.GetConfigList(";
exports.configRoleQuestByRoleIdAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (e) {
        var i = `${KEY_PREFIX}#${o})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (l) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const l = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["RoleId", o]) !== 1) {
            break;
          }
          var C = undefined;
          [n, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RoleId", o]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = RoleQuest_1.RoleQuest.getRootAsRoleQuest(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          l.push(C);
        }
        if (e) {
          i = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(i, l, l.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return l;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RoleQuestByRoleIdAll.js.map