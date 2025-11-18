"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCalabashMeshByMeshId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const CalabashMesh_1 = require("../Config/CalabashMesh");
const DB = "db_calabash.db";
const FILE = "h.葫芦.xlsx";
const TABLE = "CalabashMesh";
const COMMAND = "select BinData from `CalabashMesh` where MeshId=?";
const KEY_PREFIX = "CalabashMeshByMeshId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCalabashMeshByMeshId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configCalabashMeshByMeshId.GetConfig");
const CONFIG_STAT_PREFIX = "configCalabashMeshByMeshId.GetConfig(";
exports.configCalabashMeshByMeshId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var a = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    a?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var i = `${KEY_PREFIX}#${o})`;
        const t = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (t) {
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MeshId", o]) > 0) {
        i = undefined;
        [e, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MeshId", o]);
        if (e) {
          const t = CalabashMesh_1.CalabashMesh.getRootAsCalabashMesh(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, t);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return t;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=CalabashMeshByMeshId.js.map