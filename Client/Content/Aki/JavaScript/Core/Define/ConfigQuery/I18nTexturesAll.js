"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.configI18nTexturesAll = void 0;
const byte_buffer_1 = require("../../../RunTimeLibs/FlatBuffers/byte-buffer"),
  Stats_1 = require("../../Common/Stats"),
  ConfigCommon_1 = require("../../Config/ConfigCommon"),
  I18nTextures_1 = require("../Config/I18nTextures"),
  DB = "db_i18nresources.db",
  FILE = "i.i18n资源.xlsx",
  TABLE = "I18nTextures",
  COMMAND = "select BinData from `I18nTextures`",
  KEY_PREFIX = "I18nTexturesAll",
  logPair = [
    ["数据库", DB],
    ["文件", FILE],
    ["表名", TABLE],
    ["语句", COMMAND]
  ];
let handleId = 0;
const initStat = Stats_1.Stat.CreateNoFlameGraph("configI18nTexturesAll.Init"),
  getConfigListStat = Stats_1.Stat.CreateNoFlameGraph("configI18nTexturesAll.GetConfigList");
exports.configI18nTexturesAll = {
  Init: () => {
    initStat?.Start(), handleId = ConfigCommon_1.ConfigCommon.InitDataStatement(handleId, DB, COMMAND), initStat?.Stop()
  },
  GetConfigList: (n = !0) => {
    var o;
    if (ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start(), getConfigListStat?.Start(), o = ConfigCommon_1.ConfigCommon.CheckStatement(handleId, ...logPair)) {
      if (n) {
        var t = KEY_PREFIX + ")";
        const e = ConfigCommon_1.ConfigCommon.GetConfig(t);
        if (e) return getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), e
      }
      const e = new Array;
      for (;;) {
        if (1 !== ConfigCommon_1.ConfigCommon.Step(handleId, !1, ...logPair)) break;
        var i = void 0;
        if ([o, i] = ConfigCommon_1.ConfigCommon.GetValue(handleId, 0, ...logPair), !o) return ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), getConfigListStat?.Stop(), void ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
        i = I18nTextures_1.I18nTextures.getRootAsI18nTextures(new byte_buffer_1.ByteBuffer(new Uint8Array(i.buffer)));
        e.push(i)
      }
      return n && (t = KEY_PREFIX + ")", ConfigCommon_1.ConfigCommon.SaveConfig(t, e, e.length)), ConfigCommon_1.ConfigCommon.Reset(handleId, ...logPair), getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop(), e
    }
    getConfigListStat?.Stop(), ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop()
  }
};
//# sourceMappingURL=I18nTexturesAll.js.map