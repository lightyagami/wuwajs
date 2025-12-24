"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configInfrActivityTaskByTaskId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const InfrActivityTask_1 = require("../Config/InfrActivityTask");
const DB = "db_infrastructure.db";
const FILE = "j.基建.xlsx";
const TABLE = "InfrActivityTask";
const COMMAND = "select BinData from `InfrActivityTask` where TaskId=?";
const KEY_PREFIX = "InfrActivityTaskByTaskId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configInfrActivityTaskByTaskId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configInfrActivityTaskByTaskId.GetConfig");
const CONFIG_STAT_PREFIX = "configInfrActivityTaskByTaskId.GetConfig(";
exports.configInfrActivityTaskByTaskId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    i?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (t) {
        var a = `${KEY_PREFIX}#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (f) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TaskId", n]) > 0) {
        a = undefined;
        [o, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TaskId", n]);
        if (o) {
          const f = InfrActivityTask_1.InfrActivityTask.getRootAsInfrActivityTask(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (t) {
            o = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(o, f);
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
//# sourceMappingURL=InfrActivityTaskByTaskId.js.map