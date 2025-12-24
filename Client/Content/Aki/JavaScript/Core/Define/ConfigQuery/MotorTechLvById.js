"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMotorTechLvById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MotorTechLv_1 = require("../Config/MotorTechLv");
const DB = "db_motor.db";
const FILE = "m.摩托车.xlsx";
const TABLE = "MotorTechLv";
const COMMAND = "select BinData from `MotorTechLv` where Id=?";
const KEY_PREFIX = "MotorTechLvById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMotorTechLvById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMotorTechLvById.GetConfig");
const CONFIG_STAT_PREFIX = "configMotorTechLvById.GetConfig(";
exports.configMotorTechLvById = {
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
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
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
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        i = undefined;
        [e, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (e) {
          const C = MotorTechLv_1.MotorTechLv.getRootAsMotorTechLv(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, C);
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
//# sourceMappingURL=MotorTechLvById.js.map