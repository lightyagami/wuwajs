"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMapMarkByInstanceDungeonId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MapMark_1 = require("../Config/MapMark");
const DB = "db_map_mark.db";
const FILE = "d.地图标记.xlsx";
const TABLE = "MapMark";
const COMMAND = "select BinData from `MapMark` where InstanceDungeonId=?";
const KEY_PREFIX = "MapMarkByInstanceDungeonId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMapMarkByInstanceDungeonId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMapMarkByInstanceDungeonId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configMapMarkByInstanceDungeonId.GetConfigList(";
exports.configMapMarkByInstanceDungeonId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${n})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var a = `${KEY_PREFIX}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (g) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair)) {
        const g = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["InstanceDungeonId", n]) !== 1) {
            break;
          }
          var e = undefined;
          [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["InstanceDungeonId", n]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          e = MapMark_1.MapMark.getRootAsMapMark(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          g.push(e);
        }
        if (o) {
          a = `${KEY_PREFIX}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, g, g.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return g;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MapMarkByInstanceDungeonId.js.map