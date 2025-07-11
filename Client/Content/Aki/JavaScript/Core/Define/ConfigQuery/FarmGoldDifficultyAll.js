"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configFarmGoldDifficultyAll = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const FarmGoldDifficulty_1 = require("../Config/FarmGoldDifficulty");
const DB = "db_activity.db";
const FILE = "b.爆金币活动.xlsx";
const TABLE = "FarmGoldDifficulty";
const COMMAND = "select BinData from `FarmGoldDifficulty`";
const KEY_PREFIX = "FarmGoldDifficultyAll";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configFarmGoldDifficultyAll.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configFarmGoldDifficultyAll.GetConfigList");
exports.configFarmGoldDifficultyAll = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o = true) => {
    var i;
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    if (i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (o) {
        var t = KEY_PREFIX + ")";
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f) {
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      const f = new Array();
      while (true) {
        if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair) !== 1) {
          break;
        }
        var n = undefined;
        [i, n] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair);
        if (!i) {
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return;
        }
        n = FarmGoldDifficulty_1.FarmGoldDifficulty.getRootAsFarmGoldDifficulty(new byte_buffer_1.ByteBuffer(new Uint8Array(n.buffer)));
        f.push(n);
      }
      if (o) {
        t = KEY_PREFIX + ")";
        ConfigCommon_1.ConfigCommon.SaveConfig(t, f, f.length);
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
      getConfigListStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return f;
    }
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=FarmGoldDifficultyAll.js.map