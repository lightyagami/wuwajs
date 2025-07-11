"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMapBorderByBorderId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MapBorder_1 = require("../Config/MapBorder");
const DB = "db_map.db";
const FILE = "d.地图.xlsx";
const TABLE = "MapBorder";
const COMMAND = "select BinData from `MapBorder` where BorderId=?";
const KEY_PREFIX = "MapBorderByBorderId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMapBorderByBorderId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMapBorderByBorderId.GetConfig");
const CONFIG_STAT_PREFIX = "configMapBorderByBorderId.GetConfig(";
exports.configMapBorderByBorderId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    e?.Start();
    var r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (r) {
      if (n) {
        var i = `${KEY_PREFIX}#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (r = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["BorderId", o]) > 0) {
        i = undefined;
        [r, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["BorderId", o]);
        if (r) {
          const t = MapBorder_1.MapBorder.getRootAsMapBorder(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (n) {
            r = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(r, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MapBorderByBorderId.js.map