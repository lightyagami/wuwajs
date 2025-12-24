"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoadBookTaskByTaskId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoadBookTask_1 = require("../Config/RoadBookTask");
const DB = "db_roadbook.db";
const FILE = "q.千岛路书3.0.xlsx";
const TABLE = "RoadBookTask";
const COMMAND = "select BinData from `RoadBookTask` where TaskId=?";
const KEY_PREFIX = "RoadBookTaskByTaskId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoadBookTaskByTaskId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRoadBookTaskByTaskId.GetConfig");
const CONFIG_STAT_PREFIX = "configRoadBookTaskByTaskId.GetConfig(";
exports.configRoadBookTaskByTaskId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var a = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    a?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var t = `${KEY_PREFIX}#${o})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (e) {
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TaskId", o]) > 0) {
        t = undefined;
        [i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TaskId", o]);
        if (i) {
          const e = RoadBookTask_1.RoadBookTask.getRootAsRoadBookTask(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (n) {
            i = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RoadBookTaskByTaskId.js.map