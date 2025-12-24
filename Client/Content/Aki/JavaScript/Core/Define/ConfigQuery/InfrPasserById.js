"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configInfrPasserById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const InfrPasser_1 = require("../Config/InfrPasser");
const DB = "db_infrastructure.db";
const FILE = "j.基建.xlsx";
const TABLE = "InfrPasser";
const COMMAND = "select BinData from `InfrPasser` where Id=?";
const KEY_PREFIX = "InfrPasserById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configInfrPasserById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configInfrPasserById.GetConfig");
const CONFIG_STAT_PREFIX = "configInfrPasserById.GetConfig(";
exports.configInfrPasserById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    t?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (o) {
        var i = `${KEY_PREFIX}#${n})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", n]) > 0) {
        i = undefined;
        [e, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]);
        if (e) {
          const r = InfrPasser_1.InfrPasser.getRootAsInfrPasser(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (o) {
            e = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=InfrPasserById.js.map