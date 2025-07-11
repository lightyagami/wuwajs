"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCalabashDevelopRewardAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CalabashDevelopReward_1 = require("../Config/CalabashDevelopReward");
const DB = "db_calabash.db";
const FILE = "h.葫芦.xlsx";
const TABLE = "CalabashDevelopReward";
const COMMAND = "select BinData from `CalabashDevelopReward`";
const KEY_PREFIX = "CalabashDevelopRewardAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCalabashDevelopRewardAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configCalabashDevelopRewardAll.GetConfigList");
exports.configCalabashDevelopRewardAll = {
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
        var a = KEY_PREFIX + ")";
        const t = ConfigCommon_1.ConfigCommon.GetConfig(a);
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
        n = CalabashDevelopReward_1.CalabashDevelopReward.getRootAsCalabashDevelopReward(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
        t.push(n);
      }
      if (o) {
        a = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(a, t, t.length);
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
//# sourceMappingURL=CalabashDevelopRewardAll.js.map