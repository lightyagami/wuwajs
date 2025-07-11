"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configKillMonstersScoresByInstanceID = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const KillMonstersScores_1 = require("../Config/KillMonstersScores");
const DB = "db_activity.db";
const FILE = "g.割草活动.xlsx";
const TABLE = "KillMonstersScores";
const COMMAND = "select BinData from `KillMonstersScores` where InstanceID=?";
const KEY_PREFIX = "KillMonstersScoresByInstanceID";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configKillMonstersScoresByInstanceID.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configKillMonstersScoresByInstanceID.GetConfig");
const CONFIG_STAT_PREFIX = "configKillMonstersScoresByInstanceID.GetConfig(";
exports.configKillMonstersScoresByInstanceID = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    t?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var i = `${KEY_PREFIX}#${o})`;
        const s = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (s) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return s;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["InstanceID", o]) > 0) {
        i = undefined;
        [e, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["InstanceID", o]);
        if (e) {
          const s = KillMonstersScores_1.KillMonstersScores.getRootAsKillMonstersScores(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, s);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return s;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=KillMonstersScoresByInstanceID.js.map