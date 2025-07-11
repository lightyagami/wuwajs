"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRogueWeeklyRewardByCycleId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RogueWeeklyReward_1 = require("../Config/RogueWeeklyReward");
const DB = "db_weeklyrogue.db";
const FILE = "r.肉鸽周常.xlsx";
const TABLE = "RogueWeeklyReward";
const COMMAND = "select BinData from `RogueWeeklyReward` where CycleId=?";
const KEY_PREFIX = "RogueWeeklyRewardByCycleId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRogueWeeklyRewardByCycleId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRogueWeeklyRewardByCycleId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configRogueWeeklyRewardByCycleId.GetConfigList(";
exports.configRogueWeeklyRewardByCycleId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (e, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${e})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var t = `${KEY_PREFIX}#${e})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair)) {
        const g = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["CycleId", e]) !== 1) {
            break;
          }
          var C = undefined;
          [i, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["CycleId", e]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = RogueWeeklyReward_1.RogueWeeklyReward.getRootAsRogueWeeklyReward(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          g.push(C);
        }
        if (o) {
          t = `${KEY_PREFIX}#${e})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, g, g.length);
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
//# sourceMappingURL=RogueWeeklyRewardByCycleId.js.map