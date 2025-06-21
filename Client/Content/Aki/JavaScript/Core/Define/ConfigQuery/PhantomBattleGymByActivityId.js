"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configPhantomBattleGymByActivityId = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhantomBattleGym_1 = require("../Config/PhantomBattleGym"),
  DB = "db_phantombattle.db",
  FILE = "s.声骸大作战外围.xlsx",
  TABLE = "PhantomBattleGym",
  COMMAND = "select BinData from `PhantomBattleGym` where ActivityId=?",
  KEY_PREFIX = "PhantomBattleGymByActivityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleGymByActivityId.Init"),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleGymByActivityId.GetConfigList"),
  CONFIG_LIST_STAT_PREFIX = "configPhantomBattleGymByActivityId.GetConfigList(";
exports.configPhantomBattleGymByActivityId = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfigList: (t, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${t})`),
      n = (i?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (o) {
        var e = KEY_PREFIX + `#${t})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (m) return i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), m
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair)) {
        const m = new Array;
        for (;;) {
          if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, ["ActivityId", t])) break;
          var a = void 0;
          if ([n, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", t]), !n) return ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigListStat?.Stop(), void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          a = PhantomBattleGym_1.PhantomBattleGym.getRootAsPhantomBattleGym(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          m.push(a)
        }
        return o && (e = KEY_PREFIX + `#${t})`, ConfigCommon_1.ConfigCommon.SaveConfig(e, m, m.length)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), m
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=PhantomBattleGymByActivityId.js.map