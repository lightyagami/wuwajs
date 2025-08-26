"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configKeySettingByTypeIdAndInputControllerTypeExclusive = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const KeySetting_1 = require("../Config/KeySetting");
const DB = "db_menu.db";
const FILE = "s.设置系统.xlsx";
const TABLE = "KeySetting";
const COMMAND = "select BinData from `KeySetting` where TypeId=? AND InputControllerType=? AND ExclusiveType = ?";
const KEY_PREFIX = "KeySettingByTypeIdAndInputControllerTypeExclusive";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configKeySettingByTypeIdAndInputControllerTypeExclusive.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configKeySettingByTypeIdAndInputControllerTypeExclusive.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configKeySettingByTypeIdAndInputControllerTypeExclusive.GetConfigList(";
exports.configKeySettingByTypeIdAndInputControllerTypeExclusive = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (n, o, e, t = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${n}#${o}#${e})`);
    i?.Start();
    var C = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (C) {
      if (t) {
        var g = `${KEY_PREFIX}#${n}#${o}#${e})`;
        const f = ConfigCommon_1.ConfigCommon.GetConfig(g);
        if (f) {
          i?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return f;
        }
      }
      if (C = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 3, e, ...logPair)) {
        const f = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["TypeId", n], ["InputControllerType", o], ["ExclusiveType", e]) !== 1) {
            break;
          }
          var r = undefined;
          [C, r] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["TypeId", n], ["InputControllerType", o], ["ExclusiveType", e]);
          if (!C) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            i?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          r = KeySetting_1.KeySetting.getRootAsKeySetting(new byte_buffer_1.ByteBuffer(new Uint8Array(r.buffer)));
          f.push(r);
        }
        if (t) {
          g = `${KEY_PREFIX}#${n}#${o}#${e})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(g, f, f.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        i?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return f;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=KeySettingByTypeIdAndInputControllerTypeExclusive.js.map