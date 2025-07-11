"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMappingBySheetNameAndFieldName = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const Mapping_1 = require("../Config/Mapping");
const DB = "db_mapping.db";
const FILE = "s.数据枚举对应关系.xlsx";
const TABLE = "Mapping";
const COMMAND = "select BinData from `Mapping` where SheetName=? AND FieldName=?";
const KEY_PREFIX = "MappingBySheetNameAndFieldName";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMappingBySheetNameAndFieldName.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMappingBySheetNameAndFieldName.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configMappingBySheetNameAndFieldName.GetConfigList(";
exports.configMappingBySheetNameAndFieldName = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (n, i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${n}#${i})`);
    e?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var a = `${KEY_PREFIX}#${n}#${i})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (m) {
          e?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 2, i, ...logPair)) {
        const m = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["SheetName", n], ["FieldName", i]) !== 1) {
            break;
          }
          var g = undefined;
          [t, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["SheetName", n], ["FieldName", i]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            e?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          g = Mapping_1.Mapping.getRootAsMapping(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          m.push(g);
        }
        if (o) {
          a = `${KEY_PREFIX}#${n}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, m, m.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return m;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MappingBySheetNameAndFieldName.js.map