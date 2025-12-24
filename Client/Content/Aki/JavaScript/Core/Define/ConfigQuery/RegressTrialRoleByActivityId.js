"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRegressTrialRoleByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RegressTrialRole_1 = require("../Config/RegressTrialRole");
const DB = "db_activity.db";
const FILE = "h.回流活动(新).xlsx";
const TABLE = "RegressTrialRole";
const COMMAND = "select BinData from `RegressTrialRole` where ActivityId=?";
const KEY_PREFIX = "RegressTrialRoleByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRegressTrialRoleByActivityId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRegressTrialRoleByActivityId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configRegressTrialRoleByActivityId.GetConfigList(";
exports.configRegressTrialRoleByActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${i})`);
    t?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (o) {
        var n = `${KEY_PREFIX}#${i})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (g) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair)) {
        const g = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActivityId", i]) !== 1) {
            break;
          }
          var r = undefined;
          [e, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", i]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = RegressTrialRole_1.RegressTrialRole.getRootAsRegressTrialRole(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          g.push(r);
        }
        if (o) {
          n = `${KEY_PREFIX}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(n, g, g.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return g;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RegressTrialRoleByActivityId.js.map