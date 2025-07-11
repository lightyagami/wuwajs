"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRogueResBuffPoolById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RogueResBuffPool_1 = require("../Config/RogueResBuffPool");
const DB = "db_permanentrogue.db";
const FILE = "c.常驻肉鸽.xlsx";
const TABLE = "RogueResBuffPool";
const COMMAND = "select BinData from `RogueResBuffPool` where Id=?";
const KEY_PREFIX = "RogueResBuffPoolById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRogueResBuffPoolById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRogueResBuffPoolById.GetConfig");
const CONFIG_STAT_PREFIX = "configRogueResBuffPoolById.GetConfig(";
exports.configRogueResBuffPoolById = {
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
    var f = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (f) {
      if (e) {
        var t = `${KEY_PREFIX}#${o})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (i) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (f = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o]) > 0) {
        t = undefined;
        [f, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o]);
        if (f) {
          const i = RogueResBuffPool_1.RogueResBuffPool.getRootAsRogueResBuffPool(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (e) {
            f = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(f, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RogueResBuffPoolById.js.map