"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRogueLimitTimeRewardById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RogueLimitTimeReward_1 = require("../Config/RogueLimitTimeReward");
const DB = "db_activity.db";
const FILE = "m.梦境链接活动.xlsx";
const TABLE = "RogueLimitTimeReward";
const COMMAND = "select BinData from `RogueLimitTimeReward` where Id=?";
const KEY_PREFIX = "RogueLimitTimeRewardById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRogueLimitTimeRewardById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRogueLimitTimeRewardById.GetConfig");
const CONFIG_STAT_PREFIX = "configRogueLimitTimeRewardById.GetConfig(";
exports.configRogueLimitTimeRewardById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    e?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var n = `${KEY_PREFIX}#${i})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (m) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", i]) > 0) {
        n = undefined;
        [t, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", i]);
        if (t) {
          const m = RogueLimitTimeReward_1.RogueLimitTimeReward.getRootAsRogueLimitTimeReward(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (o) {
            t = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, m);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RogueLimitTimeRewardById.js.map