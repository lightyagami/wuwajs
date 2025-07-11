"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhantomBattleTaskTabById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhantomBattleTaskTab_1 = require("../Config/PhantomBattleTaskTab");
const DB = "db_phantombattle.db";
const FILE = "s.声骸大作战外围.xlsx";
const TABLE = "PhantomBattleTaskTab";
const COMMAND = "select BinData from `PhantomBattleTaskTab` where Id=?";
const KEY_PREFIX = "PhantomBattleTaskTabById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleTaskTabById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleTaskTabById.GetConfig");
const CONFIG_STAT_PREFIX = "configPhantomBattleTaskTabById.GetConfig(";
exports.configPhantomBattleTaskTabById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t})`);
    n?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (o) {
        var e = `${KEY_PREFIX}#${t})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (i) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", t]) > 0) {
        e = undefined;
        [a, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", t]);
        if (a) {
          const i = PhantomBattleTaskTab_1.PhantomBattleTaskTab.getRootAsPhantomBattleTaskTab(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (o) {
            a = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PhantomBattleTaskTabById.js.map