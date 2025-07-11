"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMapBorderByBorderIdAndMapId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MapBorder_1 = require("../Config/MapBorder");
const DB = "db_map.db";
const FILE = "d.地图.xlsx";
const TABLE = "MapBorder";
const COMMAND = "select BinData from `MapBorder` where BorderId=? and MapId=?";
const KEY_PREFIX = "MapBorderByBorderIdAndMapId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMapBorderByBorderIdAndMapId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMapBorderByBorderIdAndMapId.GetConfig");
const CONFIG_STAT_PREFIX = "configMapBorderByBorderIdAndMapId.GetConfig(";
exports.configMapBorderByBorderIdAndMapId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var r = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${n})`);
    r?.Start();
    var d = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (d) {
      if (e) {
        var i = `${KEY_PREFIX}#${o}#${n})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t) {
          r?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (d = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["BorderId", o], ["MapId", n]) > 0) {
        i = undefined;
        [d, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["BorderId", o], ["MapId", n]);
        if (d) {
          const t = MapBorder_1.MapBorder.getRootAsMapBorder(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (e) {
            d = `${KEY_PREFIX}#${o}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(d, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    r?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MapBorderByBorderIdAndMapId.js.map