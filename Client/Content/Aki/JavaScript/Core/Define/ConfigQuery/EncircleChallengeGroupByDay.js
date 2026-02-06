"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configEncircleChallengeGroupByDay = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const EncircleChallengeGroup_1 = require("../Config/EncircleChallengeGroup");
const DB = "db_encircle.db";
const FILE = "j.界面围剿.xlsx";
const TABLE = "EncircleChallengeGroup";
const COMMAND = "select BinData from `EncircleChallengeGroup` where ActivityId=? AND OpenDay=?";
const KEY_PREFIX = "EncircleChallengeGroupByDay";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configEncircleChallengeGroupByDay.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configEncircleChallengeGroupByDay.GetConfig");
const CONFIG_STAT_PREFIX = "configEncircleChallengeGroupByDay.GetConfig(";
exports.configEncircleChallengeGroupByDay = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n}#${o})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (e) {
        var C = `${KEY_PREFIX}#${n}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (a) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ActivityId", n], ["OpenDay", o]) > 0) {
        C = undefined;
        [t, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", n], ["OpenDay", o]);
        if (t) {
          const a = EncircleChallengeGroup_1.EncircleChallengeGroup.getRootAsEncircleChallengeGroup(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (e) {
            t = `${KEY_PREFIX}#${n}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=EncircleChallengeGroupByDay.js.map