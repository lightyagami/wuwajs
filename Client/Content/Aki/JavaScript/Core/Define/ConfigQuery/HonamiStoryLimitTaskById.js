"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryLimitTaskById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryLimitTask_1 = require("../Config/HonamiStoryLimitTask");
const DB = "db_honamistory.db";
const FILE = "s.穗波物语活动奖励.xlsx";
const TABLE = "HonamiStoryLimitTask";
const COMMAND = "select BinData from `HonamiStoryLimitTask` where Id=?";
const KEY_PREFIX = "HonamiStoryLimitTaskById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryLimitTaskById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryLimitTaskById.GetConfig");
const CONFIG_STAT_PREFIX = "configHonamiStoryLimitTaskById.GetConfig(";
exports.configHonamiStoryLimitTaskById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var a = `${KEY_PREFIX}#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (m) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        a = undefined;
        [t, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (t) {
          const m = HonamiStoryLimitTask_1.HonamiStoryLimitTask.getRootAsHonamiStoryLimitTask(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (i) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, m);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryLimitTaskById.js.map