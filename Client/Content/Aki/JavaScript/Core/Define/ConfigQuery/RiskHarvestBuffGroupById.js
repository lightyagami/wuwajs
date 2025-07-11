"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRiskHarvestBuffGroupById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RiskHarvestBuffGroup_1 = require("../Config/RiskHarvestBuffGroup");
const DB = "db_activity.db";
const FILE = "g.割草冒险活动.xlsx";
const TABLE = "RiskHarvestBuffGroup";
const COMMAND = "select BinData from `RiskHarvestBuffGroup` where Id = ?";
const KEY_PREFIX = "RiskHarvestBuffGroupById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRiskHarvestBuffGroupById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRiskHarvestBuffGroupById.GetConfig");
const CONFIG_STAT_PREFIX = "configRiskHarvestBuffGroupById.GetConfig(";
exports.configRiskHarvestBuffGroupById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (i) {
        var f = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (e) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        f = undefined;
        [n, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (n) {
          const e = RiskHarvestBuffGroup_1.RiskHarvestBuffGroup.getRootAsRiskHarvestBuffGroup(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          if (i) {
            n = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RiskHarvestBuffGroupById.js.map