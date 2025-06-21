"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configPhantomBattleFactorAll = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhantomBattleFactor_1 = require("../Config/PhantomBattleFactor"),
  DB = "db_phantombattle.db",
  FILE = "s.声骸大作战战斗.xlsx",
  TABLE = "PhantomBattleFactor",
  COMMAND = "select BinData from `PhantomBattleFactor`",
  KEY_PREFIX = "PhantomBattleFactorAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleFactorAll.Init"),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleFactorAll.GetConfigList");
exports.configPhantomBattleFactorAll = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfigList: (t = !0) => {
    var o;
    if (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigListStat?.Start(), o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (t) {
        var n = KEY_PREFIX + ")";
        const a = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (a) return getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), a
      }
      const a = new Array;
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair)) break;
        var i = void 0;
        if ([o, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair), !o) return ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), getConfigListStat?.Stop(), void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        i = PhantomBattleFactor_1.PhantomBattleFactor.getRootAsPhantomBattleFactor(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
        a.push(i)
      }
      return t && (n = KEY_PREFIX + ")", ConfigCommon_1.ConfigCommon.SaveConfig(n, a, a.length)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), a
    }
    getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=PhantomBattleFactorAll.js.map