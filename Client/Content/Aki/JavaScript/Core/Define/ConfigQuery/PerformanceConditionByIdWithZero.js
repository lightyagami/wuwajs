"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPerformanceConditionByIdWithZero = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PerformanceCondition_1 = require("../Config/PerformanceCondition");
const DB = "db_roleidle.db";
const FILE = "d.待机动作播放条件.xlsx";
const TABLE = "PerformanceCondition";
const COMMAND = "select BinData from `PerformanceCondition` where id=0 AND (SELECT count(0) from `PerformanceCondition` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `PerformanceCondition` WHERE id = ?) >0;";
const KEY_PREFIX = "PerformanceConditionByIdWithZero";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPerformanceConditionByIdWithZero.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPerformanceConditionByIdWithZero.GetConfig");
const CONFIG_STAT_PREFIX = "configPerformanceConditionByIdWithZero.GetConfig(";
exports.configPerformanceConditionByIdWithZero = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n, i, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${n}#${i})`);
    t?.Start();
    var r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (r) {
      if (e) {
        var C = `${KEY_PREFIX}#${o}#${n}#${i})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (f) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (r = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o], ["Id", n], ["Id", i]) > 0) {
        C = undefined;
        [r, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o], ["Id", n], ["Id", i]);
        if (r) {
          const f = PerformanceCondition_1.PerformanceCondition.getRootAsPerformanceCondition(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (e) {
            r = `${KEY_PREFIX}#${o}#${n}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(r, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PerformanceConditionByIdWithZero.js.map