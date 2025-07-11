"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRiskHarvestInstByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RiskHarvestInst_1 = require("../Config/RiskHarvestInst");
const DB = "db_activity.db";
const FILE = "g.割草冒险活动.xlsx";
const TABLE = "RiskHarvestInst";
const COMMAND = "select BinData from `RiskHarvestInst` where ActivityId = ?";
const KEY_PREFIX = "RiskHarvestInstByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRiskHarvestInstByActivityId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRiskHarvestInstByActivityId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configRiskHarvestInstByActivityId.GetConfigList(";
exports.configRiskHarvestInstByActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${t})`);
    o?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (i) {
        var e = `${KEY_PREFIX}#${t})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          o?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActivityId", t]) !== 1) {
            break;
          }
          var s = undefined;
          [n, s] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", t]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            o?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          s = RiskHarvestInst_1.RiskHarvestInst.getRootAsRiskHarvestInst(new byte_buffer_1.ByteBuffer(new Uint8Array(s.buffer)));
          a.push(s);
        }
        if (i) {
          e = `${KEY_PREFIX}#${t})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        o?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RiskHarvestInstByActivityId.js.map