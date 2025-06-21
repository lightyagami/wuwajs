"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configNewbieCarnivalTaskByTaskId = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  NewbieCarnivalTask_1 = require("../Config/NewbieCarnivalTask"),
  DB = "db_newbiecarnival.db",
  FILE = "x.新手嘉年华.xlsx",
  TABLE = "NewbieCarnivalTask",
  COMMAND = "select BinData from `NewbieCarnivalTask` where TaskId=?",
  KEY_PREFIX = "NewbieCarnivalTaskByTaskId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalTaskByTaskId.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalTaskByTaskId.GetConfig"),
  CONFIG_STAT_PREFIX = "configNewbieCarnivalTaskByTaskId.GetConfig(";
exports.configNewbieCarnivalTaskByTaskId = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (n, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${n})`),
      a = (o?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (i) {
        var e = KEY_PREFIX + `#${n})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (t) return o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), t
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["TaskId", n])) {
        e = void 0;
        if ([a, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TaskId", n]), a) {
          const t = NewbieCarnivalTask_1.NewbieCarnivalTask.getRootAsNewbieCarnivalTask(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          return i && (a = KEY_PREFIX + `#${n})`, ConfigCommon_1.ConfigCommon.SaveConfig(a, t)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), t
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=NewbieCarnivalTaskByTaskId.js.map