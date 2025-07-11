"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMapMarkByRelativeMainSubType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MapMark_1 = require("../Config/MapMark");
const DB = "db_map_mark.db";
const FILE = "d.地图标记.xlsx";
const TABLE = "MapMark";
const COMMAND = "select BinData from `MapMark` where RelativeType=? and RelativeSubType=?";
const KEY_PREFIX = "MapMarkByRelativeMainSubType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMapMarkByRelativeMainSubType.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMapMarkByRelativeMainSubType.GetConfig");
const CONFIG_STAT_PREFIX = "configMapMarkByRelativeMainSubType.GetConfig(";
exports.configMapMarkByRelativeMainSubType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${e})`);
    i?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (n) {
        var t = `${KEY_PREFIX}#${o}#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["RelativeType", o], ["RelativeSubType", e]) > 0) {
        t = undefined;
        [a, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RelativeType", o], ["RelativeSubType", e]);
        if (a) {
          const C = MapMark_1.MapMark.getRootAsMapMark(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (n) {
            a = `${KEY_PREFIX}#${o}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, C);
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
//# sourceMappingURL=MapMarkByRelativeMainSubType.js.map