"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMotorParkourNPCById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MotorParkourNPC_1 = require("../Config/MotorParkourNPC");
const DB = "db_motorparkour.db";
const FILE = "m.摩托跑酷.xlsx";
const TABLE = "MotorParkourNPC";
const COMMAND = "select BinData from `MotorParkourNPC` where Id=?";
const KEY_PREFIX = "MotorParkourNPCById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMotorParkourNPCById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMotorParkourNPCById.GetConfig");
const CONFIG_STAT_PREFIX = "configMotorParkourNPCById.GetConfig(";
exports.configMotorParkourNPCById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    t?.Start();
    var r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (r) {
      if (n) {
        var i = `${KEY_PREFIX}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (r = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        i = undefined;
        [r, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (r) {
          const C = MotorParkourNPC_1.MotorParkourNPC.getRootAsMotorParkourNPC(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (n) {
            r = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(r, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MotorParkourNPCById.js.map