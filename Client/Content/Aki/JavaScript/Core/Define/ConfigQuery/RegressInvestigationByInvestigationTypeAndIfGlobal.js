"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRegressInvestigationByInvestigationTypeAndIfGlobal = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RegressInvestigation_1 = require("../Config/RegressInvestigation");
const DB = "db_activity.db";
const FILE = "h.回流活动(新).xlsx";
const TABLE = "RegressInvestigation";
const COMMAND = "select BinData from `RegressInvestigation` where InvestigationType=? And IfGlobal=?";
const KEY_PREFIX = "RegressInvestigationByInvestigationTypeAndIfGlobal";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRegressInvestigationByInvestigationTypeAndIfGlobal.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRegressInvestigationByInvestigationTypeAndIfGlobal.GetConfig");
const CONFIG_STAT_PREFIX = "configRegressInvestigationByInvestigationTypeAndIfGlobal.GetConfig(";
exports.configRegressInvestigationByInvestigationTypeAndIfGlobal = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n}#${o})`);
    t?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (i) {
        var g = `${KEY_PREFIX}#${n}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (a) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindBool(handleId, 2, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["InvestigationType", n], ["IfGlobal", o]) > 0) {
        g = undefined;
        [e, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["InvestigationType", n], ["IfGlobal", o]);
        if (e) {
          const a = RegressInvestigation_1.RegressInvestigation.getRootAsRegressInvestigation(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          if (i) {
            e = `${KEY_PREFIX}#${n}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RegressInvestigationByInvestigationTypeAndIfGlobal.js.map