"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configBabelTowerDifficultyByActivityIdAndDifficultyId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const BabelTowerDifficulty_1 = require("../Config/BabelTowerDifficulty");
const DB = "db_activity.db";
const FILE = "b.巴别塔活动.xlsx";
const TABLE = "BabelTowerDifficulty";
const COMMAND = "select BinData from `BabelTowerDifficulty` where ActivityId=? AND DifficultyId=?";
const KEY_PREFIX = "BabelTowerDifficultyByActivityIdAndDifficultyId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configBabelTowerDifficultyByActivityIdAndDifficultyId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configBabelTowerDifficultyByActivityIdAndDifficultyId.GetConfig");
const CONFIG_STAT_PREFIX = "configBabelTowerDifficultyByActivityIdAndDifficultyId.GetConfig(";
exports.configBabelTowerDifficultyByActivityIdAndDifficultyId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i}#${o})`);
    n?.Start();
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (t) {
        var e = `${KEY_PREFIX}#${i}#${o})`;
        const l = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (l) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["ActivityId", i], ["DifficultyId", o]) > 0) {
        e = undefined;
        [f, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", i], ["DifficultyId", o]);
        if (f) {
          const l = BabelTowerDifficulty_1.BabelTowerDifficulty.getRootAsBabelTowerDifficulty(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            f = `${KEY_PREFIX}#${i}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(f, l);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return l;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=BabelTowerDifficultyByActivityIdAndDifficultyId.js.map