"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configDailyAdventureActivityByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DailyAdventureActivity_1 = require("../Config/DailyAdventureActivity");
const DB = "db_activity.db";
const FILE = "r.日常探险活动.xlsx";
const TABLE = "DailyAdventureActivity";
const COMMAND = "select BinData from `DailyAdventureActivity` where ActivityId=?";
const KEY_PREFIX = "DailyAdventureActivityByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configDailyAdventureActivityByActivityId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configDailyAdventureActivityByActivityId.GetConfig");
const CONFIG_STAT_PREFIX = "configDailyAdventureActivityByActivityId.GetConfig(";
exports.configDailyAdventureActivityByActivityId = {
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
        var e = `${KEY_PREFIX}#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ActivityId", i]) > 0) {
        e = undefined;
        [o, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", i]);
        if (o) {
          const a = DailyAdventureActivity_1.DailyAdventureActivity.getRootAsDailyAdventureActivity(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            o = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(o, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=DailyAdventureActivityByActivityId.js.map