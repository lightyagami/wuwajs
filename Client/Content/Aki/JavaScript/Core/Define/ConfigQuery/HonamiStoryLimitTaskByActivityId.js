"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryLimitTaskByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryLimitTask_1 = require("../Config/HonamiStoryLimitTask");
const DB = "db_honamistory.db";
const FILE = "s.穗波物语活动奖励.xlsx";
const TABLE = "HonamiStoryLimitTask";
const COMMAND = "select BinData from `HonamiStoryLimitTask` where ActivityId=?";
const KEY_PREFIX = "HonamiStoryLimitTaskByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryLimitTaskByActivityId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryLimitTaskByActivityId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configHonamiStoryLimitTaskByActivityId.GetConfigList(";
exports.configHonamiStoryLimitTaskByActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${i})`);
    t?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var a = `${KEY_PREFIX}#${i})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (e) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair)) {
        const e = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActivityId", i]) !== 1) {
            break;
          }
          var m = undefined;
          [n, m] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", i]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          m = HonamiStoryLimitTask_1.HonamiStoryLimitTask.getRootAsHonamiStoryLimitTask(new byte_buffer_1.ByteBuffer(new Uint8Array(m.buffer)));
          e.push(m);
        }
        if (o) {
          a = `${KEY_PREFIX}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, e, e.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return e;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryLimitTaskByActivityId.js.map