"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configQuestTreeCustomJumpConfigByQuestIdAndType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const QuestTreeCustomJumpConfig_1 = require("../Config/QuestTreeCustomJumpConfig");
const DB = "db_questtreecustomjumpconfig.db";
const FILE = "k.可视化编辑/c.Csv/r.任务树定制跳转/*.csv*";
const TABLE = "QuestTreeCustomJumpConfig";
const COMMAND = "select BinData from `QuestTreeCustomJumpConfig` where QuestId=? AND PreConditionType=?";
const KEY_PREFIX = "QuestTreeCustomJumpConfigByQuestIdAndType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configQuestTreeCustomJumpConfigByQuestIdAndType.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configQuestTreeCustomJumpConfigByQuestIdAndType.GetConfig");
const CONFIG_STAT_PREFIX = "configQuestTreeCustomJumpConfigByQuestIdAndType.GetConfig(";
exports.configQuestTreeCustomJumpConfigByQuestIdAndType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${e})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var C = `${KEY_PREFIX}#${o}#${e})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (m) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 2, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["QuestId", o], ["PreConditionType", e]) > 0) {
        C = undefined;
        [i, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["QuestId", o], ["PreConditionType", e]);
        if (i) {
          const m = QuestTreeCustomJumpConfig_1.QuestTreeCustomJumpConfig.getRootAsQuestTreeCustomJumpConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (n) {
            i = `${KEY_PREFIX}#${o}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, m);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=QuestTreeCustomJumpConfigByQuestIdAndType.js.map