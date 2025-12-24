"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGeographyHandBookByTabType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GeographyHandBook_1 = require("../Config/GeographyHandBook");
const DB = "db_handbook.db";
const FILE = "t.图鉴系统.xlsx";
const TABLE = "GeographyHandBook";
const COMMAND = "select BinData from `GeographyHandBook` where GeographyTabType=?";
const KEY_PREFIX = "GeographyHandBookByTabType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGeographyHandBookByTabType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configGeographyHandBookByTabType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configGeographyHandBookByTabType.GetConfigList(";
exports.configGeographyHandBookByTabType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    e?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var t = `${KEY_PREFIX}#${o})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g) {
          e?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const g = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["GeographyTabType", o]) !== 1) {
            break;
          }
          var a = undefined;
          [i, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["GeographyTabType", o]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            e?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = GeographyHandBook_1.GeographyHandBook.getRootAsGeographyHandBook(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          g.push(a);
        }
        if (n) {
          t = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, g, g.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return g;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=GeographyHandBookByTabType.js.map