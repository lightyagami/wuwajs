"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configEntityVoxelInfoByMapIdAndEntityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const EntityVoxelInfo_1 = require("../Config/EntityVoxelInfo");
const DB = "db_entityvoxelinfo.db";
const FILE = "UniverseEditor/EntityVoxelInfo.csv";
const TABLE = "EntityVoxelInfo";
const COMMAND = "select BinData from `EntityVoxelInfo` where MapId=? and EntityId=?";
const KEY_PREFIX = "EntityVoxelInfoByMapIdAndEntityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configEntityVoxelInfoByMapIdAndEntityId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configEntityVoxelInfoByMapIdAndEntityId.GetConfig");
const CONFIG_STAT_PREFIX = "configEntityVoxelInfoByMapIdAndEntityId.GetConfig(";
exports.configEntityVoxelInfoByMapIdAndEntityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n}#${o})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (t) {
        var f = `${KEY_PREFIX}#${n}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (C) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MapId", n], ["EntityId", o]) > 0) {
        f = undefined;
        [e, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MapId", n], ["EntityId", o]);
        if (e) {
          const C = EntityVoxelInfo_1.EntityVoxelInfo.getRootAsEntityVoxelInfo(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          if (t) {
            e = `${KEY_PREFIX}#${n}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=EntityVoxelInfoByMapIdAndEntityId.js.map