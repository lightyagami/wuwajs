"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configRoleMorphAudioRulesByModelId = undefined;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const RoleMorphAudioRules_1 = require("../Config/RoleMorphAudioRules");
const DB = "db_audio.db";
const FILE = "y.音频.xlsx";
const TABLE = "RoleMorphAudioRules";
const COMMAND = "select BinData from `RoleMorphAudioRules` where MorphId=?";
const KEY_PREFIX = "RoleMorphAudioRulesByModelId";
const logPair = [["数据库", DB], ["文件", FILE], ["表名", TABLE], ["语句", COMMAND]];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoleMorphAudioRulesByModelId.Init");
const getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRoleMorphAudioRulesByModelId.GetConfig");
const CONFIG_STAT_PREFIX = "configRoleMorphAudioRulesByModelId.GetConfig(";
exports.configRoleMorphAudioRulesByModelId = {
  Init: () => {
    initStat?.Start();
    handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND);
    initStat?.Stop();
  },
  GetConfig: (o, e = true) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(`${CONFIG_STAT_PREFIX}#${o})`);
    i?.Start();
    var n = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair);
    if (n) {
      if (e) {
        var t = `${KEY_PREFIX}#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) {
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && ConfigCommon_1.ConfigCommon.Step(handleId, true, ...logPair, ["MorphId", o]) > 0) {
        t = undefined;
        [n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MorphId", o]);
        if (n) {
          const C = RoleMorphAudioRules_1.RoleMorphAudioRules.getRootAsRoleMorphAudioRules(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          if (e) {
            n = `${KEY_PREFIX}#${o})`;
            ConfigCommon_1.ConfigCommon.SaveConfig(n, C);
          }
          ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
          i?.Stop();
          getConfigStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          return C;
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair);
    }
    i?.Stop();
    getConfigStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=RoleMorphAudioRulesByModelId.js.map