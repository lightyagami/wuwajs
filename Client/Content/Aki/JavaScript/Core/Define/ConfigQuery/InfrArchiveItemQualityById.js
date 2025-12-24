"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configInfrArchiveItemQualityById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const InfrArchiveItemQuality_1 = require("../Config/InfrArchiveItemQuality");
const DB = "db_infrastructure.db";
const FILE = "j.基建_档案馆.xlsx";
const TABLE = "InfrArchiveItemQuality";
const COMMAND = "select BinData from `InfrArchiveItemQuality` where Id=?";
const KEY_PREFIX = "InfrArchiveItemQualityById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configInfrArchiveItemQualityById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configInfrArchiveItemQualityById.GetConfig");
const CONFIG_STAT_PREFIX = "configInfrArchiveItemQualityById.GetConfig(";
exports.configInfrArchiveItemQualityById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    i?.Start();
    var o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (o) {
      if (t) {
        var e = `${KEY_PREFIX}#${n})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (o = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        e = undefined;
        [o, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (o) {
          const r = InfrArchiveItemQuality_1.InfrArchiveItemQuality.getRootAsInfrArchiveItemQuality(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            o = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(o, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=InfrArchiveItemQualityById.js.map