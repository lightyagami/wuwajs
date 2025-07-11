"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRacingBetRankOpenTimeById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RacingBetRankOpenTime_1 = require("../Config/RacingBetRankOpenTime");
const DB = "db_racingbets.db";
const FILE = "q.全服赌马.xlsx";
const TABLE = "RacingBetRankOpenTime";
const COMMAND = "select BinData from `RacingBetRankOpenTime` where Id=?";
const KEY_PREFIX = "RacingBetRankOpenTimeById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRacingBetRankOpenTimeById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRacingBetRankOpenTimeById.GetConfig");
const CONFIG_STAT_PREFIX = "configRacingBetRankOpenTimeById.GetConfig(";
exports.configRacingBetRankOpenTimeById = {
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
        var t = `${KEY_PREFIX}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (a) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        t = undefined;
        [o, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (o) {
          const a = RacingBetRankOpenTime_1.RacingBetRankOpenTime.getRootAsRacingBetRankOpenTime(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (e) {
            o = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(o, a);
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
//# sourceMappingURL=RacingBetRankOpenTimeById.js.map