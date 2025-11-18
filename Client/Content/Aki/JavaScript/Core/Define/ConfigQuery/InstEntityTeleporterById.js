"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configInstEntityTeleporterById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const InstEntityTeleporter_1 = require("../Config/InstEntityTeleporter");
const DB = "db_teleporter.db";
const FILE = "c.传送.xlsx";
const TABLE = "InstEntityTeleporter";
const COMMAND = "select BinData from `InstEntityTeleporter` where Id = ?";
const KEY_PREFIX = "InstEntityTeleporterById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configInstEntityTeleporterById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configInstEntityTeleporterById.GetConfig");
const CONFIG_STAT_PREFIX = "configInstEntityTeleporterById.GetConfig(";
exports.configInstEntityTeleporterById = {
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
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (o) {
        var i = `${KEY_PREFIX}#${t})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (r) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", t]) > 0) {
        i = undefined;
        [e, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", t]);
        if (e) {
          const r = InstEntityTeleporter_1.InstEntityTeleporter.getRootAsInstEntityTeleporter(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (o) {
            e = `${KEY_PREFIX}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=InstEntityTeleporterById.js.map