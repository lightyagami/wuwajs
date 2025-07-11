"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configGachaEffectConfigByTimesAndQuality = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const GachaEffectConfig_1 = require("../Config/GachaEffectConfig");
const DB = "db_gacha.db";
const FILE = "c.抽卡.xlsx";
const TABLE = "GachaEffectConfig";
const COMMAND = "select BinData from `GachaEffectConfig` where Times=? AND Quality=?";
const KEY_PREFIX = "GachaEffectConfigByTimesAndQuality";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configGachaEffectConfigByTimesAndQuality.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configGachaEffectConfigByTimesAndQuality.GetConfig");
const CONFIG_STAT_PREFIX = "configGachaEffectConfigByTimesAndQuality.GetConfig(";
exports.configGachaEffectConfigByTimesAndQuality = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${n})`);
    t?.Start();
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (i) {
        var e = `${KEY_PREFIX}#${o}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Times", o], ["Quality", n]) > 0) {
        e = undefined;
        [f, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Times", o], ["Quality", n]);
        if (f) {
          const a = GachaEffectConfig_1.GachaEffectConfig.getRootAsGachaEffectConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (i) {
            f = `${KEY_PREFIX}#${o}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(f, a);
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
//# sourceMappingURL=GachaEffectConfigByTimesAndQuality.js.map