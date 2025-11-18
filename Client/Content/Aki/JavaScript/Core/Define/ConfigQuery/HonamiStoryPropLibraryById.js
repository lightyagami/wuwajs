"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryPropLibraryById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryPropLibrary_1 = require("../Config/HonamiStoryPropLibrary");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语道具.xlsx";
const TABLE = "HonamiStoryPropLibrary";
const COMMAND = "select BinData from `HonamiStoryPropLibrary` where Id=?";
const KEY_PREFIX = "HonamiStoryPropLibraryById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryPropLibraryById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryPropLibraryById.GetConfig");
const CONFIG_STAT_PREFIX = "configHonamiStoryPropLibraryById.GetConfig(";
exports.configHonamiStoryPropLibraryById = {
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
    var r = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (r) {
      if (n) {
        var t = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (r = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        t = undefined;
        [r, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (r) {
          const a = HonamiStoryPropLibrary_1.HonamiStoryPropLibrary.getRootAsHonamiStoryPropLibrary(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (n) {
            r = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(r, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryPropLibraryById.js.map