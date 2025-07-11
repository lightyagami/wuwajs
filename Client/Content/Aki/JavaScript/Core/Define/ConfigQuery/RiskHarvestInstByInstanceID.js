"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRiskHarvestInstByInstanceID = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RiskHarvestInst_1 = require("../Config/RiskHarvestInst");
const DB = "db_activity.db";
const FILE = "g.割草冒险活动.xlsx";
const TABLE = "RiskHarvestInst";
const COMMAND = "select BinData from `RiskHarvestInst` where InstanceID = ?";
const KEY_PREFIX = "RiskHarvestInstByInstanceID";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRiskHarvestInstByInstanceID.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRiskHarvestInstByInstanceID.GetConfig");
const CONFIG_STAT_PREFIX = "configRiskHarvestInstByInstanceID.GetConfig(";
exports.configRiskHarvestInstByInstanceID = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    o?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (t) {
        var e = `${KEY_PREFIX}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["InstanceID", n]) > 0) {
        e = undefined;
        [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["InstanceID", n]);
        if (i) {
          const a = RiskHarvestInst_1.RiskHarvestInst.getRootAsRiskHarvestInst(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            i = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RiskHarvestInstByInstanceID.js.map