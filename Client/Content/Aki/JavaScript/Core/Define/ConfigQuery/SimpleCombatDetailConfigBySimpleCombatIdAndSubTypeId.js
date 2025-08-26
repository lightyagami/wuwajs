"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const SimpleCombatDetailConfig_1 = require("../Config/SimpleCombatDetailConfig");
const DB = "db_simplecombatdetailconfig.db";
const FILE = "k.可视化编辑/c.Csv/s.SimpleCombat配置/*.csv*";
const TABLE = "SimpleCombatDetailConfig";
const COMMAND = "select BinData from `SimpleCombatDetailConfig` where SimpleCombatId=? and SubTypeId=?";
const KEY_PREFIX = "SimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configSimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId.GetConfig");
const CONFIG_STAT_PREFIX = "configSimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId.GetConfig(";
exports.configSimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, i, n = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o}#${i})`);
    t?.Start();
    var e = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (e) {
      if (n) {
        var C = `${KEY_PREFIX}#${o}#${i})`;
        const m = ConfigCommon_1.ConfigCommon.GetConfig(C);
        if (m) {
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      if (e = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.BindInt(handleId, 2, i, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["SimpleCombatId", o], ["SubTypeId", i]) > 0) {
        C = undefined;
        [e, C] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["SimpleCombatId", o], ["SubTypeId", i]);
        if (e) {
          const m = SimpleCombatDetailConfig_1.SimpleCombatDetailConfig.getRootAsSimpleCombatDetailConfig(new byte_buffer_1.ByteBuffer(new Uint8Array(C.buffer)));
          if (n) {
            e = `${KEY_PREFIX}#${o}#${i})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(e, m);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          t?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return m;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    t?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SimpleCombatDetailConfigBySimpleCombatIdAndSubTypeId.js.map