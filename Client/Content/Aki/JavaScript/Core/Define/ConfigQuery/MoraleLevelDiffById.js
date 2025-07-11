"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMoraleLevelDiffById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const MoraleLevelDiff_1 = require("../Config/MoraleLevelDiff");
const DB = "db_moraleplay.db";
const FILE = "c.插旗玩法.xlsx";
const TABLE = "MoraleLevelDiff";
const COMMAND = "select BinData from `MoraleLevelDiff` where Level=?";
const KEY_PREFIX = "MoraleLevelDiffById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMoraleLevelDiffById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configMoraleLevelDiffById.GetConfig");
const CONFIG_STAT_PREFIX = "configMoraleLevelDiffById.GetConfig(";
exports.configMoraleLevelDiffById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (e) {
        var f = `${KEY_PREFIX}#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (t) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Level", o]) > 0) {
        f = undefined;
        [i, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Level", o]);
        if (i) {
          const t = MoraleLevelDiff_1.MoraleLevelDiff.getRootAsMoraleLevelDiff(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          if (e) {
            i = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MoraleLevelDiffById.js.map