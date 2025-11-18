"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryLoadingPerformByBTId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryLoadingPerform_1 = require("../Config/HonamiStoryLoadingPerform");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语局外.xlsx";
const TABLE = "HonamiStoryLoadingPerform";
const COMMAND = "select BinData from `HonamiStoryLoadingPerform` where MainBTId=?";
const KEY_PREFIX = "HonamiStoryLoadingPerformByBTId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryLoadingPerformByBTId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryLoadingPerformByBTId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configHonamiStoryLoadingPerformByBTId.GetConfigList(";
exports.configHonamiStoryLoadingPerformByBTId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var r = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (e) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const e = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["MainBTId", o]) !== 1) {
            break;
          }
          var a = undefined;
          [t, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MainBTId", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = HonamiStoryLoadingPerform_1.HonamiStoryLoadingPerform.getRootAsHonamiStoryLoadingPerform(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          e.push(a);
        }
        if (n) {
          r = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(r, e, e.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return e;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryLoadingPerformByBTId.js.map