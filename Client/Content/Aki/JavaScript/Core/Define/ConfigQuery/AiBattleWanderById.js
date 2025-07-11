"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAiBattleWanderById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AiBattleWander_1 = require("../Config/AiBattleWander");
const DB = "db_ai.db";
const FILE = "a.AI战斗游荡.xlsx";
const TABLE = "AiBattleWander";
const COMMAND = "select BinData from `AiBattleWander` where Id=?";
const KEY_PREFIX = "AiBattleWanderById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAiBattleWanderById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configAiBattleWanderById.GetConfig");
const CONFIG_STAT_PREFIX = "configAiBattleWanderById.GetConfig(";
exports.configAiBattleWanderById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var e = `${KEY_PREFIX}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        e = undefined;
        [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (i) {
          const a = AiBattleWander_1.AiBattleWander.getRootAsAiBattleWander(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (o) {
            i = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=AiBattleWanderById.js.map