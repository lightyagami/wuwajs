"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBattlePassRewardByBattlePassId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BattlePassReward_1 = require("../Config/BattlePassReward");
const DB = "db_battle_pass.db";
const FILE = "z.战令.xlsx";
const TABLE = "BattlePassReward";
const COMMAND = "select BinData from `BattlePassReward` where BattlePassId=?";
const KEY_PREFIX = "BattlePassRewardByBattlePassId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBattlePassRewardByBattlePassId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configBattlePassRewardByBattlePassId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configBattlePassRewardByBattlePassId.GetConfigList(";
exports.configBattlePassRewardByBattlePassId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var a = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${t})`);
    a?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (o) {
        var n = `${KEY_PREFIX}#${t})`;
        const s = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (s) {
          a?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return s;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair)) {
        const s = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["BattlePassId", t]) !== 1) {
            break;
          }
          var i = undefined;
          [e, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["BattlePassId", t]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            a?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          i = BattlePassReward_1.BattlePassReward.getRootAsBattlePassReward(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          s.push(i);
        }
        if (o) {
          n = `${KEY_PREFIX}#${t})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(n, s, s.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        a?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return s;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=BattlePassRewardByBattlePassId.js.map