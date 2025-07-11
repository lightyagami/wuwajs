"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSubtitleTextLang = undefined;
const LanguageSystem_1 = require("../../Common/LanguageSystem");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DeserializeConfig_1 = require("../../Config/DeserializeConfig");
const StringUtils_1 = require("../../Utils/StringUtils");
const CommonDefine_1 = require("../CommonDefine");
const TEXTNOTFOUNT = "text not found";
const DB = "lang_subtitle_text.db";
const TABLE = "SubtitleText";
const COMMAND = "select content from `SubtitleText` where id = ?";
const logPair = [["数据库", DB], ["表名", TABLE], ["语句", COMMAND]];
const langCache = new Map();
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSubtitleTextLang.Init");
const getLocalTextStat = Stats_1.Stat.CreateNoFlameGraph("configSubtitleTextLang.GetLocalText");
const LOCAL_TEXT_STAT_PREFIX = "configSubtitleTextLang.GetLocalText(";
exports.configSubtitleTextLang = {
  Init: () => {
    initStat?.Start();
    ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND);
    initStat?.Stop();
  },
  GetLocalText: (t, e = undefined) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getLocalTextStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${"" + LOCAL_TEXT_STAT_PREFIX + t}, ${e})`);
    o?.Start();
    if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey) {
      i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(e);
      o?.Stop();
      getLocalTextStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return `${TABLE}|${t}|${i}`;
    }
    let n = langCache.get(t);
    if (!n) {
      n = new Map();
      langCache.set(t, n);
    }
    var i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(e);
    let a = n.get(i);
    if (a) {
      o?.Stop();
      getLocalTextStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return a;
    }
    var g = ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND, i);
    if (m = ConfigCommon_1.ConfigCommon.CheckStatement(g) && ConfigCommon_1.ConfigCommon.BindInt(g, 1, t, ...logPair, ["Id", t]) && ConfigCommon_1.ConfigCommon.Step(g, true, ...logPair, ["传入语言", e], ["查询语言", i], ["文本Id", t]) > 0) {
      var C = undefined;
      [m, C] = ConfigCommon_1.ConfigCommon.GetValue(g, 0, ...logPair, ["传入语言", e], ["查询语言", i], ["文本Id", t]);
      if (m) {
        var m = DeserializeConfig_1.DeserializeConfig.ParseStringRange(C, 0, C.byteLength, ...logPair, ["传入语言", e], ["查询语言", i], ["文本Id", t]);
        if (m.Success) {
          a = m.Value;
          ConfigCommon_1.ConfigCommon.Reset(g);
          o?.Stop();
          getLocalTextStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          if (StringUtils_1.StringUtils.IsEmpty(a) && e !== CommonDefine_1.CHS) {
            C = exports.configSubtitleTextLang.GetLocalText(t, CommonDefine_1.CHS);
            if (!StringUtils_1.StringUtils.IsEmpty(C)) {
              m = e === undefined ? "" : "|" + e;
              a = TEXTNOTFOUNT + "|" + t + m;
            }
          }
          n.set(i, a);
          return a;
        }
      }
    }
    ConfigCommon_1.ConfigCommon.Reset(g);
    o?.Stop();
    getLocalTextStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SubtitleTextLang.js.map