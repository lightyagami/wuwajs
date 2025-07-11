"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configNewbieCarnivalTaskByTaskType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const NewbieCarnivalTask_1 = require("../Config/NewbieCarnivalTask");
const DB = "db_newbiecarnival.db";
const FILE = "x.新手嘉年华.xlsx";
const TABLE = "NewbieCarnivalTask";
const COMMAND = "select BinData from `NewbieCarnivalTask` where TaskType=?";
const KEY_PREFIX = "NewbieCarnivalTaskByTaskType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalTaskByTaskType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalTaskByTaskType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configNewbieCarnivalTaskByTaskType.GetConfigList(";
exports.configNewbieCarnivalTaskByTaskType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (i, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${i})`);
    o?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var a = `${KEY_PREFIX}#${i})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C) {
          o?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["TaskType", i]) !== 1) {
            break;
          }
          var t = undefined;
          [e, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TaskType", i]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            o?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          t = NewbieCarnivalTask_1.NewbieCarnivalTask.getRootAsNewbieCarnivalTask(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          C.push(t);
        }
        if (n) {
          a = `${KEY_PREFIX}#${i})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        o?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=NewbieCarnivalTaskByTaskType.js.map