"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configMoraleKeepLevelById = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  MoraleKeepLevel_1 = require("../Config/MoraleKeepLevel"),
  DB = "db_moraleplay.db",
  FILE = "c.插旗玩法.xlsx",
  TABLE = "MoraleKeepLevel",
  COMMAND = "select BinData from `MoraleKeepLevel` where Level=?",
  KEY_PREFIX = "MoraleKeepLevelById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMoraleKeepLevelById.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMoraleKeepLevelById.GetConfig"),
  CONFIG_STAT_PREFIX = "configMoraleKeepLevelById.GetConfig(";
exports.configMoraleKeepLevelById = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (e, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${e})`),
      i = (n?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (o) {
        var t = KEY_PREFIX + `#${e})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a) return n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), a
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Level", e])) {
        t = void 0;
        if ([i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Level", e]), i) {
          const a = MoraleKeepLevel_1.MoraleKeepLevel.getRootAsMoraleKeepLevel(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          return o && (i = KEY_PREFIX + `#${e})`, ConfigCommon_1.ConfigCommon.SaveConfig(i, a)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), a
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=MoraleKeepLevelById.js.map