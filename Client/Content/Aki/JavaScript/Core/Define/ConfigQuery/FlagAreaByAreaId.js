"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configFlagAreaByAreaId = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  FlagArea_1 = require("../Config/FlagArea"),
  DB = "db_moraleplay.db",
  FILE = "c.插旗玩法.xlsx",
  TABLE = "FlagArea",
  COMMAND = "select BinData from `FlagArea` where FlagAreaId=?",
  KEY_PREFIX = "FlagAreaByAreaId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFlagAreaByAreaId.Init"),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configFlagAreaByAreaId.GetConfigList"),
  CONFIG_LIST_STAT_PREFIX = "configFlagAreaByAreaId.GetConfigList(";
exports.configFlagAreaByAreaId = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfigList: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${o})`),
      a = (i?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (n) {
        var e = KEY_PREFIX + `#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) return i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), r
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const r = new Array;
        for (;;) {
          if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, ["FlagAreaId", o])) break;
          var t = void 0;
          if ([a, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["FlagAreaId", o]), !a) return ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigListStat?.Stop(), void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          t = FlagArea_1.FlagArea.getRootAsFlagArea(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          r.push(t)
        }
        return n && (e = KEY_PREFIX + `#${o})`, ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), r
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=FlagAreaByAreaId.js.map