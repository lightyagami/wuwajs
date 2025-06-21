"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configMoraleKeepLevelAll = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  MoraleKeepLevel_1 = require("../Config/MoraleKeepLevel"),
  DB = "db_moraleplay.db",
  FILE = "c.插旗玩法.xlsx",
  TABLE = "MoraleKeepLevel",
  COMMAND = "select BinData from `MoraleKeepLevel`",
  KEY_PREFIX = "MoraleKeepLevelAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMoraleKeepLevelAll.Init"),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configMoraleKeepLevelAll.GetConfigList");
exports.configMoraleKeepLevelAll = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfigList: (e = !0) => {
    var o;
    if (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigListStat?.Start(), o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (e) {
        var n = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (i) return getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), i
      }
      const i = new Array;
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair)) break;
        var t = void 0;
        if ([o, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair), !o) return ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), getConfigListStat?.Stop(), void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        t = MoraleKeepLevel_1.MoraleKeepLevel.getRootAsMoraleKeepLevel(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
        i.push(t)
      }
      return e && (n = KEY_PREFIX + ")", ConfigCommon_1.ConfigCommon.SaveConfig(n, i, i.length)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), i
    }
    getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=MoraleKeepLevelAll.js.map