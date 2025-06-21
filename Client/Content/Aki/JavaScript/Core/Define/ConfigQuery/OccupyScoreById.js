"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configOccupyScoreById = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  OccupyScore_1 = require("../Config/OccupyScore"),
  DB = "db_moraleplay.db",
  FILE = "c.插旗玩法.xlsx",
  TABLE = "OccupyScore",
  COMMAND = "select BinData from `OccupyScore` where Id=?",
  KEY_PREFIX = "OccupyScoreById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configOccupyScoreById.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configOccupyScoreById.GetConfig"),
  CONFIG_STAT_PREFIX = "configOccupyScoreById.GetConfig(";
exports.configOccupyScoreById = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (o, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${o})`),
      i = (e?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (i) {
      if (n) {
        var t = KEY_PREFIX + `#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) return e?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Id", o])) {
        t = void 0;
        if ([i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]), i) {
          const C = OccupyScore_1.OccupyScore.getRootAsOccupyScore(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          return n && (i = KEY_PREFIX + `#${o})`, ConfigCommon_1.ConfigCommon.SaveConfig(i, C)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), e?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    e?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=OccupyScoreById.js.map