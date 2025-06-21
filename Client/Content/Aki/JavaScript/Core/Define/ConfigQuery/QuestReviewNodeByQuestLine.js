"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configQuestReviewNodeByQuestLine = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  QuestReviewNode_1 = require("../Config/QuestReviewNode"),
  DB = "db_questreview.db",
  FILE = "j.剧情历程.xlsx",
  TABLE = "QuestReviewNode",
  COMMAND = "select BinData from `QuestReviewNode` where QuestLine=?",
  KEY_PREFIX = "QuestReviewNodeByQuestLine",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configQuestReviewNodeByQuestLine.Init"),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configQuestReviewNodeByQuestLine.GetConfigList"),
  CONFIG_LIST_STAT_PREFIX = "configQuestReviewNodeByQuestLine.GetConfigList(";
exports.configQuestReviewNodeByQuestLine = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfigList: (e, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(CONFIG_LIST_STAT_PREFIX + `#${e})`),
      t = (i?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var n = KEY_PREFIX + `#${e})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (f) return i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), f
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair)) {
        const f = new Array;
        for (;;) {
          if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair, ["QuestLine", e])) break;
          var C = void 0;
          if ([t, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["QuestLine", e]), !t) return ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigListStat?.Stop(), void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          C = QuestReviewNode_1.QuestReviewNode.getRootAsQuestReviewNode(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          f.push(C)
        }
        return o && (n = KEY_PREFIX + `#${e})`, ConfigCommon_1.ConfigCommon.SaveConfig(n, f, f.length)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), f
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    i?.Stop(), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=QuestReviewNodeByQuestLine.js.map