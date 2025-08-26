"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configTrapDefenseBdBuffById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const TrapDefenseBdBuff_1 = require("../Config/TrapDefenseBdBuff");
const DB = "db_trapdefense.db";
const FILE = "x.陷阱塔防活动_增益.xlsx";
const TABLE = "TrapDefenseBdBuff";
const COMMAND = "select BinData from `TrapDefenseBdBuff` where Id=?";
const KEY_PREFIX = "TrapDefenseBdBuffById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configTrapDefenseBdBuffById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configTrapDefenseBdBuffById.GetConfig");
const CONFIG_STAT_PREFIX = "configTrapDefenseBdBuffById.GetConfig(";
exports.configTrapDefenseBdBuffById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (e, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${e})`);
    o?.Start();
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (n) {
        var t = `${KEY_PREFIX}#${e})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (i) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", e]) > 0) {
        t = undefined;
        [f, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", e]);
        if (f) {
          const i = TrapDefenseBdBuff_1.TrapDefenseBdBuff.getRootAsTrapDefenseBdBuff(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (n) {
            f = `${KEY_PREFIX}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(f, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=TrapDefenseBdBuffById.js.map