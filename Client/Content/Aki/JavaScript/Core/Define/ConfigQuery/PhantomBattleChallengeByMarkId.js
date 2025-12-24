"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhantomBattleChallengeByMarkId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhantomBattleChallenge_1 = require("../Config/PhantomBattleChallenge");
const DB = "db_phantombattle.db";
const FILE = "s.声骸大作战外围.xlsx";
const TABLE = "PhantomBattleChallenge";
const COMMAND = "select BinData from `PhantomBattleChallenge` where MarkId=?";
const KEY_PREFIX = "PhantomBattleChallengeByMarkId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleChallengeByMarkId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleChallengeByMarkId.GetConfig");
const CONFIG_STAT_PREFIX = "configPhantomBattleChallengeByMarkId.GetConfig(";
exports.configPhantomBattleChallengeByMarkId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t})`);
    o?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var a = `${KEY_PREFIX}#${t})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (i) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MarkId", t]) > 0) {
        a = undefined;
        [e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MarkId", t]);
        if (e) {
          const i = PhantomBattleChallenge_1.PhantomBattleChallenge.getRootAsPhantomBattleChallenge(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PhantomBattleChallengeByMarkId.js.map