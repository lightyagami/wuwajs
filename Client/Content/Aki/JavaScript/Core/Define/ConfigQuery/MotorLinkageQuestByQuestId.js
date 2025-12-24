"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMotorLinkageQuestByQuestId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MotorLinkageQuest_1 = require("../Config/MotorLinkageQuest");
const DB = "db_motorlinkage.db";
const FILE = "m.摩托车IP联动活动.xlsx";
const TABLE = "MotorLinkageQuest";
const COMMAND = "select BinData from `MotorLinkageQuest` where TaskId=?";
const KEY_PREFIX = "MotorLinkageQuestByQuestId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMotorLinkageQuestByQuestId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMotorLinkageQuestByQuestId.GetConfig");
const CONFIG_STAT_PREFIX = "configMotorLinkageQuestByQuestId.GetConfig(";
exports.configMotorLinkageQuestByQuestId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (t) {
        var i = `${KEY_PREFIX}#${o})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (g) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TaskId", o]) > 0) {
        i = undefined;
        [e, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TaskId", o]);
        if (e) {
          const g = MotorLinkageQuest_1.MotorLinkageQuest.getRootAsMotorLinkageQuest(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (t) {
            e = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MotorLinkageQuestByQuestId.js.map