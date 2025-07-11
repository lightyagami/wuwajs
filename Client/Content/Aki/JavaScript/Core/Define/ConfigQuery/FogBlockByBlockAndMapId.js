"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFogBlockByBlockAndMapId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FogBlock_1 = require("../Config/FogBlock");
const DB = "db_mapfog.db";
const FILE = "d.地图迷雾.xlsx";
const TABLE = "FogBlock";
const COMMAND = "select BinData from `FogBlock` where Block=? And MapId=?";
const KEY_PREFIX = "FogBlockByBlockAndMapId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFogBlockByBlockAndMapId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configFogBlockByBlockAndMapId.GetConfig");
const CONFIG_STAT_PREFIX = "configFogBlockByBlockAndMapId.GetConfig(";
exports.configFogBlockByBlockAndMapId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${n})`);
    t?.Start();
    var g = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (g) {
      if (i) {
        var e = `${KEY_PREFIX}#${o}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (g = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Block", o], ["MapId", n]) > 0) {
        e = undefined;
        [g, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Block", o], ["MapId", n]);
        if (g) {
          const C = FogBlock_1.FogBlock.getRootAsFogBlock(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (i) {
            g = `${KEY_PREFIX}#${o}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(g, C);
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
//# sourceMappingURL=FogBlockByBlockAndMapId.js.map