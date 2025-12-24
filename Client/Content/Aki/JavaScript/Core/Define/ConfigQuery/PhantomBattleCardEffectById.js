"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhantomBattleCardEffectById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhantomBattleCardEffect_1 = require("../Config/PhantomBattleCardEffect");
const DB = "db_phantombattle.db";
const FILE = "s.声骸大作战外围.xlsx";
const TABLE = "PhantomBattleCardEffect";
const COMMAND = "select BinData from `PhantomBattleCardEffect` where Id=?";
const KEY_PREFIX = "PhantomBattleCardEffectById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleCardEffectById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomBattleCardEffectById.GetConfig");
const CONFIG_STAT_PREFIX = "configPhantomBattleCardEffectById.GetConfig(";
exports.configPhantomBattleCardEffectById = {
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
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (o) {
        var a = `${KEY_PREFIX}#${t})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (f) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", t]) > 0) {
        a = undefined;
        [e, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", t]);
        if (e) {
          const f = PhantomBattleCardEffect_1.PhantomBattleCardEffect.getRootAsPhantomBattleCardEffect(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (o) {
            e = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PhantomBattleCardEffectById.js.map