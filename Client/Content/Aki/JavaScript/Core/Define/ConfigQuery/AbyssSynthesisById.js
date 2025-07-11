"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAbyssSynthesisById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AbyssSynthesis_1 = require("../Config/AbyssSynthesis");
const DB = "db_dangoabysssuit.db";
const FILE = "s.深渊爬塔.xlsx";
const TABLE = "AbyssSynthesis";
const COMMAND = "select BinData from `AbyssSynthesis` where Id=?";
const KEY_PREFIX = "AbyssSynthesisById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAbyssSynthesisById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configAbyssSynthesisById.GetConfig");
const CONFIG_STAT_PREFIX = "configAbyssSynthesisById.GetConfig(";
exports.configAbyssSynthesisById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (o) {
        var e = `${KEY_PREFIX}#${n})`;
        const s = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (s) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return s;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        e = undefined;
        [t, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (t) {
          const s = AbyssSynthesis_1.AbyssSynthesis.getRootAsAbyssSynthesis(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (o) {
            t = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, s);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return s;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=AbyssSynthesisById.js.map