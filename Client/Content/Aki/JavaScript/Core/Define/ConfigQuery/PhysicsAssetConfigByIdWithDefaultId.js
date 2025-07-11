"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configPhysicsAssetConfigByIdWithDefaultId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const PhysicsAssetConfig_1 = require("../Config/PhysicsAssetConfig");
const DB = "db_physics_asset.db";
const FILE = "j.角色物理资产.xlsx";
const TABLE = "PhysicsAssetConfig";
const COMMAND = "select BinData from `PhysicsAssetConfig` where id = ? AND (SELECT count() from `PhysicsAssetConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `PhysicsAssetConfig` WHERE id = ?) >0;";
const KEY_PREFIX = "PhysicsAssetConfigByIdWithDefaultId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configPhysicsAssetConfigByIdWithDefaultId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configPhysicsAssetConfigByIdWithDefaultId.GetConfig");
const CONFIG_STAT_PREFIX = "configPhysicsAssetConfigByIdWithDefaultId.GetConfig(";
exports.configPhysicsAssetConfigByIdWithDefaultId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i, n, t, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var s = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${i}#${n}#${t})`);
    s?.Start();
    var C = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (C) {
      if (e) {
        var f = `${KEY_PREFIX}#${o}#${i}#${n}#${t})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (g) {
          s?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (C = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 2, i, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 3, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindString(handleId, 4, t, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o], ["Id", i], ["Id", n], ["Id", t]) > 0) {
        f = undefined;
        [C, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o], ["Id", i], ["Id", n], ["Id", t]);
        if (C) {
          const g = PhysicsAssetConfig_1.PhysicsAssetConfig.getRootAsPhysicsAssetConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          if (e) {
            C = `${KEY_PREFIX}#${o}#${i}#${n}#${t})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(C, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          s?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    s?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=PhysicsAssetConfigByIdWithDefaultId.js.map