"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAreaByCountryAndLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const Area_1 = require("../Config/Area");
const DB = "db_area.db";
const FILE = "q.区域.xlsx";
const TABLE = "Area";
const COMMAND = "select BinData from `Area` where CountryId=? And Level=?";
const KEY_PREFIX = "AreaByCountryAndLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAreaByCountryAndLevel.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configAreaByCountryAndLevel.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configAreaByCountryAndLevel.GetConfigList(";
exports.configAreaByCountryAndLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o}#${n})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (e) {
        var C = `${KEY_PREFIX}#${o}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (a) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["CountryId", o], ["Level", n]) !== 1) {
            break;
          }
          var r = undefined;
          [i, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["CountryId", o], ["Level", n]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = Area_1.Area.getRootAsArea(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          a.push(r);
        }
        if (e) {
          C = `${KEY_PREFIX}#${o}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(C, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=AreaByCountryAndLevel.js.map