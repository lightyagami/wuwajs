"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configLanguageDefineByLanguageType = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const LanguageDefine_1 = require("../Config/LanguageDefine");
const DB = "db_menu.db";
const FILE = "s.设置系统.xlsx";
const TABLE = "LanguageDefine";
const COMMAND = "select BinData from `LanguageDefine` where LanguageType = ?";
const KEY_PREFIX = "LanguageDefineByLanguageType";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configLanguageDefineByLanguageType.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configLanguageDefineByLanguageType.GetConfig");
const CONFIG_STAT_PREFIX = "configLanguageDefineByLanguageType.GetConfig(";
exports.configLanguageDefineByLanguageType = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (n, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${n})`);
    o?.Start();
    var g = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (g) {
      if (e) {
        var a = `${KEY_PREFIX}#${n})`;
        const i = ConfigCommon_1.ConfigCommon.GetConfig(a);
        if (i) {
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      if (g = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, n, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["LanguageType", n]) > 0) {
        a = undefined;
        [g, a] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["LanguageType", n]);
        if (g) {
          const i = LanguageDefine_1.LanguageDefine.getRootAsLanguageDefine(new byte_buffer_1.ByteBuffer(new Uint8Array(a.buffer)));
          if (e) {
            g = `${KEY_PREFIX}#${n})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(g, i);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          o?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return i;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    o?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=LanguageDefineByLanguageType.js.map