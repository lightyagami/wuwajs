"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhantomBattleChallengeByActivityGymId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhantomBattleChallenge_1 = require("../Config/PhantomBattleChallenge");
const DB = "db_phantombattle.db";
const FILE = "s.声骸大作战外围.xlsx";
const TABLE = "PhantomBattleChallenge";
const COMMAND = "select BinData from `PhantomBattleChallenge` where ActivityId=? AND GymId=?";
const KEY_PREFIX = "PhantomBattleChallengeByActivityGymId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleChallengeByActivityGymId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleChallengeByActivityGymId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configPhantomBattleChallengeByActivityGymId.GetConfigList(";
exports.configPhantomBattleChallengeByActivityGymId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t, o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${t}#${o})`);
    i?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var a = `${KEY_PREFIX}#${t}#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (m) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair)) {
        const m = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActivityId", t], ["GymId", o]) !== 1) {
            break;
          }
          var C = undefined;
          [e, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", t], ["GymId", o]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = PhantomBattleChallenge_1.PhantomBattleChallenge.getRootAsPhantomBattleChallenge(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          m.push(C);
        }
        if (n) {
          a = `${KEY_PREFIX}#${t}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, m, m.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return m;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PhantomBattleChallengeByActivityGymId.js.map