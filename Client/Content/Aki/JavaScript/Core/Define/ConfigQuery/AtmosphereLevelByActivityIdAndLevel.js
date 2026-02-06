"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAtmosphereLevelByActivityIdAndLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AtmosphereLevel_1 = require("../Config/AtmosphereLevel");
const DB = "db_spring26.db";
const FILE = "c.3.1春节活动外围.xlsx";
const TABLE = "AtmosphereLevel";
const COMMAND = "select BinData from `AtmosphereLevel` where ActivityId=? AND Level=?";
const KEY_PREFIX = "AtmosphereLevelByActivityIdAndLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAtmosphereLevelByActivityIdAndLevel.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configAtmosphereLevelByActivityIdAndLevel.GetConfig");
const CONFIG_STAT_PREFIX = "configAtmosphereLevelByActivityIdAndLevel.GetConfig(";
exports.configAtmosphereLevelByActivityIdAndLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e}#${o})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (t) {
        var C = `${KEY_PREFIX}#${e}#${o})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (m) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ActivityId", e], ["Level", o]) > 0) {
        C = undefined;
        [i, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", e], ["Level", o]);
        if (i) {
          const m = AtmosphereLevel_1.AtmosphereLevel.getRootAsAtmosphereLevel(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (t) {
            i = `${KEY_PREFIX}#${e}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, m);
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
//# sourceMappingURL=AtmosphereLevelByActivityIdAndLevel.js.map