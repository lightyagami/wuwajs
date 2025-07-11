"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCalabashDevelopRewardByMonsterId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CalabashDevelopReward_1 = require("../Config/CalabashDevelopReward");
const DB = "db_calabash.db";
const FILE = "h.葫芦.xlsx";
const TABLE = "CalabashDevelopReward";
const COMMAND = "select BinData from `CalabashDevelopReward` where MonsterId=?";
const KEY_PREFIX = "CalabashDevelopRewardByMonsterId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCalabashDevelopRewardByMonsterId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCalabashDevelopRewardByMonsterId.GetConfig");
const CONFIG_STAT_PREFIX = "configCalabashDevelopRewardByMonsterId.GetConfig(";
exports.configCalabashDevelopRewardByMonsterId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (e) {
        var t = `${KEY_PREFIX}#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (i) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MonsterId", o]) > 0) {
        t = undefined;
        [a, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MonsterId", o]);
        if (a) {
          const i = CalabashDevelopReward_1.CalabashDevelopReward.getRootAsCalabashDevelopReward(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (e) {
            a = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=CalabashDevelopRewardByMonsterId.js.map