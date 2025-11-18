"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryItemQualityById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryItemQuality_1 = require("../Config/HonamiStoryItemQuality");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语道具.xlsx";
const TABLE = "HonamiStoryItemQuality";
const COMMAND = "select BinData from `HonamiStoryItemQuality` where Id=?";
const KEY_PREFIX = "HonamiStoryItemQualityById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryItemQualityById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryItemQualityById.GetConfig");
const CONFIG_STAT_PREFIX = "configHonamiStoryItemQualityById.GetConfig(";
exports.configHonamiStoryItemQualityById = {
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
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (t) {
        var e = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        e = undefined;
        [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (i) {
          const a = HonamiStoryItemQuality_1.HonamiStoryItemQuality.getRootAsHonamiStoryItemQuality(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            i = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryItemQualityById.js.map