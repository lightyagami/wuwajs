"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRogueWhiteCatInstById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RogueWhiteCatInst_1 = require("../Config/RogueWhiteCatInst");
const DB = "db_activity.db";
const FILE = "m.梦境链接活动.xlsx";
const TABLE = "RogueWhiteCatInst";
const COMMAND = "select BinData from `RogueWhiteCatInst` where Id=?";
const KEY_PREFIX = "RogueWhiteCatInstById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRogueWhiteCatInstById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRogueWhiteCatInstById.GetConfig");
const CONFIG_STAT_PREFIX = "configRogueWhiteCatInstById.GetConfig(";
exports.configRogueWhiteCatInstById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (t, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${t})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var e = `${KEY_PREFIX}#${t})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", t]) > 0) {
        e = undefined;
        [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", t]);
        if (i) {
          const C = RogueWhiteCatInst_1.RogueWhiteCatInst.getRootAsRogueWhiteCatInst(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (o) {
            i = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RogueWhiteCatInstById.js.map