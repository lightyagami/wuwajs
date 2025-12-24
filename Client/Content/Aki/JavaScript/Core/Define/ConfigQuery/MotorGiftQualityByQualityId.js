"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMotorGiftQualityByQualityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MotorGiftQuality_1 = require("../Config/MotorGiftQuality");
const DB = "db_motorskin.db";
const FILE = "m.礼包外显表.xlsx";
const TABLE = "MotorGiftQuality";
const COMMAND = "select BinData from `MotorGiftQuality` where QualityId=?";
const KEY_PREFIX = "MotorGiftQualityByQualityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMotorGiftQualityByQualityId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMotorGiftQualityByQualityId.GetConfig");
const CONFIG_STAT_PREFIX = "configMotorGiftQualityByQualityId.GetConfig(";
exports.configMotorGiftQualityByQualityId = {
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
        const f = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (f) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["QualityId", o]) > 0) {
        a = undefined;
        [n, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["QualityId", o]);
        if (n) {
          const f = MotorGiftQuality_1.MotorGiftQuality.getRootAsMotorGiftQuality(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (t) {
            n = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MotorGiftQualityByQualityId.js.map