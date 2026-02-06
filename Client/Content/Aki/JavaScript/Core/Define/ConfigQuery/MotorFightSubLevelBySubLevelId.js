"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMotorFightSubLevelBySubLevelId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MotorFightSubLevel_1 = require("../Config/MotorFightSubLevel");
const DB = "db_motorfight.db";
const FILE = "m.摩托战斗_局内.xlsx";
const TABLE = "MotorFightSubLevel";
const COMMAND = "select BinData from `MotorFightSubLevel` where SubLevelId=?";
const KEY_PREFIX = "MotorFightSubLevelBySubLevelId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMotorFightSubLevelBySubLevelId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMotorFightSubLevelBySubLevelId.GetConfig");
const CONFIG_STAT_PREFIX = "configMotorFightSubLevelBySubLevelId.GetConfig(";
exports.configMotorFightSubLevelBySubLevelId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (e) {
        var n = `${KEY_PREFIX}#${o})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (g) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["SubLevelId", o]) > 0) {
        n = undefined;
        [i, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["SubLevelId", o]);
        if (i) {
          const g = MotorFightSubLevel_1.MotorFightSubLevel.getRootAsMotorFightSubLevel(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (e) {
            i = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MotorFightSubLevelBySubLevelId.js.map