"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configNewbieCarnivalTaskByTaskId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const NewbieCarnivalTask_1 = require("../Config/NewbieCarnivalTask");
const DB = "db_newbiecarnival.db";
const FILE = "x.新手嘉年华.xlsx";
const TABLE = "NewbieCarnivalTask";
const COMMAND = "select BinData from `NewbieCarnivalTask` where TaskId=?";
const KEY_PREFIX = "NewbieCarnivalTaskByTaskId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalTaskByTaskId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalTaskByTaskId.GetConfig");
const CONFIG_STAT_PREFIX = "configNewbieCarnivalTaskByTaskId.GetConfig(";
exports.configNewbieCarnivalTaskByTaskId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    o?.Start();
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (i) {
        var e = `${KEY_PREFIX}#${n})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (t) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TaskId", n]) > 0) {
        e = undefined;
        [a, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TaskId", n]);
        if (a) {
          const t = NewbieCarnivalTask_1.NewbieCarnivalTask.getRootAsNewbieCarnivalTask(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (i) {
            a = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=NewbieCarnivalTaskByTaskId.js.map