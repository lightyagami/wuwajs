"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configNpcGroupPerformConfigByRoleIdAndNpcPerformType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const NpcGroupPerformConfig_1 = require("../Config/NpcGroupPerformConfig");
const DB = "db_npcgroupperformconfig.db";
const FILE = "k.可视化编辑/c.Csv/n.NPC组合表演配置/*.csv*";
const TABLE = "NpcGroupPerformConfig";
const COMMAND = "select BinData from `NpcGroupPerformConfig` where PerformType=? And RoleId=? And NpcType=?";
const KEY_PREFIX = "NpcGroupPerformConfigByRoleIdAndNpcPerformType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configNpcGroupPerformConfigByRoleIdAndNpcPerformType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configNpcGroupPerformConfigByRoleIdAndNpcPerformType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configNpcGroupPerformConfigByRoleIdAndNpcPerformType.GetConfigList(";
exports.configNpcGroupPerformConfigByRoleIdAndNpcPerformType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n, e, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var r = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o}#${n}#${e})`);
    r?.Start();
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (i) {
        var t = `${KEY_PREFIX}#${o}#${n}#${e})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g) {
          r?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 3, e, ...logPair)) {
        const g = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["PerformType", o], ["RoleId", n], ["NpcType", e]) !== 1) {
            break;
          }
          var C = undefined;
          [f, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["PerformType", o], ["RoleId", n], ["NpcType", e]);
          if (!f) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            r?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = NpcGroupPerformConfig_1.NpcGroupPerformConfig.getRootAsNpcGroupPerformConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          g.push(C);
        }
        if (i) {
          t = `${KEY_PREFIX}#${o}#${n}#${e})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, g, g.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        r?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return g;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    r?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=NpcGroupPerformConfigByRoleIdAndNpcPerformType.js.map