"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDangoMonopolyMapPointByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DangoMonopolyMapPoint_1 = require("../Config/DangoMonopolyMapPoint");
const DB = "db_dangomonopoly.db";
const FILE = "t.团子大富翁.xlsx";
const TABLE = "DangoMonopolyMapPoint";
const COMMAND = "select BinData from `DangoMonopolyMapPoint` where SeasonId=?";
const KEY_PREFIX = "DangoMonopolyMapPointByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDangoMonopolyMapPointByActivityId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configDangoMonopolyMapPointByActivityId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configDangoMonopolyMapPointByActivityId.GetConfigList(";
exports.configDangoMonopolyMapPointByActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var a = `${KEY_PREFIX}#${o})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (g) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const g = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["SeasonId", o]) !== 1) {
            break;
          }
          var e = undefined;
          [t, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["SeasonId", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          e = DangoMonopolyMapPoint_1.DangoMonopolyMapPoint.getRootAsDangoMonopolyMapPoint(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          g.push(e);
        }
        if (n) {
          a = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, g, g.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return g;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=DangoMonopolyMapPointByActivityId.js.map