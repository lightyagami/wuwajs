"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configQuestReviewLineById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const QuestReviewLine_1 = require("../Config/QuestReviewLine");
const DB = "db_questreview.db";
const FILE = "j.剧情历程.xlsx";
const TABLE = "QuestReviewLine";
const COMMAND = "select BinData from `QuestReviewLine` where Id=?";
const KEY_PREFIX = "QuestReviewLineById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configQuestReviewLineById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configQuestReviewLineById.GetConfig");
const CONFIG_STAT_PREFIX = "configQuestReviewLineById.GetConfig(";
exports.configQuestReviewLineById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    n?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (i) {
        var t = `${KEY_PREFIX}#${e})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", e]) > 0) {
        t = undefined;
        [o, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", e]);
        if (o) {
          const C = QuestReviewLine_1.QuestReviewLine.getRootAsQuestReviewLine(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (i) {
            o = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(o, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=QuestReviewLineById.js.map