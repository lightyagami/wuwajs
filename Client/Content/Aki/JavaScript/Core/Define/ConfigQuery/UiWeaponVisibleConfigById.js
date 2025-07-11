"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configUiWeaponVisibleConfigById = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const UiWeaponVisibleConfig_1 = require("../Config/UiWeaponVisibleConfig");
const DB = "db_weapon_visible.db";
const FILE = "w.武器显示配置.xlsx";
const TABLE = "UiWeaponVisibleConfig";
const COMMAND = "select BinData from `UiWeaponVisibleConfig` where Id=?";
const KEY_PREFIX = "UiWeaponVisibleConfigById";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configUiWeaponVisibleConfigById.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configUiWeaponVisibleConfigById.GetConfig");
const CONFIG_STAT_PREFIX = "configUiWeaponVisibleConfigById.GetConfig(";
exports.configUiWeaponVisibleConfigById = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (i, o = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var n = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${i})`);
    n?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (o) {
        var t = `${KEY_PREFIX}#${i})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) {
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["Id", i]) > 0) {
        t = undefined;
        [e, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", i]);
        if (e) {
          const C = UiWeaponVisibleConfig_1.UiWeaponVisibleConfig.getRootAsUiWeaponVisibleConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (o) {
            e = `${KEY_PREFIX}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          n?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    n?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=UiWeaponVisibleConfigById.js.map