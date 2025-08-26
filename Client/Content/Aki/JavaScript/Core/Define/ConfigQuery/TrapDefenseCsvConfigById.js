"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTrapDefenseCsvConfigById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TrapDefenseCsvConfig_1 = require("../Config/TrapDefenseCsvConfig");
const DB = "db_trapdefensecsvconfig.db";
const FILE = "k.可视化编辑/c.Csv/t.塔防玩法总表/*.csv*";
const TABLE = "TrapDefenseCsvConfig";
const COMMAND = "select BinData from `TrapDefenseCsvConfig` where Id=?";
const KEY_PREFIX = "TrapDefenseCsvConfigById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTrapDefenseCsvConfigById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configTrapDefenseCsvConfigById.GetConfig");
const CONFIG_STAT_PREFIX = "configTrapDefenseCsvConfigById.GetConfig(";
exports.configTrapDefenseCsvConfigById = {
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
        const f = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (f) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        C = undefined;
        [i, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (i) {
          const f = TrapDefenseCsvConfig_1.TrapDefenseCsvConfig.getRootAsTrapDefenseCsvConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (o) {
            i = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=TrapDefenseCsvConfigById.js.map