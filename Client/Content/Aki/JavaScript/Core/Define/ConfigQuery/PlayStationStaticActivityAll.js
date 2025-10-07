"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPlayStationStaticActivityAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PlayStationStaticActivity_1 = require("../Config/PlayStationStaticActivity");
const DB = "db_quest.db";
const FILE = "r.任务.xlsx";
const TABLE = "PlayStationStaticActivity";
const COMMAND = "select BinData from `PlayStationStaticActivity`";
const KEY_PREFIX = "PlayStationStaticActivityAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPlayStationStaticActivityAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configPlayStationStaticActivityAll.GetConfigList");
exports.configPlayStationStaticActivityAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (t = true) => {
    var i;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (t) {
        var o = KEY_PREFIX + ")";
        const a = ConfigCommon_1.ConfigCommon.GetConfig(o);
        if (a) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      const a = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var n = undefined;
        [i, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!i) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        n = PlayStationStaticActivity_1.PlayStationStaticActivity.getRootAsPlayStationStaticActivity(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
        a.push(n);
      }
      if (t) {
        o = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(o, a, a.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return a;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PlayStationStaticActivityAll.js.map