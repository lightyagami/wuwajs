"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoadBookLevelExpById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoadBookLevelExp_1 = require("../Config/RoadBookLevelExp");
const DB = "db_roadbook.db";
const FILE = "q.千岛路书3.0.xlsx";
const TABLE = "RoadBookLevelExp";
const COMMAND = "select BinData from `RoadBookLevelExp` where Id=?";
const KEY_PREFIX = "RoadBookLevelExpById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoadBookLevelExpById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRoadBookLevelExpById.GetConfig");
const CONFIG_STAT_PREFIX = "configRoadBookLevelExpById.GetConfig(";
exports.configRoadBookLevelExpById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    e?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var t = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        t = undefined;
        [i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (i) {
          const a = RoadBookLevelExp_1.RoadBookLevelExp.getRootAsRoadBookLevelExp(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (n) {
            i = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RoadBookLevelExpById.js.map