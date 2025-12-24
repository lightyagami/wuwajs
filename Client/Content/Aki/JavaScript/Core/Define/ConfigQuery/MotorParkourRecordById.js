"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMotorParkourRecordById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MotorParkourRecord_1 = require("../Config/MotorParkourRecord");
const DB = "db_motorparkour.db";
const FILE = "m.摩托跑酷.xlsx";
const TABLE = "MotorParkourRecord";
const COMMAND = "select BinData from `MotorParkourRecord` where Id=?";
const KEY_PREFIX = "MotorParkourRecordById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMotorParkourRecordById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMotorParkourRecordById.GetConfig");
const CONFIG_STAT_PREFIX = "configMotorParkourRecordById.GetConfig(";
exports.configMotorParkourRecordById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, r = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (r) {
        var e = `${KEY_PREFIX}#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        e = undefined;
        [t, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (t) {
          const i = MotorParkourRecord_1.MotorParkourRecord.getRootAsMotorParkourRecord(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (r) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MotorParkourRecordById.js.map