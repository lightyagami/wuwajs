"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBattlePassTaskByTaskId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BattlePassTask_1 = require("../Config/BattlePassTask");
const DB = "db_battle_pass.db";
const FILE = "z.战令.xlsx";
const TABLE = "BattlePassTask";
const COMMAND = "select BinData from `BattlePassTask` where TaskId=?";
const KEY_PREFIX = "BattlePassTaskByTaskId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBattlePassTaskByTaskId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configBattlePassTaskByTaskId.GetConfig");
const CONFIG_STAT_PREFIX = "configBattlePassTaskByTaskId.GetConfig(";
exports.configBattlePassTaskByTaskId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var a = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t})`);
    a?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var e = `${KEY_PREFIX}#${t})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i) {
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TaskId", t]) > 0) {
        e = undefined;
        [n, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TaskId", t]);
        if (n) {
          const i = BattlePassTask_1.BattlePassTask.getRootAsBattlePassTask(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (o) {
            n = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=BattlePassTaskByTaskId.js.map