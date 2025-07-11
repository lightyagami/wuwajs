"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSortRuleByIdAndDataId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SortRule_1 = require("../Config/SortRule");
const DB = "db_filter_sort.db";
const FILE = "s.筛选排序总表.xlsx";
const TABLE = "SortRule";
const COMMAND = "select BinData from `SortRule` where Id=? AND DataId = ?";
const KEY_PREFIX = "SortRuleByIdAndDataId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSortRuleByIdAndDataId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSortRuleByIdAndDataId.GetConfig");
const CONFIG_STAT_PREFIX = "configSortRuleByIdAndDataId.GetConfig(";
exports.configSortRuleByIdAndDataId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, t, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${t})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var a = `${KEY_PREFIX}#${o}#${t})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o], ["DataId", t]) > 0) {
        a = undefined;
        [e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o], ["DataId", t]);
        if (e) {
          const C = SortRule_1.SortRule.getRootAsSortRule(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${o}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SortRuleByIdAndDataId.js.map