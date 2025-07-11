"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTakeWeedsDifficultyById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TakeWeedsDifficulty_1 = require("../Config/TakeWeedsDifficulty");
const DB = "db_activity.db";
const FILE = "g.割草活动.xlsx";
const TABLE = "TakeWeedsDifficulty";
const COMMAND = "select BinData from `TakeWeedsDifficulty` where Id=?";
const KEY_PREFIX = "TakeWeedsDifficultyById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTakeWeedsDifficultyById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configTakeWeedsDifficultyById.GetConfig");
const CONFIG_STAT_PREFIX = "configTakeWeedsDifficultyById.GetConfig(";
exports.configTakeWeedsDifficultyById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    e?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var n = `${KEY_PREFIX}#${i})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (f) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", i]) > 0) {
        n = undefined;
        [t, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", i]);
        if (t) {
          const f = TakeWeedsDifficulty_1.TakeWeedsDifficulty.getRootAsTakeWeedsDifficulty(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (o) {
            t = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=TakeWeedsDifficultyById.js.map