"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configNewbieCarnivalTaskByTaskType = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  NewbieCarnivalTask_1 = require("../Config/NewbieCarnivalTask"),
  DB = "db_newbiecarnival.db",
  FILE = "x.新手嘉年华.xlsx",
  TABLE = "NewbieCarnivalTask",
  COMMAND = "select BinData from `NewbieCarnivalTask` where TaskType=?",
  KEY_PREFIX = "NewbieCarnivalTaskByTaskType",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalTaskByTaskType.Init"),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalTaskByTaskType.GetConfigList"),
  CONFIG_LIST_STAT_PREFIX = "configNewbieCarnivalTaskByTaskType.GetConfigList(";
exports.configNewbieCarnivalTaskByTaskType = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfigList: (i, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigListStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${i})`),
      e = (o?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (e) {
      if (n) {
        var a = KEY_PREFIX + `#${i})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C) return o?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair)) {
        const C = new Array;
        for (;;) {
          if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, ["TaskType", i])) break;
          var t = void 0;
          if ([e, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TaskType", i]), !e) return ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), o?.Stop(), getConfigListStat?.Stop(), void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          t = NewbieCarnivalTask_1.NewbieCarnivalTask.getRootAsNewbieCarnivalTask(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          C.push(t)
        }
        return n && (a = KEY_PREFIX + `#${i})`, ConfigCommon_1.ConfigCommon.SaveConfig(a, C, C.length)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), o?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    o?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=NewbieCarnivalTaskByTaskType.js.map