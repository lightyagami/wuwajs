"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMotorParkourAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MotorParkour_1 = require("../Config/MotorParkour");
const DB = "db_motorparkour.db";
const FILE = "m.摩托跑酷.xlsx";
const TABLE = "MotorParkour";
const COMMAND = "select BinData from `MotorParkour`";
const KEY_PREFIX = "MotorParkourAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMotorParkourAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMotorParkourAll.GetConfigList");
exports.configMotorParkourAll = {
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
        var n = KEY_PREFIX + ")";
        const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (r) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      const r = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!t) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        i = MotorParkour_1.MotorParkour.getRootAsMotorParkour(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
        r.push(i);
      }
      if (o) {
        n = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(n, r, r.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return r;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MotorParkourAll.js.map