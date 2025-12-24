"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configQuestTreeCustomJumpConfigAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const QuestTreeCustomJumpConfig_1 = require("../Config/QuestTreeCustomJumpConfig");
const DB = "db_questtreecustomjumpconfig.db";
const FILE = "k.可视化编辑/c.Csv/r.任务树定制跳转/*.csv*";
const TABLE = "QuestTreeCustomJumpConfig";
const COMMAND = "select BinData from `QuestTreeCustomJumpConfig`";
const KEY_PREFIX = "QuestTreeCustomJumpConfigAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configQuestTreeCustomJumpConfigAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configQuestTreeCustomJumpConfigAll.GetConfigList");
exports.configQuestTreeCustomJumpConfigAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var t;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var n = KEY_PREFIX + ")";
        const i = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (i) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      const i = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var e = undefined;
        [t, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!t) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        e = QuestTreeCustomJumpConfig_1.QuestTreeCustomJumpConfig.getRootAsQuestTreeCustomJumpConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
        i.push(e);
      }
      if (o) {
        n = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(n, i, i.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return i;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=QuestTreeCustomJumpConfigAll.js.map