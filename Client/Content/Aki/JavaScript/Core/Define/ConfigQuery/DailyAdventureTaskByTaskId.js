"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDailyAdventureTaskByTaskId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DailyAdventureTask_1 = require("../Config/DailyAdventureTask");
const DB = "db_activity.db";
const FILE = "r.日常探险活动.xlsx";
const TABLE = "DailyAdventureTask";
const COMMAND = "select BinData from `DailyAdventureTask` where TaskId=?";
const KEY_PREFIX = "DailyAdventureTaskByTaskId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDailyAdventureTaskByTaskId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configDailyAdventureTaskByTaskId.GetConfig");
const CONFIG_STAT_PREFIX = "configDailyAdventureTaskByTaskId.GetConfig(";
exports.configDailyAdventureTaskByTaskId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var e = `${KEY_PREFIX}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TaskId", n]) > 0) {
        e = undefined;
        [t, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TaskId", n]);
        if (t) {
          const a = DailyAdventureTask_1.DailyAdventureTask.getRootAsDailyAdventureTask(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (o) {
            t = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=DailyAdventureTaskByTaskId.js.map