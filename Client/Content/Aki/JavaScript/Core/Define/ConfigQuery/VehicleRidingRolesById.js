"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configVehicleRidingRolesById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const VehicleRidingRoles_1 = require("../Config/VehicleRidingRoles");
const DB = "db_vehicleridingroles.db";
const FILE = "k.可视化编辑/c.Csv/z.载具共乘角色配置/*.csv*";
const TABLE = "VehicleRidingRoles";
const COMMAND = "select BinData from `VehicleRidingRoles` where Id=?";
const KEY_PREFIX = "VehicleRidingRolesById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configVehicleRidingRolesById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configVehicleRidingRolesById.GetConfig");
const CONFIG_STAT_PREFIX = "configVehicleRidingRolesById.GetConfig(";
exports.configVehicleRidingRolesById = {
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
        const g = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (g) {
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", i]) > 0) {
        t = undefined;
        [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", i]);
        if (n) {
          const g = VehicleRidingRoles_1.VehicleRidingRoles.getRootAsVehicleRidingRoles(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (o) {
            n = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          e?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    e?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=VehicleRidingRolesById.js.map