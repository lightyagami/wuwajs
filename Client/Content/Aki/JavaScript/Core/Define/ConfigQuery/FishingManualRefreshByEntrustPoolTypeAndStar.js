"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFishingManualRefreshByEntrustPoolTypeAndStar = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FishingManualRefresh_1 = require("../Config/FishingManualRefresh");
const DB = "db_fishing.db";
const FILE = "b.捕鱼委托.xlsx";
const TABLE = "FishingManualRefresh";
const COMMAND = "select BinData from `FishingManualRefresh` where EntrustPoolType=? And Star=?";
const KEY_PREFIX = "FishingManualRefreshByEntrustPoolTypeAndStar";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFishingManualRefreshByEntrustPoolTypeAndStar.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configFishingManualRefreshByEntrustPoolTypeAndStar.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configFishingManualRefreshByEntrustPoolTypeAndStar.GetConfigList(";
exports.configFishingManualRefreshByEntrustPoolTypeAndStar = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (n, o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${n}#${o})`);
    t?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (i) {
        var a = `${KEY_PREFIX}#${n}#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (f) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair)) {
        const f = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["EntrustPoolType", n], ["Star", o]) !== 1) {
            break;
          }
          var r = undefined;
          [e, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["EntrustPoolType", n], ["Star", o]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = FishingManualRefresh_1.FishingManualRefresh.getRootAsFishingManualRefresh(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          f.push(r);
        }
        if (i) {
          a = `${KEY_PREFIX}#${n}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, f, f.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return f;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FishingManualRefreshByEntrustPoolTypeAndStar.js.map