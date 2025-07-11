"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configResonantChainByGroupIdAndNodeType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ResonantChain_1 = require("../Config/ResonantChain");
const DB = "db_resonate_chain.db";
const FILE = "g.共鸣链.xlsx";
const TABLE = "ResonantChain";
const COMMAND = "select BinData from `ResonantChain` where GroupId=? AND NodeType=?";
const KEY_PREFIX = "ResonantChainByGroupIdAndNodeType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configResonantChainByGroupIdAndNodeType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configResonantChainByGroupIdAndNodeType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configResonantChainByGroupIdAndNodeType.GetConfigList(";
exports.configResonantChainByGroupIdAndNodeType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o}#${n})`);
    t?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (i) {
        var a = `${KEY_PREFIX}#${o}#${n})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (r) {
          t?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair)) {
        const r = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["GroupId", o], ["NodeType", n]) !== 1) {
            break;
          }
          var C = undefined;
          [e, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["GroupId", o], ["NodeType", n]);
          if (!e) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            t?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          C = ResonantChain_1.ResonantChain.getRootAsResonantChain(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          r.push(C);
        }
        if (i) {
          a = `${KEY_PREFIX}#${o}#${n})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(a, r, r.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        t?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return r;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ResonantChainByGroupIdAndNodeType.js.map