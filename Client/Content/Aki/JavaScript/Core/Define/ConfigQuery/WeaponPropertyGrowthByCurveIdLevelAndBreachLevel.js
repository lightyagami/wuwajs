"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const WeaponPropertyGrowth_1 = require("../Config/WeaponPropertyGrowth");
const DB = "db_property.db";
const FILE = "s.属性.xlsx";
const TABLE = "WeaponPropertyGrowth";
const COMMAND = "select BinData from `WeaponPropertyGrowth` where CurveId = ? AND Level = ? AND BreachLevel = ?";
const KEY_PREFIX = "WeaponPropertyGrowthByCurveIdLevelAndBreachLevel";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel.GetConfig");
const CONFIG_STAT_PREFIX = "configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel.GetConfig(";
exports.configWeaponPropertyGrowthByCurveIdLevelAndBreachLevel = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e, n, r = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${e}#${n})`);
    t?.Start();
    var i = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (i) {
      if (r) {
        var C = `${KEY_PREFIX}#${o}#${e}#${n})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (a) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (i = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, e, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["CurveId", o], ["Level", e], ["BreachLevel", n]) > 0) {
        C = undefined;
        [i, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["CurveId", o], ["Level", e], ["BreachLevel", n]);
        if (i) {
          const a = WeaponPropertyGrowth_1.WeaponPropertyGrowth.getRootAsWeaponPropertyGrowth(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (r) {
            i = `${KEY_PREFIX}#${o}#${e}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(i, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=WeaponPropertyGrowthByCurveIdLevelAndBreachLevel.js.map