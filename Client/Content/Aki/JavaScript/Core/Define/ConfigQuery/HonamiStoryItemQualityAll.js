"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryItemQualityAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryItemQuality_1 = require("../Config/HonamiStoryItemQuality");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语道具.xlsx";
const TABLE = "HonamiStoryItemQuality";
const COMMAND = "select BinData from `HonamiStoryItemQuality`";
const KEY_PREFIX = "HonamiStoryItemQualityAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryItemQualityAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryItemQualityAll.GetConfigList");
exports.configHonamiStoryItemQualityAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var t;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var i = KEY_PREFIX + ")";
        const e = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (e) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      const e = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var n = undefined;
        [t, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!t) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        n = HonamiStoryItemQuality_1.HonamiStoryItemQuality.getRootAsHonamiStoryItemQuality(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
        e.push(n);
      }
      if (o) {
        i = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(i, e, e.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return e;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryItemQualityAll.js.map