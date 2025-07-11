"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAbyssRoleLevelByLevelAndGroupId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AbyssRoleLevel_1 = require("../Config/AbyssRoleLevel");
const DB = "db_dangoabysssuit.db";
const FILE = "s.深渊爬塔.xlsx";
const TABLE = "AbyssRoleLevel";
const COMMAND = "select BinData from `AbyssRoleLevel` where Level=? AND GroupId=?";
const KEY_PREFIX = "AbyssRoleLevelByLevelAndGroupId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAbyssRoleLevelByLevelAndGroupId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configAbyssRoleLevelByLevelAndGroupId.GetConfig");
const CONFIG_STAT_PREFIX = "configAbyssRoleLevelByLevelAndGroupId.GetConfig(";
exports.configAbyssRoleLevelByLevelAndGroupId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${e})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var l = `${KEY_PREFIX}#${o}#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(l);
        if (C) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Level", o], ["GroupId", e]) > 0) {
        l = undefined;
        [t, l] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Level", o], ["GroupId", e]);
        if (t) {
          const C = AbyssRoleLevel_1.AbyssRoleLevel.getRootAsAbyssRoleLevel(new byte_buffer_1.ByteBuffer(new Uint8Array(l.buffer)));
          if (n) {
            t = `${KEY_PREFIX}#${o}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=AbyssRoleLevelByLevelAndGroupId.js.map