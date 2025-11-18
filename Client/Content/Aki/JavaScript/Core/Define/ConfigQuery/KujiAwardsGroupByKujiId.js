"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configKujiAwardsGroupByKujiId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const KujiAwardsGroup_1 = require("../Config/KujiAwardsGroup");
const DB = "db_wuwukuji.db";
const FILE = "w.呜呜一番赏.xlsx";
const TABLE = "KujiAwardsGroup";
const COMMAND = "select BinData from `KujiAwardsGroup` where KujiId=?";
const KEY_PREFIX = "KujiAwardsGroupByKujiId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configKujiAwardsGroupByKujiId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configKujiAwardsGroupByKujiId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configKujiAwardsGroupByKujiId.GetConfigList(";
exports.configKujiAwardsGroupByKujiId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var r = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (a) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["KujiId", o]) !== 1) {
            break;
          }
          var e = undefined;
          [t, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["KujiId", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          e = KujiAwardsGroup_1.KujiAwardsGroup.getRootAsKujiAwardsGroup(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          a.push(e);
        }
        if (i) {
          r = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(r, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=KujiAwardsGroupByKujiId.js.map