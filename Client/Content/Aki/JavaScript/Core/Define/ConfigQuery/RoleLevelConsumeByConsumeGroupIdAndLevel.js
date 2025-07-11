"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoleLevelConsumeByConsumeGroupIdAndLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoleLevelConsume_1 = require("../Config/RoleLevelConsume");
const DB = "db_role_level.db";
const FILE = "j.角色升级突破.xlsx";
const TABLE = "RoleLevelConsume";
const COMMAND = "select BinData from `RoleLevelConsume` where ConsumeGroupId=? AND Level=?";
const KEY_PREFIX = "RoleLevelConsumeByConsumeGroupIdAndLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoleLevelConsumeByConsumeGroupIdAndLevel.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRoleLevelConsumeByConsumeGroupIdAndLevel.GetConfig");
const CONFIG_STAT_PREFIX = "configRoleLevelConsumeByConsumeGroupIdAndLevel.GetConfig(";
exports.configRoleLevelConsumeByConsumeGroupIdAndLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var C = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${e})`);
    C?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var t = `${KEY_PREFIX}#${o}#${e})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (l) {
          C?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ConsumeGroupId", o], ["Level", e]) > 0) {
        t = undefined;
        [i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ConsumeGroupId", o], ["Level", e]);
        if (i) {
          const l = RoleLevelConsume_1.RoleLevelConsume.getRootAsRoleLevelConsume(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (n) {
            i = `${KEY_PREFIX}#${o}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, l);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          C?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    C?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RoleLevelConsumeByConsumeGroupIdAndLevel.js.map