"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configPhantomBattleTaskByActivityId = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  PhantomBattleTask_1 = require("../Config/PhantomBattleTask"),
  DB = "db_phantombattle.db",
  FILE = "s.声骸大作战外围.xlsx",
  TABLE = "PhantomBattleTask",
  COMMAND = "select BinData from `PhantomBattleTask` where ActivityId=?",
  KEY_PREFIX = "PhantomBattleTaskByActivityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleTaskByActivityId.Init"),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleTaskByActivityId.GetConfigList"),
  CONFIG_LIST_STAT_PREFIX = "configPhantomBattleTaskByActivityId.GetConfigList(";
exports.configPhantomBattleTaskByActivityId = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfigList: (t, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${t})`),
      n = (i?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (o) {
        var a = KEY_PREFIX + `#${t})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C) return i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair)) {
        const C = new Array;
        for (;;) {
          if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, ["ActivityId", t])) break;
          var e = void 0;
          if ([n, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", t]), !n) return ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigListStat?.Stop(), void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          e = PhantomBattleTask_1.PhantomBattleTask.getRootAsPhantomBattleTask(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          C.push(e)
        }
        return o && (a = KEY_PREFIX + `#${t})`, ConfigCommon_1.ConfigCommon.SaveConfig(a, C, C.length)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=PhantomBattleTaskByActivityId.js.map