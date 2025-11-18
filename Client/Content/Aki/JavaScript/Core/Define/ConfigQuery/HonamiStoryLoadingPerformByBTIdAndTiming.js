"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryLoadingPerformByBTIdAndTiming = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryLoadingPerform_1 = require("../Config/HonamiStoryLoadingPerform");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语局外.xlsx";
const TABLE = "HonamiStoryLoadingPerform";
const COMMAND = "select BinData from `HonamiStoryLoadingPerform` where MainBTId=? AND Timing = ?";
const KEY_PREFIX = "HonamiStoryLoadingPerformByBTIdAndTiming";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryLoadingPerformByBTIdAndTiming.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryLoadingPerformByBTIdAndTiming.GetConfig");
const CONFIG_STAT_PREFIX = "configHonamiStoryLoadingPerformByBTIdAndTiming.GetConfig(";
exports.configHonamiStoryLoadingPerformByBTIdAndTiming = {
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
    var m = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (m) {
      if (i) {
        var r = `${KEY_PREFIX}#${o}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (a) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (m = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MainBTId", o], ["Timing", n]) > 0) {
        r = undefined;
        [m, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MainBTId", o], ["Timing", n]);
        if (m) {
          const a = HonamiStoryLoadingPerform_1.HonamiStoryLoadingPerform.getRootAsHonamiStoryLoadingPerform(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          if (i) {
            m = `${KEY_PREFIX}#${o}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(m, a);
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
//# sourceMappingURL=HonamiStoryLoadingPerformByBTIdAndTiming.js.map