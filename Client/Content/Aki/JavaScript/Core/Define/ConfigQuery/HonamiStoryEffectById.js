"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryEffectById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryEffect_1 = require("../Config/HonamiStoryEffect");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语装备栏.xlsx";
const TABLE = "HonamiStoryEffect";
const COMMAND = "select BinData from `HonamiStoryEffect` where Id=?";
const KEY_PREFIX = "HonamiStoryEffectById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryEffectById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryEffectById.GetConfig");
const CONFIG_STAT_PREFIX = "configHonamiStoryEffectById.GetConfig(";
exports.configHonamiStoryEffectById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var f = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (e) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        f = undefined;
        [i, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (i) {
          const e = HonamiStoryEffect_1.HonamiStoryEffect.getRootAsHonamiStoryEffect(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          if (n) {
            i = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryEffectById.js.map