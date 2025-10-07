"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSurvivorsScoreRewardById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SurvivorsScoreReward_1 = require("../Config/SurvivorsScoreReward");
const DB = "db_survivors.db";
const FILE = "x.幸存者_活动.xlsx";
const TABLE = "SurvivorsScoreReward";
const COMMAND = "select BinData from `SurvivorsScoreReward` where Id=?";
const KEY_PREFIX = "SurvivorsScoreRewardById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSurvivorsScoreRewardById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSurvivorsScoreRewardById.GetConfig");
const CONFIG_STAT_PREFIX = "configSurvivorsScoreRewardById.GetConfig(";
exports.configSurvivorsScoreRewardById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, r = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    i?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (r) {
        var e = `${KEY_PREFIX}#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (t) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        e = undefined;
        [n, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (n) {
          const t = SurvivorsScoreReward_1.SurvivorsScoreReward.getRootAsSurvivorsScoreReward(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (r) {
            n = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SurvivorsScoreRewardById.js.map