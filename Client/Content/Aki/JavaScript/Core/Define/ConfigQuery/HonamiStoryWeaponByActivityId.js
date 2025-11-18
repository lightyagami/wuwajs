"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHonamiStoryWeaponByActivityId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const HonamiStoryWeapon_1 = require("../Config/HonamiStoryWeapon");
const DB = "db_honamistory.db";
const FILE = "s.穗波奇妙物语装备栏.xlsx";
const TABLE = "HonamiStoryWeapon";
const COMMAND = "select BinData from `HonamiStoryWeapon` where ActivityId=?";
const KEY_PREFIX = "HonamiStoryWeaponByActivityId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryWeaponByActivityId.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configHonamiStoryWeaponByActivityId.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configHonamiStoryWeaponByActivityId.GetConfigList(";
exports.configHonamiStoryWeaponByActivityId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, i = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (i) {
        var e = `${KEY_PREFIX}#${o})`;
        const r = ConfigCommon_1.ConfigCommon.GetConfig(e);
        if (r) {
          n?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return r;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const r = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["ActivityId", o]) !== 1) {
            break;
          }
          var a = undefined;
          [t, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["ActivityId", o]);
          if (!t) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            n?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          a = HonamiStoryWeapon_1.HonamiStoryWeapon.getRootAsHonamiStoryWeapon(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          r.push(a);
        }
        if (i) {
          e = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(e, r, r.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        n?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return r;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=HonamiStoryWeaponByActivityId.js.map