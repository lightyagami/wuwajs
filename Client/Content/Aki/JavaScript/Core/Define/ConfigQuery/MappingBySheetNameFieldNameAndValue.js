"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMappingBySheetNameFieldNameAndValue = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const Mapping_1 = require("../Config/Mapping");
const DB = "db_mapping.db";
const FILE = "s.数据枚举对应关系.xlsx";
const TABLE = "Mapping";
const COMMAND = "select BinData from `Mapping` where SheetName=? AND FieldName=? AND Value=?";
const KEY_PREFIX = "MappingBySheetNameFieldNameAndValue";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMappingBySheetNameFieldNameAndValue.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMappingBySheetNameFieldNameAndValue.GetConfig");
const CONFIG_STAT_PREFIX = "configMappingBySheetNameFieldNameAndValue.GetConfig(";
exports.configMappingBySheetNameFieldNameAndValue = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, n, o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var a = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e}#${n}#${o})`);
    a?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var g = `${KEY_PREFIX}#${e}#${n}#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (m) {
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["SheetName", e], ["FieldName", n], ["Value", o]) > 0) {
        g = undefined;
        [t, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["SheetName", e], ["FieldName", n], ["Value", o]);
        if (t) {
          const m = Mapping_1.Mapping.getRootAsMapping(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          if (i) {
            t = `${KEY_PREFIX}#${e}#${n}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, m);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MappingBySheetNameFieldNameAndValue.js.map