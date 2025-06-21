"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configQuestReviewEntryById = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  QuestReviewEntry_1 = require("../Config/QuestReviewEntry"),
  DB = "db_questreview.db",
  FILE = "j.剧情历程.xlsx",
  TABLE = "QuestReviewEntry",
  COMMAND = "select BinData from `QuestReviewEntry` where Id=?",
  KEY_PREFIX = "QuestReviewEntryById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configQuestReviewEntryById.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configQuestReviewEntryById.GetConfig"),
  CONFIG_STAT_PREFIX = "configQuestReviewEntryById.GetConfig(";
exports.configQuestReviewEntryById = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (e, n = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${e})`),
      t = (o?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (n) {
        var i = KEY_PREFIX + `#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C) return o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Id", e])) {
        i = void 0;
        if ([t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", e]), t) {
          const C = QuestReviewEntry_1.QuestReviewEntry.getRootAsQuestReviewEntry(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          return n && (t = KEY_PREFIX + `#${e})`, ConfigCommon_1.ConfigCommon.SaveConfig(t, C)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    o?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=QuestReviewEntryById.js.map