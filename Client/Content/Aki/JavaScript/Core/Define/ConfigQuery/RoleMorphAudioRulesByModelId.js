"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configRoleMorphAudioRulesByModelId = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  RoleMorphAudioRules_1 = require("../Config/RoleMorphAudioRules"),
  DB = "db_audio.db",
  FILE = "y.音频.xlsx",
  TABLE = "RoleMorphAudioRules",
  COMMAND = "select BinData from `RoleMorphAudioRules` where MorphId=?",
  KEY_PREFIX = "RoleMorphAudioRulesByModelId",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configRoleMorphAudioRulesByModelId.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configRoleMorphAudioRulesByModelId.GetConfig"),
  CONFIG_STAT_PREFIX = "configRoleMorphAudioRulesByModelId.GetConfig(";
exports.configRoleMorphAudioRulesByModelId = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (o, e = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var i = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${o})`),
      n = (i?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (n) {
      if (e) {
        var t = KEY_PREFIX + `#${o})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (C) return i?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      if (n = ConfigCommon_1.ConfigCommon.BindInt(handleId, 1, o, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["MorphId", o])) {
        t = void 0;
        if ([n, t] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["MorphId", o]), n) {
          const C = RoleMorphAudioRules_1.RoleMorphAudioRules.getRootAsRoleMorphAudioRules(new byte_buffer_1.ByteBuffer(new Uint8Array(t.buffer)));
          return e && (n = KEY_PREFIX + `#${o})`, ConfigCommon_1.ConfigCommon.SaveConfig(n, C)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), i?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    i?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=RoleMorphAudioRulesByModelId.js.map