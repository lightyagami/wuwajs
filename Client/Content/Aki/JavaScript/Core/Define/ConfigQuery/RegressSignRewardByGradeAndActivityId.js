"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRegressSignRewardByGradeAndActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RegressSignReward_1 = require("../Config/RegressSignReward");
const DB = "db_activity.db";
const FILE = "h.回流活动(新).xlsx";
const TABLE = "RegressSignReward";
const COMMAND = "select BinData from `RegressSignReward` where Grade=? And ActivityId = ?";
const KEY_PREFIX = "RegressSignRewardByGradeAndActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRegressSignRewardByGradeAndActivityId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configRegressSignRewardByGradeAndActivityId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configRegressSignRewardByGradeAndActivityId.GetConfigList(";
exports.configRegressSignRewardByGradeAndActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i, n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${i}#${n})`);
    e?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var r = `${KEY_PREFIX}#${i}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (a) {
          e?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Grade", i], ["ActivityId", n]) !== 1) {
            break;
          }
          var g = undefined;
          [t, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Grade", i], ["ActivityId", n]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            e?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          g = RegressSignReward_1.RegressSignReward.getRootAsRegressSignReward(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          a.push(g);
        }
        if (o) {
          r = `${KEY_PREFIX}#${i}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(r, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        e?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RegressSignRewardByGradeAndActivityId.js.map