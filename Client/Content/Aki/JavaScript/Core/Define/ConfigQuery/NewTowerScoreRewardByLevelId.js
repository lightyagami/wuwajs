"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configNewTowerScoreRewardByLevelId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const NewTowerScoreReward_1 = require("../Config/NewTowerScoreReward");
const DB = "db_newtower.db";
const FILE = "x.3.0新爬塔.xlsx";
const TABLE = "NewTowerScoreReward";
const COMMAND = "select BinData from `NewTowerScoreReward` where Level=?";
const KEY_PREFIX = "NewTowerScoreRewardByLevelId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configNewTowerScoreRewardByLevelId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configNewTowerScoreRewardByLevelId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configNewTowerScoreRewardByLevelId.GetConfigList(";
exports.configNewTowerScoreRewardByLevelId = {
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
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair)) {
        const a = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Level", e]) !== 1) {
            break;
          }
          var r = undefined;
          [i, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Level", e]);
          if (!i) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = NewTowerScoreReward_1.NewTowerScoreReward.getRootAsNewTowerScoreReward(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          a.push(r);
        }
        if (o) {
          t = `${KEY_PREFIX}#${e})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(t, a, a.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return a;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=NewTowerScoreRewardByLevelId.js.map