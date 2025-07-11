"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configExploreProgressRewardAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ExploreProgressReward_1 = require("../Config/ExploreProgressReward");
const DB = "db_explore_progress.db";
const FILE = "t.探索度.xlsx";
const TABLE = "ExploreProgressReward";
const COMMAND = "select BinData from `ExploreProgressReward`";
const KEY_PREFIX = "ExploreProgressRewardAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configExploreProgressRewardAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configExploreProgressRewardAll.GetConfigList");
exports.configExploreProgressRewardAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var e;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var r = KEY_PREFIX + ")";
        const t = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (t) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      const t = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var n = undefined;
        [e, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!e) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        n = ExploreProgressReward_1.ExploreProgressReward.getRootAsExploreProgressReward(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
        t.push(n);
      }
      if (o) {
        r = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(r, t, t.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return t;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ExploreProgressRewardAll.js.map