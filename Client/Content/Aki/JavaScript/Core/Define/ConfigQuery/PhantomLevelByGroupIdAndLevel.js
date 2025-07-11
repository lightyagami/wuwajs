"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhantomLevelByGroupIdAndLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhantomLevel_1 = require("../Config/PhantomLevel");
const DB = "db_phantom.db";
const FILE = "h.幻象.xlsx";
const TABLE = "PhantomLevel";
const COMMAND = "select BinData from `PhantomLevel` where GroupId=? AND Level=?";
const KEY_PREFIX = "PhantomLevelByGroupIdAndLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomLevelByGroupIdAndLevel.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhantomLevelByGroupIdAndLevel.GetConfig");
const CONFIG_STAT_PREFIX = "configPhantomLevelByGroupIdAndLevel.GetConfig(";
exports.configPhantomLevelByGroupIdAndLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${n})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (e) {
        var a = `${KEY_PREFIX}#${o}#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (C) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["GroupId", o], ["Level", n]) > 0) {
        a = undefined;
        [i, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["GroupId", o], ["Level", n]);
        if (i) {
          const C = PhantomLevel_1.PhantomLevel.getRootAsPhantomLevel(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (e) {
            i = `${KEY_PREFIX}#${o}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PhantomLevelByGroupIdAndLevel.js.map