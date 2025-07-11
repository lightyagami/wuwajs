"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhantomBattleFourCTaskByCardId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhantomBattleFourCTask_1 = require("../Config/PhantomBattleFourCTask");
const DB = "db_phantombattle.db";
const FILE = "s.声骸大作战战斗.xlsx";
const TABLE = "PhantomBattleFourCTask";
const COMMAND = "select BinData from `PhantomBattleFourCTask` where CardId=?";
const KEY_PREFIX = "PhantomBattleFourCTaskByCardId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleFourCTaskByCardId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleFourCTaskByCardId.GetConfig");
const CONFIG_STAT_PREFIX = "configPhantomBattleFourCTaskByCardId.GetConfig(";
exports.configPhantomBattleFourCTaskByCardId = {
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
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (t) {
        var C = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (e) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["CardId", o]) > 0) {
        C = undefined;
        [a, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["CardId", o]);
        if (a) {
          const e = PhantomBattleFourCTask_1.PhantomBattleFourCTask.getRootAsPhantomBattleFourCTask(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (t) {
            a = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, e);
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
//# sourceMappingURL=PhantomBattleFourCTaskByCardId.js.map