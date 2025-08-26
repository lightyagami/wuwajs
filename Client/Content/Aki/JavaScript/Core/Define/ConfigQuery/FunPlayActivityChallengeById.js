"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFunPlayActivityChallengeById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FunPlayActivityChallenge_1 = require("../Config/FunPlayActivityChallenge");
const DB = "db_activityfunplay.db";
const FILE = "q.趣味玩法活动.xlsx";
const TABLE = "FunPlayActivityChallenge";
const COMMAND = "select BinData from `FunPlayActivityChallenge` where Id=?";
const KEY_PREFIX = "FunPlayActivityChallengeById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFunPlayActivityChallengeById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configFunPlayActivityChallengeById.GetConfig");
const CONFIG_STAT_PREFIX = "configFunPlayActivityChallengeById.GetConfig(";
exports.configFunPlayActivityChallengeById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    t?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (i) {
        var e = `${KEY_PREFIX}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (a) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        e = undefined;
        [o, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (o) {
          const a = FunPlayActivityChallenge_1.FunPlayActivityChallenge.getRootAsFunPlayActivityChallenge(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (i) {
            o = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(o, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FunPlayActivityChallengeById.js.map