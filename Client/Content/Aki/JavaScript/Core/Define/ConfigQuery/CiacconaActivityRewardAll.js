"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCiacconaActivityRewardAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CiacconaActivityReward_1 = require("../Config/CiacconaActivityReward");
const DB = "db_ciacconagal.db";
const FILE = "x.夏空活动.xlsx";
const TABLE = "CiacconaActivityReward";
const COMMAND = "select BinData from `CiacconaActivityReward`";
const KEY_PREFIX = "CiacconaActivityRewardAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCiacconaActivityRewardAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configCiacconaActivityRewardAll.GetConfigList");
exports.configCiacconaActivityRewardAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i = true) => {
    var o;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (i) {
        var t = KEY_PREFIX + ")";
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      const a = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var n = undefined;
        [o, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!o) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        n = CiacconaActivityReward_1.CiacconaActivityReward.getRootAsCiacconaActivityReward(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
        a.push(n);
      }
      if (i) {
        t = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(t, a, a.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return a;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=CiacconaActivityRewardAll.js.map