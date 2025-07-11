"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPbDataPreloadByMapIdAndPbId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PbDataPreload_1 = require("../Config/PbDataPreload");
const DB = "db_pbdata_preload.db";
const FILE = "Preload/PbDataPreload.csv";
const TABLE = "PbDataPreload";
const COMMAND = "select BinData from `PbDataPreload` where MapId=? AND PbDataId=?";
const KEY_PREFIX = "PbDataPreloadByMapIdAndPbId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPbDataPreloadByMapIdAndPbId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPbDataPreloadByMapIdAndPbId.GetConfig");
const CONFIG_STAT_PREFIX = "configPbDataPreloadByMapIdAndPbId.GetConfig(";
exports.configPbDataPreloadByMapIdAndPbId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, a, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${a})`);
    t?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var i = `${KEY_PREFIX}#${o}#${a})`;
        const d = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (d) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return d;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, a, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MapId", o], ["PbDataId", a]) > 0) {
        i = undefined;
        [e, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MapId", o], ["PbDataId", a]);
        if (e) {
          const d = PbDataPreload_1.PbDataPreload.getRootAsPbDataPreload(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${o}#${a})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, d);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return d;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PbDataPreloadByMapIdAndPbId.js.map