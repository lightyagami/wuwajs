"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCorniceChallengeById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CorniceChallenge_1 = require("../Config/CorniceChallenge");
const DB = "db_activity.db";
const FILE = "s.数据收集异常活动.xlsx";
const TABLE = "CorniceChallenge";
const COMMAND = "select BinData from `CorniceChallenge` where Id=?";
const KEY_PREFIX = "CorniceChallengeById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCorniceChallengeById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCorniceChallengeById.GetConfig");
const CONFIG_STAT_PREFIX = "configCorniceChallengeById.GetConfig(";
exports.configCorniceChallengeById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    e?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var C = `${KEY_PREFIX}#${n})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (t) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        C = undefined;
        [i, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (i) {
          const t = CorniceChallenge_1.CorniceChallenge.getRootAsCorniceChallenge(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (o) {
            i = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=CorniceChallengeById.js.map