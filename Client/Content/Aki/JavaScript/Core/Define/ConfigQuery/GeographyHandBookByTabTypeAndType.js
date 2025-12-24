"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGeographyHandBookByTabTypeAndType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GeographyHandBook_1 = require("../Config/GeographyHandBook");
const DB = "db_handbook.db";
const FILE = "t.图鉴系统.xlsx";
const TABLE = "GeographyHandBook";
const COMMAND = "select BinData from `GeographyHandBook` where GeographyTabType=? and Type=?";
const KEY_PREFIX = "GeographyHandBookByTabTypeAndType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGeographyHandBookByTabTypeAndType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configGeographyHandBookByTabTypeAndType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configGeographyHandBookByTabTypeAndType.GetConfigList(";
exports.configGeographyHandBookByTabTypeAndType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o}#${n})`);
    i?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (e) {
        var t = `${KEY_PREFIX}#${o}#${n})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (r) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair)) {
        const r = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["GeographyTabType", o], ["Type", n]) !== 1) {
            break;
          }
          var g = undefined;
          [a, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["GeographyTabType", o], ["Type", n]);
          if (!a) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          g = GeographyHandBook_1.GeographyHandBook.getRootAsGeographyHandBook(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          r.push(g);
        }
        if (e) {
          t = `${KEY_PREFIX}#${o}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, r, r.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return r;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=GeographyHandBookByTabTypeAndType.js.map