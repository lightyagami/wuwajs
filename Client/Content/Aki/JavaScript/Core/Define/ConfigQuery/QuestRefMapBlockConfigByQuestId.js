"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configQuestRefMapBlockConfigByQuestId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const QuestRefMapBlockConfig_1 = require("../Config/QuestRefMapBlockConfig");
const DB = "db_questrefmapblock.db";
const FILE = "UniverseEditor/QuestRefMapBlockConfig/QuestRefMapBlock.csv";
const TABLE = "QuestRefMapBlockConfig";
const COMMAND = "select BinData from `QuestRefMapBlockConfig` where QuestId=?";
const KEY_PREFIX = "QuestRefMapBlockConfigByQuestId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configQuestRefMapBlockConfigByQuestId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configQuestRefMapBlockConfigByQuestId.GetConfig");
const CONFIG_STAT_PREFIX = "configQuestRefMapBlockConfigByQuestId.GetConfig(";
exports.configQuestRefMapBlockConfigByQuestId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (e) {
        var i = `${KEY_PREFIX}#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (f) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["QuestId", o]) > 0) {
        i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["QuestId", o]);
        if (t) {
          const f = QuestRefMapBlockConfig_1.QuestRefMapBlockConfig.getRootAsQuestRefMapBlockConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (e) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=QuestRefMapBlockConfigByQuestId.js.map