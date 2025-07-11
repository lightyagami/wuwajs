"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFogTextureConfigByBlockAndMapIdAndGravity = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FogTextureConfig_1 = require("../Config/FogTextureConfig");
const DB = "db_mapfog.db";
const FILE = "d.地图迷雾.xlsx";
const TABLE = "FogTextureConfig";
const COMMAND = "select BinData from `FogTextureConfig` where Block=? And MapId=? And GravityFlip=?";
const KEY_PREFIX = "FogTextureConfigByBlockAndMapIdAndGravity";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFogTextureConfigByBlockAndMapIdAndGravity.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configFogTextureConfigByBlockAndMapIdAndGravity.GetConfig");
const CONFIG_STAT_PREFIX = "configFogTextureConfigByBlockAndMapIdAndGravity.GetConfig(";
exports.configFogTextureConfigByBlockAndMapIdAndGravity = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n, i, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${n}#${i})`);
    e?.Start();
    var g = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (g) {
      if (t) {
        var C = `${KEY_PREFIX}#${o}#${n}#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (a) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (g = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Block", o], ["MapId", n], ["GravityFlip", i]) > 0) {
        C = undefined;
        [g, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Block", o], ["MapId", n], ["GravityFlip", i]);
        if (g) {
          const a = FogTextureConfig_1.FogTextureConfig.getRootAsFogTextureConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (t) {
            g = `${KEY_PREFIX}#${o}#${n}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(g, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FogTextureConfigByBlockAndMapIdAndGravity.js.map