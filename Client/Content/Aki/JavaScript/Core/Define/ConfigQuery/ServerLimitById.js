"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configServerLimitById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const ServerLimit_1 = require("../Config/ServerLimit");
const DB = "db_serverlimit.db";
const FILE = "f.服务器限制.xlsx";
const TABLE = "ServerLimit";
const COMMAND = "select BinData from `ServerLimit` where Id=?";
const KEY_PREFIX = "ServerLimitById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configServerLimitById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configServerLimitById.GetConfig");
const CONFIG_STAT_PREFIX = "configServerLimitById.GetConfig(";
exports.configServerLimitById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    e?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (o) {
        var t = `${KEY_PREFIX}#${i})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (r) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", i]) > 0) {
        t = undefined;
        [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", i]);
        if (n) {
          const r = ServerLimit_1.ServerLimit.getRootAsServerLimit(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (o) {
            n = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=ServerLimitById.js.map