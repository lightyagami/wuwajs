"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configPhantomBattleChallengeByActivityId = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhantomBattleChallenge_1 = require("../Config/PhantomBattleChallenge"),
  DB = "db_phantombattle.db",
  FILE = "s.声骸大作战外围.xlsx",
  TABLE = "PhantomBattleChallenge",
  COMMAND = "select BinData from `PhantomBattleChallenge` where ActivityId=?",
  KEY_PREFIX = "PhantomBattleChallengeByActivityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleChallengeByActivityId.Init"),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleChallengeByActivityId.GetConfigList"),
  CONFIG_LIST_STAT_PREFIX = "configPhantomBattleChallengeByActivityId.GetConfigList(";
exports.configPhantomBattleChallengeByActivityId = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfigList: (t, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${t})`),
      i = (n?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (o) {
        var e = KEY_PREFIX + `#${t})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C) return n?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair)) {
        const C = new Array;
        for (;;) {
          if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, ["ActivityId", t])) break;
          var a = void 0;
          if ([i, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", t]), !i) return ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), n?.Stop(), getConfigListStat?.Stop(), void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          a = PhantomBattleChallenge_1.PhantomBattleChallenge.getRootAsPhantomBattleChallenge(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          C.push(a)
        }
        return o && (e = KEY_PREFIX + `#${t})`, ConfigCommon_1.ConfigCommon.SaveConfig(e, C, C.length)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), n?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    n?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=PhantomBattleChallengeByActivityId.js.map