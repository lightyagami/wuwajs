"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMotorFightBuffGateRefreshById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MotorFightBuffGateRefresh_1 = require("../Config/MotorFightBuffGateRefresh");
const DB = "db_motorfight.db";
const FILE = "m.摩托战斗_局内.xlsx";
const TABLE = "MotorFightBuffGateRefresh";
const COMMAND = "select BinData from `MotorFightBuffGateRefresh` where Id=?";
const KEY_PREFIX = "MotorFightBuffGateRefreshById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMotorFightBuffGateRefreshById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMotorFightBuffGateRefreshById.GetConfig");
const CONFIG_STAT_PREFIX = "configMotorFightBuffGateRefreshById.GetConfig(";
exports.configMotorFightBuffGateRefreshById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    e?.Start();
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (t) {
        var i = `${KEY_PREFIX}#${o})`;
        const n = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (n) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return n;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        i = undefined;
        [f, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (f) {
          const n = MotorFightBuffGateRefresh_1.MotorFightBuffGateRefresh.getRootAsMotorFightBuffGateRefresh(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (t) {
            f = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(f, n);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return n;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MotorFightBuffGateRefreshById.js.map