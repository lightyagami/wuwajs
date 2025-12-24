"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configNewTowerScoreRewardById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const NewTowerScoreReward_1 = require("../Config/NewTowerScoreReward");
const DB = "db_newtower.db";
const FILE = "x.3.0新爬塔.xlsx";
const TABLE = "NewTowerScoreReward";
const COMMAND = "select BinData from `NewTowerScoreReward` where Id=?";
const KEY_PREFIX = "NewTowerScoreRewardById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configNewTowerScoreRewardById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configNewTowerScoreRewardById.GetConfig");
const CONFIG_STAT_PREFIX = "configNewTowerScoreRewardById.GetConfig(";
exports.configNewTowerScoreRewardById = {
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
    var r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (r) {
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
      if (r = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        t = undefined;
        [r, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (r) {
          const i = NewTowerScoreReward_1.NewTowerScoreReward.getRootAsNewTowerScoreReward(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (e) {
            r = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(r, i);
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
//# sourceMappingURL=NewTowerScoreRewardById.js.map