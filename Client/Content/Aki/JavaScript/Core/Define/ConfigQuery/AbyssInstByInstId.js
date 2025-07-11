"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAbyssInstByInstId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const AbyssInst_1 = require("../Config/AbyssInst");
const DB = "db_dangoabyss.db";
const FILE = "s.深渊爬塔副本.xlsx";
const TABLE = "AbyssInst";
const COMMAND = "select BinData from `AbyssInst` where InstId=?";
const KEY_PREFIX = "AbyssInstByInstId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configAbyssInstByInstId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configAbyssInstByInstId.GetConfig");
const CONFIG_STAT_PREFIX = "configAbyssInstByInstId.GetConfig(";
exports.configAbyssInstByInstId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var s = `${KEY_PREFIX}#${n})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(s);
        if (e) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["InstId", n]) > 0) {
        s = undefined;
        [i, s] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["InstId", n]);
        if (i) {
          const e = AbyssInst_1.AbyssInst.getRootAsAbyssInst(new byte_buffer_1.ByteBuffer(new Uint8Array(s.buffer)));
          if (o) {
            i = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, e);
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
//# sourceMappingURL=AbyssInstByInstId.js.map