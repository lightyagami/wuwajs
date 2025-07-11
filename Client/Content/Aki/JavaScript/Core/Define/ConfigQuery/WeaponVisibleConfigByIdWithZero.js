"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configWeaponVisibleConfigByIdWithZero = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const WeaponVisibleConfig_1 = require("../Config/WeaponVisibleConfig");
const DB = "db_weapon_visible.db";
const FILE = "w.武器显示配置.xlsx";
const TABLE = "WeaponVisibleConfig";
const COMMAND = "select BinData from `WeaponVisibleConfig` where id=0 AND (SELECT count(0) from `WeaponVisibleConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `WeaponVisibleConfig` WHERE id = ?) >0;";
const KEY_PREFIX = "WeaponVisibleConfigByIdWithZero";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configWeaponVisibleConfigByIdWithZero.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configWeaponVisibleConfigByIdWithZero.GetConfig");
const CONFIG_STAT_PREFIX = "configWeaponVisibleConfigByIdWithZero.GetConfig(";
exports.configWeaponVisibleConfigByIdWithZero = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i, n, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${i}#${n})`);
    t?.Start();
    var C = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (C) {
      if (e) {
        var f = `${KEY_PREFIX}#${o}#${i}#${n})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (g) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (C = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o], ["Id", i], ["Id", n]) > 0) {
        f = undefined;
        [C, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o], ["Id", i], ["Id", n]);
        if (C) {
          const g = WeaponVisibleConfig_1.WeaponVisibleConfig.getRootAsWeaponVisibleConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          if (e) {
            C = `${KEY_PREFIX}#${o}#${i}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(C, g);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=WeaponVisibleConfigByIdWithZero.js.map