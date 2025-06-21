"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configI18nTexturesById = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  I18nTextures_1 = require("../Config/I18nTextures"),
  DB = "db_i18nresources.db",
  FILE = "i.i18n资源.xlsx",
  TABLE = "I18nTextures",
  COMMAND = "select BinData from `I18nTextures` where Id=?",
  KEY_PREFIX = "I18nTexturesById",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configI18nTexturesById.Init"),
  getConfigStat = Stats_1.Stat.CreateNoFlameGraph("configI18nTexturesById.GetConfig"),
  CONFIG_STAT_PREFIX = "configI18nTexturesById.GetConfig(";
exports.configI18nTexturesById = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfig: (n, o = !0) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(CONFIG_STAT_PREFIX + `#${n})`),
      t = (e?.Start(), ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair));
    if (t) {
      if (o) {
        var i = KEY_PREFIX + `#${n})`;
        const C = ConfigCommon_1.ConfigCommon.GetConfig(i);
        if (C) return e?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
      }
      if (t = ConfigCommon_1.ConfigCommon.BindString(handleId, 1, n, ...logPair) && 0 < ConfigCommon_1.ConfigCommon.Step(handleId, !0, ...logPair, ["Id", n])) {
        i = void 0;
        if ([t, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair, ["Id", n]), t) {
          const C = I18nTextures_1.I18nTextures.getRootAsI18nTextures(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
          return o && (t = KEY_PREFIX + `#${n})`, ConfigCommon_1.ConfigCommon.SaveConfig(t, C)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), e?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), C
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair)
    }
    e?.Stop(), getConfigStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=I18nTexturesById.js.map