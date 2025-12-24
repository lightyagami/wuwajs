"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMotorEffectById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MotorEffect_1 = require("../Config/MotorEffect");
const DB = "db_motor.db";
const FILE = "m.摩托车.xlsx";
const TABLE = "MotorEffect";
const COMMAND = "select BinData from `MotorEffect` where Id=?";
const KEY_PREFIX = "MotorEffectById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMotorEffectById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMotorEffectById.GetConfig");
const CONFIG_STAT_PREFIX = "configMotorEffectById.GetConfig(";
exports.configMotorEffectById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (t) {
        var e = `${KEY_PREFIX}#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        e = undefined;
        [f, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (f) {
          const i = MotorEffect_1.MotorEffect.getRootAsMotorEffect(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            f = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(f, i);
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
//# sourceMappingURL=MotorEffectById.js.map