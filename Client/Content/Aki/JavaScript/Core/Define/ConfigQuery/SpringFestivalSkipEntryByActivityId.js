"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSpringFestivalSkipEntryByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SpringFestivalSkipEntry_1 = require("../Config/SpringFestivalSkipEntry");
const DB = "db_spring26.db";
const FILE = "c.3.1春节活动外围.xlsx";
const TABLE = "SpringFestivalSkipEntry";
const COMMAND = "select BinData from `SpringFestivalSkipEntry` where Activity=?";
const KEY_PREFIX = "SpringFestivalSkipEntryByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSpringFestivalSkipEntryByActivityId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configSpringFestivalSkipEntryByActivityId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configSpringFestivalSkipEntryByActivityId.GetConfigList(";
exports.configSpringFestivalSkipEntryByActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${i})`);
    n?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (t) {
        var e = `${KEY_PREFIX}#${i})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (g) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair)) {
        const g = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Activity", i]) !== 1) {
            break;
          }
          var r = undefined;
          [o, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Activity", i]);
          if (!o) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = SpringFestivalSkipEntry_1.SpringFestivalSkipEntry.getRootAsSpringFestivalSkipEntry(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          g.push(r);
        }
        if (t) {
          e = `${KEY_PREFIX}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, g, g.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return g;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SpringFestivalSkipEntryByActivityId.js.map