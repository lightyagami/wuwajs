"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configQuestReviewLineById = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  QuestReviewLine_1 = require("../Config/QuestReviewLine"),
  DB = "db_questreview.db",
  FILE = "j.剧情历程.xlsx",
  TABLE = "QuestReviewLine",
  COMMAND = "select BinData from `QuestReviewLine` where Id=?",
  KEY_PREFIX = "QuestReviewLineById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configQuestReviewLineById.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configQuestReviewLineById.GetConfig"),
  CONFIG_STAT_PREFIX = "configQuestReviewLineById.GetConfig(";
exports.configQuestReviewLineById = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (e, i = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${e})`),
      o = (n?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (o) {
      if (i) {
        var t = KEY_PREFIX + `#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) return n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Id", e])) {
        t = void 0;
        if ([o, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", e]), o) {
          const C = QuestReviewLine_1.QuestReviewLine.getRootAsQuestReviewLine(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          return i && (o = KEY_PREFIX + `#${e})`, ConfigCommon_1.ConfigCommon.SaveConfig(o, C)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    n?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=QuestReviewLineById.js.map