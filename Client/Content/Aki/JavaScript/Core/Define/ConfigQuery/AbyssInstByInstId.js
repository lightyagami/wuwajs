"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configAbyssInstByInstId = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  AbyssInst_1 = require("../Config/AbyssInst"),
  DB = "db_dangoabyss.db",
  FILE = "s.深渊爬塔副本.xlsx",
  TABLE = "AbyssInst",
  COMMAND = "select BinData from `AbyssInst` where InstId=?",
  KEY_PREFIX = "AbyssInstByInstId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAbyssInstByInstId.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configAbyssInstByInstId.GetConfig"),
  CONFIG_STAT_PREFIX = "configAbyssInstByInstId.GetConfig(";
exports.configAbyssInstByInstId = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (n, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${n})`),
      i = (t?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (o) {
        var s = KEY_PREFIX + `#${n})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(s);
        if (e) return t?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), e
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["InstId", n])) {
        s = void 0;
        if ([i, s] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["InstId", n]), i) {
          const e = AbyssInst_1.AbyssInst.getRootAsAbyssInst(new byte_buffer_1.ByteBuffer(new Uint8Array(s.buffer)));
          return o && (i = KEY_PREFIX + `#${n})`, ConfigCommon_1.ConfigCommon.SaveConfig(i, e)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), t?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), e
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    t?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=AbyssInstByInstId.js.map