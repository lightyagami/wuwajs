"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryLoadingPerformByTiming = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryLoadingPerform_1 = require("../Config/HonamiStoryLoadingPerform");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语局外.xlsx";
const TABLE = "HonamiStoryLoadingPerform";
const COMMAND = "select BinData from `HonamiStoryLoadingPerform` where Timing = ?";
const KEY_PREFIX = "HonamiStoryLoadingPerformByTiming";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryLoadingPerformByTiming.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryLoadingPerformByTiming.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configHonamiStoryLoadingPerformByTiming.GetConfigList(";
exports.configHonamiStoryLoadingPerformByTiming = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var r = `${KEY_PREFIX}#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (m) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const m = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["Timing", o]) !== 1) {
            break;
          }
          var e = undefined;
          [t, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Timing", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          e = HonamiStoryLoadingPerform_1.HonamiStoryLoadingPerform.getRootAsHonamiStoryLoadingPerform(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          m.push(e);
        }
        if (i) {
          r = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(r, m, m.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return m;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryLoadingPerformByTiming.js.map