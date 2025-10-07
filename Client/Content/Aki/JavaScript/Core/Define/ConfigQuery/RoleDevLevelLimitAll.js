"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoleDevLevelLimitAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoleDevLevelLimit_1 = require("../Config/RoleDevLevelLimit");
const DB = "db_roledev.db";
const FILE = "g.共鸣者培养计划.xlsx";
const TABLE = "RoleDevLevelLimit";
const COMMAND = "select BinData from `RoleDevLevelLimit`";
const KEY_PREFIX = "RoleDevLevelLimitAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoleDevLevelLimitAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRoleDevLevelLimitAll.GetConfigList");
exports.configRoleDevLevelLimitAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var e;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var i = KEY_PREFIX + ")";
        const n = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (n) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return n;
        }
      }
      const n = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var t = undefined;
        [e, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!e) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        t = RoleDevLevelLimit_1.RoleDevLevelLimit.getRootAsRoleDevLevelLimit(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
        n.push(t);
      }
      if (o) {
        i = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(i, n, n.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return n;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RoleDevLevelLimitAll.js.map