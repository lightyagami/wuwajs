"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configKujiQuestByKujiId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const KujiQuest_1 = require("../Config/KujiQuest");
const DB = "db_wuwukuji.db";
const FILE = "w.呜呜一番赏.xlsx";
const TABLE = "KujiQuest";
const COMMAND = "select BinData from `KujiQuest` where KujiId=?";
const KEY_PREFIX = "KujiQuestByKujiId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configKujiQuestByKujiId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configKujiQuestByKujiId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configKujiQuestByKujiId.GetConfigList(";
exports.configKujiQuestByKujiId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${i})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var e = `${KEY_PREFIX}#${i})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (f) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair)) {
        const f = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["KujiId", i]) !== 1) {
            break;
          }
          var C = undefined;
          [n, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["KujiId", i]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = KujiQuest_1.KujiQuest.getRootAsKujiQuest(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          f.push(C);
        }
        if (o) {
          e = `${KEY_PREFIX}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, f, f.length);
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
//# sourceMappingURL=KujiQuestByKujiId.js.map