"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configEntityGravityConfigByMapIdAndEntityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const EntityGravityConfig_1 = require("../Config/EntityGravityConfig");
const DB = "db_entitygravity.db";
const FILE = "UniverseEditor/Gravity/重力方向_Json_GravityAbnormalEntityList.csv";
const TABLE = "EntityGravityConfig";
const COMMAND = "select BinData from `EntityGravityConfig` where MapId=? And EntityId=?";
const KEY_PREFIX = "EntityGravityConfigByMapIdAndEntityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configEntityGravityConfigByMapIdAndEntityId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configEntityGravityConfigByMapIdAndEntityId.GetConfig");
const CONFIG_STAT_PREFIX = "configEntityGravityConfigByMapIdAndEntityId.GetConfig(";
exports.configEntityGravityConfigByMapIdAndEntityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t}#${n})`);
    o?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (i) {
        var C = `${KEY_PREFIX}#${t}#${n})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (e) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MapId", t], ["EntityId", n]) > 0) {
        C = undefined;
        [a, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MapId", t], ["EntityId", n]);
        if (a) {
          const e = EntityGravityConfig_1.EntityGravityConfig.getRootAsEntityGravityConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (i) {
            a = `${KEY_PREFIX}#${t}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=EntityGravityConfigByMapIdAndEntityId.js.map