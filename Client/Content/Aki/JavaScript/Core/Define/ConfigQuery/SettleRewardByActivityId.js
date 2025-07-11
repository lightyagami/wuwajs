"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSettleRewardByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SettleReward_1 = require("../Config/SettleReward");
const DB = "db_activity.db";
const FILE = "c.2.0春节签到.xlsx";
const TABLE = "SettleReward";
const COMMAND = "select BinData from `SettleReward` where ActivityId=?";
const KEY_PREFIX = "SettleRewardByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSettleRewardByActivityId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSettleRewardByActivityId.GetConfig");
const CONFIG_STAT_PREFIX = "configSettleRewardByActivityId.GetConfig(";
exports.configSettleRewardByActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t})`);
    e?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var n = `${KEY_PREFIX}#${t})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (a) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ActivityId", t]) > 0) {
        n = undefined;
        [i, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", t]);
        if (i) {
          const a = SettleReward_1.SettleReward.getRootAsSettleReward(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (o) {
            i = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SettleRewardByActivityId.js.map