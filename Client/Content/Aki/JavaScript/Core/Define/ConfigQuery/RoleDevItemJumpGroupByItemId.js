"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoleDevItemJumpGroupByItemId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoleDevItemJumpGroup_1 = require("../Config/RoleDevItemJumpGroup");
const DB = "db_roledev.db";
const FILE = "g.共鸣者培养计划.xlsx";
const TABLE = "RoleDevItemJumpGroup";
const COMMAND = "select BinData from `RoleDevItemJumpGroup` where ItemId=?";
const KEY_PREFIX = "RoleDevItemJumpGroupByItemId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoleDevItemJumpGroupByItemId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRoleDevItemJumpGroupByItemId.GetConfig");
const CONFIG_STAT_PREFIX = "configRoleDevItemJumpGroupByItemId.GetConfig(";
exports.configRoleDevItemJumpGroupByItemId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (e) {
        var i = `${KEY_PREFIX}#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (m) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ItemId", o]) > 0) {
        i = undefined;
        [n, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ItemId", o]);
        if (n) {
          const m = RoleDevItemJumpGroup_1.RoleDevItemJumpGroup.getRootAsRoleDevItemJumpGroup(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (e) {
            n = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, m);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RoleDevItemJumpGroupByItemId.js.map