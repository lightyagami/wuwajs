"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSurvivorsScoreRewardByActivity = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SurvivorsScoreReward_1 = require("../Config/SurvivorsScoreReward");
const DB = "db_survivors.db";
const FILE = "x.幸存者_活动.xlsx";
const TABLE = "SurvivorsScoreReward";
const COMMAND = "select BinData from `SurvivorsScoreReward` where Activity=?";
const KEY_PREFIX = "SurvivorsScoreRewardByActivity";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSurvivorsScoreRewardByActivity.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configSurvivorsScoreRewardByActivity.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configSurvivorsScoreRewardByActivity.GetConfigList(";
exports.configSurvivorsScoreRewardByActivity = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    t?.Start();
    var r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (r) {
      if (i) {
        var n = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (a) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (r = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Activity", o]) !== 1) {
            break;
          }
          var e = undefined;
          [r, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Activity", o]);
          if (!r) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          e = SurvivorsScoreReward_1.SurvivorsScoreReward.getRootAsSurvivorsScoreReward(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          a.push(e);
        }
        if (i) {
          n = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(n, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SurvivorsScoreRewardByActivity.js.map