"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoleDevWeaponItemByWeaponType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoleDevWeaponItem_1 = require("../Config/RoleDevWeaponItem");
const DB = "db_roledev.db";
const FILE = "g.共鸣者培养计划.xlsx";
const TABLE = "RoleDevWeaponItem";
const COMMAND = "select BinData from `RoleDevWeaponItem` where WeaponType=?";
const KEY_PREFIX = "RoleDevWeaponItemByWeaponType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoleDevWeaponItemByWeaponType.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRoleDevWeaponItemByWeaponType.GetConfig");
const CONFIG_STAT_PREFIX = "configRoleDevWeaponItemByWeaponType.GetConfig(";
exports.configRoleDevWeaponItemByWeaponType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    n?.Start();
    var t = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (t) {
      if (e) {
        var i = `${KEY_PREFIX}#${o})`;
        const a = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (a) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      if (t = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["WeaponType", o]) > 0) {
        i = undefined;
        [t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["WeaponType", o]);
        if (t) {
          const a = RoleDevWeaponItem_1.RoleDevWeaponItem.getRootAsRoleDevWeaponItem(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          if (e) {
            t = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(t, a);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return a;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RoleDevWeaponItemByWeaponType.js.map