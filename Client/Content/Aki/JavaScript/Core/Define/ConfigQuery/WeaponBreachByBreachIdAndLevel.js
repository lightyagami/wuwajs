"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configWeaponBreachByBreachIdAndLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const WeaponBreach_1 = require("../Config/WeaponBreach");
const DB = "db_weapon.db";
const FILE = "w.武器基础配置.xlsx";
const TABLE = "WeaponBreach";
const COMMAND = "select BinData from `WeaponBreach` where BreachId = ? AND Level = ?";
const KEY_PREFIX = "WeaponBreachByBreachIdAndLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configWeaponBreachByBreachIdAndLevel.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configWeaponBreachByBreachIdAndLevel.GetConfig");
const CONFIG_STAT_PREFIX = "configWeaponBreachByBreachIdAndLevel.GetConfig(";
exports.configWeaponBreachByBreachIdAndLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var a = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${e})`);
    a?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (n) {
        var t = `${KEY_PREFIX}#${o}#${e})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (r) {
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["BreachId", o], ["Level", e]) > 0) {
        t = undefined;
        [i, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["BreachId", o], ["Level", e]);
        if (i) {
          const r = WeaponBreach_1.WeaponBreach.getRootAsWeaponBreach(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (n) {
            i = `${KEY_PREFIX}#${o}#${e})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, r);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          a?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=WeaponBreachByBreachIdAndLevel.js.map