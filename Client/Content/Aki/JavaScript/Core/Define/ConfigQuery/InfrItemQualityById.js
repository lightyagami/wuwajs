"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configInfrItemQualityById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const InfrItemQuality_1 = require("../Config/InfrItemQuality");
const DB = "db_infrastructure.db";
const FILE = "j.基建.xlsx";
const TABLE = "InfrItemQuality";
const COMMAND = "select BinData from `InfrItemQuality` where Id=?";
const KEY_PREFIX = "InfrItemQualityById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configInfrItemQualityById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configInfrItemQualityById.GetConfig");
const CONFIG_STAT_PREFIX = "configInfrItemQualityById.GetConfig(";
exports.configInfrItemQualityById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    o?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (t) {
        var e = `${KEY_PREFIX}#${n})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (f) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        e = undefined;
        [i, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (i) {
          const f = InfrItemQuality_1.InfrItemQuality.getRootAsInfrItemQuality(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            i = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, f);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=InfrItemQualityById.js.map