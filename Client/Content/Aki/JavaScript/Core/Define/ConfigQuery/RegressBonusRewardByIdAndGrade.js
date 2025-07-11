"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRegressBonusRewardByIdAndGrade = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RegressBonusReward_1 = require("../Config/RegressBonusReward");
const DB = "db_activity.db";
const FILE = "h.回流活动(新).xlsx";
const TABLE = "RegressBonusReward";
const COMMAND = "select BinData from `RegressBonusReward` where Id=? And Grade=?";
const KEY_PREFIX = "RegressBonusRewardByIdAndGrade";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRegressBonusRewardByIdAndGrade.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRegressBonusRewardByIdAndGrade.GetConfig");
const CONFIG_STAT_PREFIX = "configRegressBonusRewardByIdAndGrade.GetConfig(";
exports.configRegressBonusRewardByIdAndGrade = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${n})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (e) {
        var r = `${KEY_PREFIX}#${o}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (a) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o], ["Grade", n]) > 0) {
        r = undefined;
        [t, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o], ["Grade", n]);
        if (t) {
          const a = RegressBonusReward_1.RegressBonusReward.getRootAsRegressBonusReward(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          if (e) {
            t = `${KEY_PREFIX}#${o}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RegressBonusRewardByIdAndGrade.js.map