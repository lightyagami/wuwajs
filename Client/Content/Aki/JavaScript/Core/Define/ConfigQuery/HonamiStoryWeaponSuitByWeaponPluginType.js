"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryWeaponSuitByWeaponPluginType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryWeaponSuit_1 = require("../Config/HonamiStoryWeaponSuit");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语装备栏.xlsx";
const TABLE = "HonamiStoryWeaponSuit";
const COMMAND = "select BinData from `HonamiStoryWeaponSuit` where WeaponPluginType=?";
const KEY_PREFIX = "HonamiStoryWeaponSuitByWeaponPluginType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryWeaponSuitByWeaponPluginType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryWeaponSuitByWeaponPluginType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configHonamiStoryWeaponSuitByWeaponPluginType.GetConfigList(";
exports.configHonamiStoryWeaponSuitByWeaponPluginType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    i?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (n) {
        var e = `${KEY_PREFIX}#${o})`;
        const g = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (g) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return g;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const g = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["WeaponPluginType", o]) !== 1) {
            break;
          }
          var a = undefined;
          [t, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["WeaponPluginType", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = HonamiStoryWeaponSuit_1.HonamiStoryWeaponSuit.getRootAsHonamiStoryWeaponSuit(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          g.push(a);
        }
        if (n) {
          e = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, g, g.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return g;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryWeaponSuitByWeaponPluginType.js.map