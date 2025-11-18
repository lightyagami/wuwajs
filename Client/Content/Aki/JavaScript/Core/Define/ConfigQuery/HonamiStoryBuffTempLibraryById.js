"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryBuffTempLibraryById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryBuffTempLibrary_1 = require("../Config/HonamiStoryBuffTempLibrary");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语道具.xlsx";
const TABLE = "HonamiStoryBuffTempLibrary";
const COMMAND = "select BinData from `HonamiStoryBuffTempLibrary` where Id=?";
const KEY_PREFIX = "HonamiStoryBuffTempLibraryById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryBuffTempLibraryById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryBuffTempLibraryById.GetConfig");
const CONFIG_STAT_PREFIX = "configHonamiStoryBuffTempLibraryById.GetConfig(";
exports.configHonamiStoryBuffTempLibraryById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var r = `${KEY_PREFIX}#${o})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (f) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        r = undefined;
        [t, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (t) {
          const f = HonamiStoryBuffTempLibrary_1.HonamiStoryBuffTempLibrary.getRootAsHonamiStoryBuffTempLibrary(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          if (n) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryBuffTempLibraryById.js.map