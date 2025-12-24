"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMapRoadWaysByMapId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MapRoadWays_1 = require("../Config/MapRoadWays");
const DB = "db_map.db";
const FILE = "d.地图.xlsx";
const TABLE = "MapRoadWays";
const COMMAND = "select BinData from `MapRoadWays` where MapId=?";
const KEY_PREFIX = "MapRoadWaysByMapId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMapRoadWaysByMapId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMapRoadWaysByMapId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configMapRoadWaysByMapId.GetConfigList(";
exports.configMapRoadWaysByMapId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, a = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (a) {
        var t = `${KEY_PREFIX}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["MapId", o]) !== 1) {
            break;
          }
          var e = undefined;
          [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MapId", o]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          e = MapRoadWays_1.MapRoadWays.getRootAsMapRoadWays(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          C.push(e);
        }
        if (a) {
          t = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MapRoadWaysByMapId.js.map