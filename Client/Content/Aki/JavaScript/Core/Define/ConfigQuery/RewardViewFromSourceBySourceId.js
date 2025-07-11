"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRewardViewFromSourceBySourceId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RewardViewFromSource_1 = require("../Config/RewardViewFromSource");
const DB = "db_rewardui.db";
const FILE = "j.奖励界面表现.xlsx";
const TABLE = "RewardViewFromSource";
const COMMAND = "select BinData from `RewardViewFromSource` where RewardSourceId=?";
const KEY_PREFIX = "RewardViewFromSourceBySourceId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRewardViewFromSourceBySourceId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRewardViewFromSourceBySourceId.GetConfig");
const CONFIG_STAT_PREFIX = "configRewardViewFromSourceBySourceId.GetConfig(";
exports.configRewardViewFromSourceBySourceId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var r = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    r?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (e) {
        var n = `${KEY_PREFIX}#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (t) {
          r?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["RewardSourceId", o]) > 0) {
        n = undefined;
        [i, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["RewardSourceId", o]);
        if (i) {
          const t = RewardViewFromSource_1.RewardViewFromSource.getRootAsRewardViewFromSource(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (e) {
            i = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          r?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    r?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RewardViewFromSourceBySourceId.js.map