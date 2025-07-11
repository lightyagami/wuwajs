"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configWeaponHideConfigByIdWithZero = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const WeaponHideConfig_1 = require("../Config/WeaponHideConfig");
const DB = "db_weapon_visible.db";
const FILE = "w.武器显示配置.xlsx";
const TABLE = "WeaponHideConfig";
const COMMAND = "select BinData from `WeaponHideConfig` where id=0 AND (SELECT count(0) from `WeaponHideConfig` WHERE id = ?) <= 0 OR id = ? AND (SELECT count(0) from `WeaponHideConfig` WHERE id = ?) >0;";
const KEY_PREFIX = "WeaponHideConfigByIdWithZero";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configWeaponHideConfigByIdWithZero.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configWeaponHideConfigByIdWithZero.GetConfig");
const CONFIG_STAT_PREFIX = "configWeaponHideConfigByIdWithZero.GetConfig(";
exports.configWeaponHideConfigByIdWithZero = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, n, i, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${n}#${i})`);
    t?.Start();
    var C = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (C) {
      if (e) {
        var f = `${KEY_PREFIX}#${o}#${n}#${i})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(f);
        if (g) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (C = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", o], ["Id", n], ["Id", i]) > 0) {
        f = undefined;
        [C, f] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", o], ["Id", n], ["Id", i]);
        if (C) {
          const g = WeaponHideConfig_1.WeaponHideConfig.getRootAsWeaponHideConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(f.buffer)));
          if (e) {
            C = `${KEY_PREFIX}#${o}#${n}#${i})`;
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
//# sourceMappingURL=WeaponHideConfigByIdWithZero.js.map