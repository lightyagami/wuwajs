"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configPhantomBattleFactorById = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhantomBattleFactor_1 = require("../Config/PhantomBattleFactor"),
  DB = "db_phantombattle.db",
  FILE = "s.声骸大作战战斗.xlsx",
  TABLE = "PhantomBattleFactor",
  COMMAND = "select BinData from `PhantomBattleFactor` where Id=?",
  KEY_PREFIX = "PhantomBattleFactorById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleFactorById.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleFactorById.GetConfig"),
  CONFIG_STAT_PREFIX = "configPhantomBattleFactorById.GetConfig(";
exports.configPhantomBattleFactorById = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (t, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${t})`),
      a = (n?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (o) {
        var e = KEY_PREFIX + `#${t})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i) return n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), i
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Id", t])) {
        e = void 0;
        if ([a, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", t]), a) {
          const i = PhantomBattleFactor_1.PhantomBattleFactor.getRootAsPhantomBattleFactor(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          return o && (a = KEY_PREFIX + `#${t})`, ConfigCommon_1.ConfigCommon.SaveConfig(a, i)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), i
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=PhantomBattleFactorById.js.map