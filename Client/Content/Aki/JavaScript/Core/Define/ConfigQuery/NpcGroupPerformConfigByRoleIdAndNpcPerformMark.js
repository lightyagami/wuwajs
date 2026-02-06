"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configNpcGroupPerformConfigByRoleIdAndNpcPerformMark = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const NpcGroupPerformConfig_1 = require("../Config/NpcGroupPerformConfig");
const DB = "db_npcgroupperformconfig.db";
const FILE = "k.可视化编辑/c.Csv/n.NPC组合表演配置/*.csv*";
const TABLE = "NpcGroupPerformConfig";
const COMMAND = "select BinData from `NpcGroupPerformConfig` where PerformMark=? And RoleId=? And NpcType=?";
const KEY_PREFIX = "NpcGroupPerformConfigByRoleIdAndNpcPerformMark";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configNpcGroupPerformConfigByRoleIdAndNpcPerformMark.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configNpcGroupPerformConfigByRoleIdAndNpcPerformMark.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configNpcGroupPerformConfigByRoleIdAndNpcPerformMark.GetConfigList(";
exports.configNpcGroupPerformConfigByRoleIdAndNpcPerformMark = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n, r, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o}#${n}#${r})`);
    e?.Start();
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (i) {
        var t = `${KEY_PREFIX}#${o}#${n}#${r})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g) {
          e?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 3, r, ...logPair)) {
        const g = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["PerformMark", o], ["RoleId", n], ["NpcType", r]) !== 1) {
            break;
          }
          var C = undefined;
          [f, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["PerformMark", o], ["RoleId", n], ["NpcType", r]);
          if (!f) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            e?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = NpcGroupPerformConfig_1.NpcGroupPerformConfig.getRootAsNpcGroupPerformConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          g.push(C);
        }
        if (i) {
          t = `${KEY_PREFIX}#${o}#${n}#${r})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, g, g.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return g;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=NpcGroupPerformConfigByRoleIdAndNpcPerformMark.js.map