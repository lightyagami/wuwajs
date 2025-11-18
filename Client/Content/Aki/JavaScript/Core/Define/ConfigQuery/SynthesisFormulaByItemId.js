"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSynthesisFormulaByItemId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SynthesisFormula_1 = require("../Config/SynthesisFormula");
const DB = "db_compose.db";
const FILE = "h.合成.xlsx";
const TABLE = "SynthesisFormula";
const COMMAND = "select BinData from `SynthesisFormula` where ItemId=?";
const KEY_PREFIX = "SynthesisFormulaByItemId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSynthesisFormulaByItemId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSynthesisFormulaByItemId.GetConfig");
const CONFIG_STAT_PREFIX = "configSynthesisFormulaByItemId.GetConfig(";
exports.configSynthesisFormulaByItemId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var e = `${KEY_PREFIX}#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (m) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ItemId", o]) > 0) {
        e = undefined;
        [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ItemId", o]);
        if (i) {
          const m = SynthesisFormula_1.SynthesisFormula.getRootAsSynthesisFormula(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (n) {
            i = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, m);
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
//# sourceMappingURL=SynthesisFormulaByItemId.js.map