"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configKSCDamageByKscGameplayType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const KSCDamage_1 = require("../Config/KSCDamage");
const DB = "db_kscdamage.db";
const FILE = "s.SimpleCombat结算.xlsx";
const TABLE = "KSCDamage";
const COMMAND = "select BinData from `KSCDamage` where KscGameplayType=?";
const KEY_PREFIX = "KSCDamageByKscGameplayType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configKSCDamageByKscGameplayType.Init");
const getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configKSCDamageByKscGameplayType.GetConfigList");
const CONFIG_LIST_STAT_PREFIX = "configKSCDamageByKscGameplayType.GetConfigList(";
exports.configKSCDamageByKscGameplayType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfigList: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigListStat?.Start();
    var a = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_LIST_STAT_PREFIX}#${o})`);
    a?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (e) {
        var i = `${KEY_PREFIX}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C) {
          a?.Stop();
          getConfigListStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair)) {
        const C = new Array();
        while (true) {
          if (ConfigCommon_1.ConfigCommon.Step(handleId, false, ...logPair, ["KscGameplayType", o]) !== 1) {
            break;
          }
          var t = undefined;
          [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["KscGameplayType", o]);
          if (!n) {
            ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
            a?.Stop();
            getConfigListStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            return;
          }
          t = KSCDamage_1.KSCDamage.getRootAsKSCDamage(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          C.push(t);
        }
        if (e) {
          i = `${KEY_PREFIX}#${o})`;
          ConfigCommon_1.ConfigCommon.SaveConfig(i, C, C.length);
        }
        ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
        a?.Stop();
        getConfigListStat?.Stop();
        ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        return C;
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    a?.Stop();
    getConfigListStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=KSCDamageByKscGameplayType.js.map