"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBattlePassUnlockPopByBattlePassTypeId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BattlePassUnlockPop_1 = require("../Config/BattlePassUnlockPop");
const DB = "db_battle_pass.db";
const FILE = "z.战令.xlsx";
const TABLE = "BattlePassUnlockPop";
const COMMAND = "select BinData from `BattlePassUnlockPop` where TpyeID=?";
const KEY_PREFIX = "BattlePassUnlockPopByBattlePassTypeId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBattlePassUnlockPopByBattlePassTypeId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configBattlePassUnlockPopByBattlePassTypeId.GetConfig");
const CONFIG_STAT_PREFIX = "configBattlePassUnlockPopByBattlePassTypeId.GetConfig(";
exports.configBattlePassUnlockPopByBattlePassTypeId = {
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
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (t) {
        var a = `${KEY_PREFIX}#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (i) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TpyeID", o]) > 0) {
        a = undefined;
        [e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TpyeID", o]);
        if (e) {
          const i = BattlePassUnlockPop_1.BattlePassUnlockPop.getRootAsBattlePassUnlockPop(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (t) {
            e = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, i);
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
//# sourceMappingURL=BattlePassUnlockPopByBattlePassTypeId.js.map