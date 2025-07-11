"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configSpeakerLang = undefined;
const LanguageSystem_1 = require("../../Common/LanguageSystem");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DeserializeConfig_1 = require("../../Config/DeserializeConfig");
const StringUtils_1 = require("../../Utils/StringUtils");
const CommonDefine_1 = require("../CommonDefine");
const TEXTNOTFOUNT = "text not found";
const DB = "lang_speaker.db";
const TABLE = "Speaker";
const COMMAND = "select content from `Speaker` where id = ?";
const logPair = [["数据库", DB], ["表名", TABLE], ["语句", COMMAND]];
const langCache = new Map();
const initStat = Stats_1.Stat.CreateNoFlameGraph("configSpeakerLang.Init");
const getLocalTextStat = Stats_1.Stat.CreateNoFlameGraph("configSpeakerLang.GetLocalText");
const LOCAL_TEXT_STAT_PREFIX = "configSpeakerLang.GetLocalText(";
exports.configSpeakerLang = {
  Init: () => {
    initStat?.Start();
    ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND);
    initStat?.Stop();
  },
  GetLocalText: (e, o = undefined) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getLocalTextStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${"" + LOCAL_TEXT_STAT_PREFIX + e}, ${o})`);
    t?.Start();
    if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey) {
      i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o);
      t?.Stop();
      getLocalTextStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return `${TABLE}|${e}|${i}`;
    }
    let n = langCache.get(e);
    if (!n) {
      n = new Map();
      langCache.set(e, n);
    }
    var i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o);
    let a = n.get(i);
    if (a) {
      t?.Stop();
      getLocalTextStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return a;
    }
    var g = ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND, i);
    if (m = ConfigCommon_1.ConfigCommon.CheckStatement(g) && ConfigCommon_1.ConfigCommon.BindInt(g, 1, e, ...logPair, ["Id", e]) && ConfigCommon_1.ConfigCommon.Step(g, true, ...logPair, ["传入语言", o], ["查询语言", i], ["文本Id", e]) > 0) {
      var C = undefined;
      [m, C] = ConfigCommon_1.ConfigCommon.GetValue(g, 0, ...logPair, ["传入语言", o], ["查询语言", i], ["文本Id", e]);
      if (m) {
        var m = DeserializeConfig_1.DeserializeConfig.ParseStringRange(C, 0, C.byteLength, ...logPair, ["传入语言", o], ["查询语言", i], ["文本Id", e]);
        if (m.Success) {
          a = m.Value;
          ConfigCommon_1.ConfigCommon.Reset(g);
          t?.Stop();
          getLocalTextStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          if (StringUtils_1.StringUtils.IsEmpty(a) && o !== CommonDefine_1.CHS) {
            C = exports.configSpeakerLang.GetLocalText(e, CommonDefine_1.CHS);
            if (!StringUtils_1.StringUtils.IsEmpty(C)) {
              m = o === undefined ? "" : "|" + o;
              a = TEXTNOTFOUNT + "|" + e + m;
            }
          }
          n.set(i, a);
          return a;
        }
      }
    }
    ConfigCommon_1.ConfigCommon.Reset(g);
    t?.Stop();
    getLocalTextStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=SpeakerLang.js.map