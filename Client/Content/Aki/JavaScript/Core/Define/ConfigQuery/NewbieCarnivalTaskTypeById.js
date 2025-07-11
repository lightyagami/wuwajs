"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configNewbieCarnivalTaskTypeById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const NewbieCarnivalTaskType_1 = require("../Config/NewbieCarnivalTaskType");
const DB = "db_newbiecarnival.db";
const FILE = "x.新手嘉年华.xlsx";
const TABLE = "NewbieCarnivalTaskType";
const COMMAND = "select BinData from `NewbieCarnivalTaskType` where Id=?";
const KEY_PREFIX = "NewbieCarnivalTaskTypeById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalTaskTypeById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configNewbieCarnivalTaskTypeById.GetConfig");
const CONFIG_STAT_PREFIX = "configNewbieCarnivalTaskTypeById.GetConfig(";
exports.configNewbieCarnivalTaskTypeById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    i?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (e) {
        var a = `${KEY_PREFIX}#${n})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (t) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        a = undefined;
        [o, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (o) {
          const t = NewbieCarnivalTaskType_1.NewbieCarnivalTaskType.getRootAsNewbieCarnivalTaskType(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (e) {
            o = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(o, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=NewbieCarnivalTaskTypeById.js.map