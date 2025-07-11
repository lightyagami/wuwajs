"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configResonantChainByGroupIdAndGroupIndex = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ResonantChain_1 = require("../Config/ResonantChain");
const DB = "db_resonate_chain.db";
const FILE = "g.共鸣链.xlsx";
const TABLE = "ResonantChain";
const COMMAND = "select BinData from `ResonantChain` where GroupId=? AND GroupIndex=?";
const KEY_PREFIX = "ResonantChainByGroupIdAndGroupIndex";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configResonantChainByGroupIdAndGroupIndex.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configResonantChainByGroupIdAndGroupIndex.GetConfig");
const CONFIG_STAT_PREFIX = "configResonantChainByGroupIdAndGroupIndex.GetConfig(";
exports.configResonantChainByGroupIdAndGroupIndex = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n}#${o})`);
    e?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var a = `${KEY_PREFIX}#${n}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["GroupId", n], ["GroupIndex", o]) > 0) {
        a = undefined;
        [t, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["GroupId", n], ["GroupIndex", o]);
        if (t) {
          const C = ResonantChain_1.ResonantChain.getRootAsResonantChain(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (i) {
            t = `${KEY_PREFIX}#${n}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ResonantChainByGroupIdAndGroupIndex.js.map