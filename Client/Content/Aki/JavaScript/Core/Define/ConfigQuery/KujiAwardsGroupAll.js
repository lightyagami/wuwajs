"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configKujiAwardsGroupAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const KujiAwardsGroup_1 = require("../Config/KujiAwardsGroup");
const DB = "db_wuwukuji.db";
const FILE = "w.呜呜一番赏.xlsx";
const TABLE = "KujiAwardsGroup";
const COMMAND = "select BinData from `KujiAwardsGroup`";
const KEY_PREFIX = "KujiAwardsGroupAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configKujiAwardsGroupAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configKujiAwardsGroupAll.GetConfigList");
exports.configKujiAwardsGroupAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var i;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var n = KEY_PREFIX + ")";
        const r = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (r) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      const r = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var t = undefined;
        [i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!i) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        t = KujiAwardsGroup_1.KujiAwardsGroup.getRootAsKujiAwardsGroup(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
        r.push(t);
      }
      if (o) {
        n = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(n, r, r.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return r;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=KujiAwardsGroupAll.js.map