"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRegressTrialRoleAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RegressTrialRole_1 = require("../Config/RegressTrialRole");
const DB = "db_activity.db";
const FILE = "h.回流活动(新).xlsx";
const TABLE = "RegressTrialRole";
const COMMAND = "select BinData from `RegressTrialRole`";
const KEY_PREFIX = "RegressTrialRoleAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRegressTrialRoleAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRegressTrialRoleAll.GetConfigList");
exports.configRegressTrialRoleAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var i;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var e = KEY_PREFIX + ")";
        const n = ConfigCommon_1.ConfigCommon.GetConfig(e);
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
        [i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!i) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        t = RegressTrialRole_1.RegressTrialRole.getRootAsRegressTrialRole(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
        n.push(t);
      }
      if (o) {
        e = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(e, n, n.length);
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
//# sourceMappingURL=RegressTrialRoleAll.js.map