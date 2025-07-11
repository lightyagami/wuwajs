"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBabelTowerDailyTaskByTaskId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BabelTowerDailyTask_1 = require("../Config/BabelTowerDailyTask");
const DB = "db_activity.db";
const FILE = "b.巴别塔活动.xlsx";
const TABLE = "BabelTowerDailyTask";
const COMMAND = "select BinData from `BabelTowerDailyTask` where TaskId=?";
const KEY_PREFIX = "BabelTowerDailyTaskByTaskId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBabelTowerDailyTaskByTaskId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configBabelTowerDailyTaskByTaskId.GetConfig");
const CONFIG_STAT_PREFIX = "configBabelTowerDailyTaskByTaskId.GetConfig(";
exports.configBabelTowerDailyTaskByTaskId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, a = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    i?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (a) {
        var e = `${KEY_PREFIX}#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (t) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TaskId", o]) > 0) {
        e = undefined;
        [n, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TaskId", o]);
        if (n) {
          const t = BabelTowerDailyTask_1.BabelTowerDailyTask.getRootAsBabelTowerDailyTask(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (a) {
            n = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=BabelTowerDailyTaskByTaskId.js.map