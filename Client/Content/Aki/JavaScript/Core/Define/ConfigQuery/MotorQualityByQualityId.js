"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMotorQualityByQualityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MotorQuality_1 = require("../Config/MotorQuality");
const DB = "db_motordiy.db";
const FILE = "m.摩托车自定义.xlsx";
const TABLE = "MotorQuality";
const COMMAND = "select BinData from `MotorQuality` where QualityId=?";
const KEY_PREFIX = "MotorQualityByQualityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMotorQualityByQualityId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMotorQualityByQualityId.GetConfig");
const CONFIG_STAT_PREFIX = "configMotorQualityByQualityId.GetConfig(";
exports.configMotorQualityByQualityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    i?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (t) {
        var a = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (e) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["QualityId", o]) > 0) {
        a = undefined;
        [n, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["QualityId", o]);
        if (n) {
          const e = MotorQuality_1.MotorQuality.getRootAsMotorQuality(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (t) {
            n = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MotorQualityByQualityId.js.map