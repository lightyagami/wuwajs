"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configKujiAwardsGroupById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const KujiAwardsGroup_1 = require("../Config/KujiAwardsGroup");
const DB = "db_wuwukuji.db";
const FILE = "w.呜呜一番赏.xlsx";
const TABLE = "KujiAwardsGroup";
const COMMAND = "select BinData from `KujiAwardsGroup` where Id=?";
const KEY_PREFIX = "KujiAwardsGroupById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configKujiAwardsGroupById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configKujiAwardsGroupById.GetConfig");
const CONFIG_STAT_PREFIX = "configKujiAwardsGroupById.GetConfig(";
exports.configKujiAwardsGroupById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var r = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (e) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        r = undefined;
        [t, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (t) {
          const e = KujiAwardsGroup_1.KujiAwardsGroup.getRootAsKujiAwardsGroup(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          if (i) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=KujiAwardsGroupById.js.map