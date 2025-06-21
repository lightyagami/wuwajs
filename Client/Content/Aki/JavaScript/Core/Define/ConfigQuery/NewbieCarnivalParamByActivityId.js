"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configNewbieCarnivalParamByActivityId = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  NewbieCarnivalParam_1 = require("../Config/NewbieCarnivalParam"),
  DB = "db_newbiecarnival.db",
  FILE = "x.新手嘉年华.xlsx",
  TABLE = "NewbieCarnivalParam",
  COMMAND = "select BinData from `NewbieCarnivalParam` where ActivityId=?",
  KEY_PREFIX = "NewbieCarnivalParamByActivityId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalParamByActivityId.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalParamByActivityId.GetConfig"),
  CONFIG_STAT_PREFIX = "configNewbieCarnivalParamByActivityId.GetConfig(";
exports.configNewbieCarnivalParamByActivityId = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (i, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${i})`),
      a = (o?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (a) {
      if (n) {
        var t = KEY_PREFIX + `#${i})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (e) return o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), e
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["ActivityId", i])) {
        t = void 0;
        if ([a, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", i]), a) {
          const e = NewbieCarnivalParam_1.NewbieCarnivalParam.getRootAsNewbieCarnivalParam(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          return n && (a = KEY_PREFIX + `#${i})`, ConfigCommon_1.ConfigCommon.SaveConfig(a, e)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), e
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=NewbieCarnivalParamByActivityId.js.map