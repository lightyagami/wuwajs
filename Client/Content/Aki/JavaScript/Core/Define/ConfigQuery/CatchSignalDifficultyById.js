"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCatchSignalDifficultyById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CatchSignalDifficulty_1 = require("../Config/CatchSignalDifficulty");
const DB = "db_catchsignaldifficulty.db";
const FILE = "k.可视化编辑/c.Csv/m.捕获信号玩法难度/*.csv*";
const TABLE = "CatchSignalDifficulty";
const COMMAND = "select BinData from `CatchSignalDifficulty` where Id=?";
const KEY_PREFIX = "CatchSignalDifficultyById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCatchSignalDifficultyById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCatchSignalDifficultyById.GetConfig");
const CONFIG_STAT_PREFIX = "configCatchSignalDifficultyById.GetConfig(";
exports.configCatchSignalDifficultyById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    t?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (n) {
        var f = `${KEY_PREFIX}#${i})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (a) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", i]) > 0) {
        f = undefined;
        [o, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", i]);
        if (o) {
          const a = CatchSignalDifficulty_1.CatchSignalDifficulty.getRootAsCatchSignalDifficulty(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          if (n) {
            o = `${KEY_PREFIX}#${i})`;
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
//# sourceMappingURL=CatchSignalDifficultyById.js.map