"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configParkourChallengeByMarkId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ParkourChallenge_1 = require("../Config/ParkourChallenge");
const DB = "db_parkourchallenge.db";
const FILE = "p.跑酷挑战.xlsx";
const TABLE = "ParkourChallenge";
const COMMAND = "select BinData from `ParkourChallenge` where MarkId=?";
const KEY_PREFIX = "ParkourChallengeByMarkId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configParkourChallengeByMarkId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configParkourChallengeByMarkId.GetConfig");
const CONFIG_STAT_PREFIX = "configParkourChallengeByMarkId.GetConfig(";
exports.configParkourChallengeByMarkId = {
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
    var a = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (a) {
      if (n) {
        var r = `${KEY_PREFIX}#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(r);
        if (i) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (a = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MarkId", o]) > 0) {
        r = undefined;
        [a, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MarkId", o]);
        if (a) {
          const i = ParkourChallenge_1.ParkourChallenge.getRootAsParkourChallenge(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          if (n) {
            a = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(a, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ParkourChallengeByMarkId.js.map