"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRogueWeeklyBuffPoolById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RogueWeeklyBuffPool_1 = require("../Config/RogueWeeklyBuffPool");
const DB = "db_weeklyrogue.db";
const FILE = "r.肉鸽周常.xlsx";
const TABLE = "RogueWeeklyBuffPool";
const COMMAND = "select BinData from `RogueWeeklyBuffPool` where Id=?";
const KEY_PREFIX = "RogueWeeklyBuffPoolById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRogueWeeklyBuffPoolById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRogueWeeklyBuffPoolById.GetConfig");
const CONFIG_STAT_PREFIX = "configRogueWeeklyBuffPoolById.GetConfig(";
exports.configRogueWeeklyBuffPoolById = {
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
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (e) {
        var i = `${KEY_PREFIX}#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        i = undefined;
        [f, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (f) {
          const t = RogueWeeklyBuffPool_1.RogueWeeklyBuffPool.getRootAsRogueWeeklyBuffPool(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (e) {
            f = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(f, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RogueWeeklyBuffPoolById.js.map