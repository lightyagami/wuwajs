"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configNewbieCarnivalTaskTypeById = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  NewbieCarnivalTaskType_1 = require("../Config/NewbieCarnivalTaskType"),
  DB = "db_newbiecarnival.db",
  FILE = "x.新手嘉年华.xlsx",
  TABLE = "NewbieCarnivalTaskType",
  COMMAND = "select BinData from `NewbieCarnivalTaskType` where Id=?",
  KEY_PREFIX = "NewbieCarnivalTaskTypeById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalTaskTypeById.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalTaskTypeById.GetConfig"),
  CONFIG_STAT_PREFIX = "configNewbieCarnivalTaskTypeById.GetConfig(";
exports.configNewbieCarnivalTaskTypeById = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (n, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${n})`),
      o = (i?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (o) {
      if (e) {
        var a = KEY_PREFIX + `#${n})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (t) return i?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), t
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Id", n])) {
        a = void 0;
        if ([o, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]), o) {
          const t = NewbieCarnivalTaskType_1.NewbieCarnivalTaskType.getRootAsNewbieCarnivalTaskType(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          return e && (o = KEY_PREFIX + `#${n})`, ConfigCommon_1.ConfigCommon.SaveConfig(o, t)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), t
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    i?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=NewbieCarnivalTaskTypeById.js.map