"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSpringSignById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SpringSign_1 = require("../Config/SpringSign");
const DB = "db_activity.db";
const FILE = "c.2.0春节签到.xlsx";
const TABLE = "SpringSign";
const COMMAND = "select BinData from `SpringSign` where Id=?";
const KEY_PREFIX = "SpringSignById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSpringSignById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSpringSignById.GetConfig");
const CONFIG_STAT_PREFIX = "configSpringSignById.GetConfig(";
exports.configSpringSignById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    o?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var g = `${KEY_PREFIX}#${n})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (e) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        g = undefined;
        [t, g] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (t) {
          const e = SpringSign_1.SpringSign.getRootAsSpringSign(new byte_buffer_1.ByteBuffer(new Uint8Array(g.buffer)));
          if (i) {
            t = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SpringSignById.js.map