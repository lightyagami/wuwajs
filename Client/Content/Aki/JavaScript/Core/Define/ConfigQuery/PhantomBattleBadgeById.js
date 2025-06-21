"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configPhantomBattleBadgeById = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhantomBattleBadge_1 = require("../Config/PhantomBattleBadge"),
  DB = "db_phantombattle.db",
  FILE = "s.声骸大作战外围.xlsx",
  TABLE = "PhantomBattleBadge",
  COMMAND = "select BinData from `PhantomBattleBadge` where Id=?",
  KEY_PREFIX = "PhantomBattleBadgeById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleBadgeById.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleBadgeById.GetConfig"),
  CONFIG_STAT_PREFIX = "configPhantomBattleBadgeById.GetConfig(";
exports.configPhantomBattleBadgeById = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (t, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${t})`),
      e = (n?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (o) {
        var a = KEY_PREFIX + `#${t})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (i) return n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), i
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Id", t])) {
        a = void 0;
        if ([e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", t]), e) {
          const i = PhantomBattleBadge_1.PhantomBattleBadge.getRootAsPhantomBattleBadge(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          return o && (e = KEY_PREFIX + `#${t})`, ConfigCommon_1.ConfigCommon.SaveConfig(e, i)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), i
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=PhantomBattleBadgeById.js.map