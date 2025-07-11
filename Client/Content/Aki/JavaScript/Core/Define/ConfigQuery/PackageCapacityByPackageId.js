"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPackageCapacityByPackageId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PackageCapacity_1 = require("../Config/PackageCapacity");
const DB = "db_bag.db";
const FILE = "b.背包.xlsx";
const TABLE = "PackageCapacity";
const COMMAND = "select BinData from `PackageCapacity` where PackageId=?";
const KEY_PREFIX = "PackageCapacityByPackageId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPackageCapacityByPackageId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPackageCapacityByPackageId.GetConfig");
const CONFIG_STAT_PREFIX = "configPackageCapacityByPackageId.GetConfig(";
exports.configPackageCapacityByPackageId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (a, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${a})`);
    n?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (o) {
        var t = `${KEY_PREFIX}#${a})`;
        const e = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (e) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, a, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["PackageId", a]) > 0) {
        t = undefined;
        [i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["PackageId", a]);
        if (i) {
          const e = PackageCapacity_1.PackageCapacity.getRootAsPackageCapacity(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (o) {
            i = `${KEY_PREFIX}#${a})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, e);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return e;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PackageCapacityByPackageId.js.map