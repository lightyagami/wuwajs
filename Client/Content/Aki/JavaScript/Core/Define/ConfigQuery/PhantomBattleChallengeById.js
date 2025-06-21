"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configPhantomBattleChallengeById = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhantomBattleChallenge_1 = require("../Config/PhantomBattleChallenge"),
  DB = "db_phantombattle.db",
  FILE = "s.声骸大作战外围.xlsx",
  TABLE = "PhantomBattleChallenge",
  COMMAND = "select BinData from `PhantomBattleChallenge` where Id=?",
  KEY_PREFIX = "PhantomBattleChallengeById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleChallengeById.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleChallengeById.GetConfig"),
  CONFIG_STAT_PREFIX = "configPhantomBattleChallengeById.GetConfig(";
exports.configPhantomBattleChallengeById = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (t, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${t})`),
      e = (o?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (n) {
        var a = KEY_PREFIX + `#${t})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (i) return o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), i
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Id", t])) {
        a = void 0;
        if ([e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", t]), e) {
          const i = PhantomBattleChallenge_1.PhantomBattleChallenge.getRootAsPhantomBattleChallenge(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          return n && (e = KEY_PREFIX + `#${t})`, ConfigCommon_1.ConfigCommon.SaveConfig(e, i)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), i
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=PhantomBattleChallengeById.js.map