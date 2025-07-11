"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFishingActivityLimitTaskByTaskId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FishingActivityLimitTask_1 = require("../Config/FishingActivityLimitTask");
const DB = "db_fishing.db";
const FILE = "b.捕鱼大活动.xlsx";
const TABLE = "FishingActivityLimitTask";
const COMMAND = "select BinData from `FishingActivityLimitTask` where TaskId=?";
const KEY_PREFIX = "FishingActivityLimitTaskByTaskId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFishingActivityLimitTaskByTaskId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configFishingActivityLimitTaskByTaskId.GetConfig");
const CONFIG_STAT_PREFIX = "configFishingActivityLimitTaskByTaskId.GetConfig(";
exports.configFishingActivityLimitTaskByTaskId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    n?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (t) {
        var a = `${KEY_PREFIX}#${i})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (e) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TaskId", i]) > 0) {
        a = undefined;
        [o, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TaskId", i]);
        if (o) {
          const e = FishingActivityLimitTask_1.FishingActivityLimitTask.getRootAsFishingActivityLimitTask(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (t) {
            o = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(o, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FishingActivityLimitTaskByTaskId.js.map