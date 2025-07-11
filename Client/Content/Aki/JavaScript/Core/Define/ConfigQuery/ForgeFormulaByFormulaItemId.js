"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configForgeFormulaByFormulaItemId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ForgeFormula_1 = require("../Config/ForgeFormula");
const DB = "db_forge.db";
const FILE = "d.锻造.xlsx";
const TABLE = "ForgeFormula";
const COMMAND = "select BinData from `ForgeFormula` where FormulaItemId=?";
const KEY_PREFIX = "ForgeFormulaByFormulaItemId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configForgeFormulaByFormulaItemId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configForgeFormulaByFormulaItemId.GetConfig");
const CONFIG_STAT_PREFIX = "configForgeFormulaByFormulaItemId.GetConfig(";
exports.configForgeFormulaByFormulaItemId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    e?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var i = `${KEY_PREFIX}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["FormulaItemId", o]) > 0) {
        i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["FormulaItemId", o]);
        if (t) {
          const r = ForgeFormula_1.ForgeFormula.getRootAsForgeFormula(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (n) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ForgeFormulaByFormulaItemId.js.map