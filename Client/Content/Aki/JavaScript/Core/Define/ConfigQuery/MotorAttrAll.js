"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMotorAttrAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MotorAttr_1 = require("../Config/MotorAttr");
const DB = "db_motor.db";
const FILE = "m.摩托车.xlsx";
const TABLE = "MotorAttr";
const COMMAND = "select BinData from `MotorAttr`";
const KEY_PREFIX = "MotorAttrAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMotorAttrAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMotorAttrAll.GetConfigList");
exports.configMotorAttrAll = {
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
        i = MotorAttr_1.MotorAttr.getRootAsMotorAttr(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
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
//# sourceMappingURL=MotorAttrAll.js.map