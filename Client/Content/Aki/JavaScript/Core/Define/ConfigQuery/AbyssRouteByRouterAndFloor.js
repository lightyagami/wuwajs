"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAbyssRouteByRouterAndFloor = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AbyssRoute_1 = require("../Config/AbyssRoute");
const DB = "db_dangoabyss.db";
const FILE = "s.深渊爬塔副本.xlsx";
const TABLE = "AbyssRoute";
const COMMAND = "select BinData from `AbyssRoute` where RouteId=? And Floor=?";
const KEY_PREFIX = "AbyssRouteByRouterAndFloor";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAbyssRouteByRouterAndFloor.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configAbyssRouteByRouterAndFloor.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configAbyssRouteByRouterAndFloor.GetConfigList(";
exports.configAbyssRouteByRouterAndFloor = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, t, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o}#${t})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var r = `${KEY_PREFIX}#${o}#${t})`;
        const s = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (s) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return s;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, t, ...logPair)) {
        const s = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["RouteId", o], ["Floor", t]) !== 1) {
            break;
          }
          var C = undefined;
          [e, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RouteId", o], ["Floor", t]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = AbyssRoute_1.AbyssRoute.getRootAsAbyssRoute(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          s.push(C);
        }
        if (n) {
          r = `${KEY_PREFIX}#${o}#${t})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(r, s, s.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return s;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=AbyssRouteByRouterAndFloor.js.map