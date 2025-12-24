"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configInfrAutoPilotCircleByAutoPilotCirclePathId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const InfrAutoPilotCircle_1 = require("../Config/InfrAutoPilotCircle");
const DB = "db_infrastructure.db";
const FILE = "j.基建.xlsx";
const TABLE = "InfrAutoPilotCircle";
const COMMAND = "select BinData from `InfrAutoPilotCircle` where AutoPilotCirclePathId=?";
const KEY_PREFIX = "InfrAutoPilotCircleByAutoPilotCirclePathId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configInfrAutoPilotCircleByAutoPilotCirclePathId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configInfrAutoPilotCircleByAutoPilotCirclePathId.GetConfig");
const CONFIG_STAT_PREFIX = "configInfrAutoPilotCircleByAutoPilotCirclePathId.GetConfig(";
exports.configInfrAutoPilotCircleByAutoPilotCirclePathId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    i?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (t) {
        var e = `${KEY_PREFIX}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (C) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["AutoPilotCirclePathId", o]) > 0) {
        e = undefined;
        [n, e] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["AutoPilotCirclePathId", o]);
        if (n) {
          const C = InfrAutoPilotCircle_1.InfrAutoPilotCircle.getRootAsInfrAutoPilotCircle(new byte_buffer_1.ByteBuffer(new Uint8Array(e.buffer)));
          if (t) {
            n = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=InfrAutoPilotCircleByAutoPilotCirclePathId.js.map