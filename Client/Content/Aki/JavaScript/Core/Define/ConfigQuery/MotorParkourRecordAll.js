"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMotorParkourRecordAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MotorParkourRecord_1 = require("../Config/MotorParkourRecord");
const DB = "db_motorparkour.db";
const FILE = "m.摩托跑酷.xlsx";
const TABLE = "MotorParkourRecord";
const COMMAND = "select BinData from `MotorParkourRecord`";
const KEY_PREFIX = "MotorParkourRecordAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMotorParkourRecordAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMotorParkourRecordAll.GetConfigList");
exports.configMotorParkourRecordAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var t;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var r = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (i) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      const i = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var n = undefined;
        [t, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!t) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        n = MotorParkourRecord_1.MotorParkourRecord.getRootAsMotorParkourRecord(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
        i.push(n);
      }
      if (o) {
        r = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(r, i, i.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return i;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MotorParkourRecordAll.js.map