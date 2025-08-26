"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTrapDefenseWaveByLevelAndWave = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TrapDefenseWave_1 = require("../Config/TrapDefenseWave");
const DB = "db_trapdefense.db";
const FILE = "x.陷阱塔防活动.xlsx";
const TABLE = "TrapDefenseWave";
const COMMAND = "select BinData from `TrapDefenseWave` where TrapDefenseLevelId=? And WaveId=?";
const KEY_PREFIX = "TrapDefenseWaveByLevelAndWave";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTrapDefenseWaveByLevelAndWave.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configTrapDefenseWaveByLevelAndWave.GetConfig");
const CONFIG_STAT_PREFIX = "configTrapDefenseWaveByLevelAndWave.GetConfig(";
exports.configTrapDefenseWaveByLevelAndWave = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var a = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e}#${n})`);
    a?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var t = `${KEY_PREFIX}#${e}#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (f) {
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["TrapDefenseLevelId", e], ["WaveId", n]) > 0) {
        t = undefined;
        [i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TrapDefenseLevelId", e], ["WaveId", n]);
        if (i) {
          const f = TrapDefenseWave_1.TrapDefenseWave.getRootAsTrapDefenseWave(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (o) {
            i = `${KEY_PREFIX}#${e}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=TrapDefenseWaveByLevelAndWave.js.map