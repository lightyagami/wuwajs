"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTowerDifficultyByDifficulty = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TowerDifficulty_1 = require("../Config/TowerDifficulty");
const DB = "db_tower.db";
const FILE = "p.爬塔新.xlsx";
const TABLE = "TowerDifficulty";
const COMMAND = "select BinData from `TowerDifficulty` where Difficulty = ?";
const KEY_PREFIX = "TowerDifficultyByDifficulty";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTowerDifficultyByDifficulty.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configTowerDifficultyByDifficulty.GetConfig");
const CONFIG_STAT_PREFIX = "configTowerDifficultyByDifficulty.GetConfig(";
exports.configTowerDifficultyByDifficulty = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    t?.Start();
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (o) {
        var n = `${KEY_PREFIX}#${i})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(n);
        if (e) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Difficulty", i]) > 0) {
        n = undefined;
        [f, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Difficulty", i]);
        if (f) {
          const e = TowerDifficulty_1.TowerDifficulty.getRootAsTowerDifficulty(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
          if (o) {
            f = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(f, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=TowerDifficultyByDifficulty.js.map