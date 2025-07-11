"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMonsterDisplayLang = undefined;
const LanguageSystem_1 = require("../../Common/LanguageSystem");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DeserializeConfig_1 = require("../../Config/DeserializeConfig");
const StringUtils_1 = require("../../Utils/StringUtils");
const CommonDefine_1 = require("../CommonDefine");
const TEXTNOTFOUNT = "text not found";
const DB = "lang_monsterdisplay.db";
const TABLE = "MonsterDisplay";
const COMMAND = "select content from `MonsterDisplay` where id = ?";
const logPair = [["数据库", DB], ["表名", TABLE], ["语句", COMMAND]];
const langCache = new Map();
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMonsterDisplayLang.Init");
const getLocalTextStat = Stats_1.Stat.CreateNoFlameGraph("configMonsterDisplayLang.GetLocalText");
const LOCAL_TEXT_STAT_PREFIX = "configMonsterDisplayLang.GetLocalText(";
exports.configMonsterDisplayLang = {
  Init: () => {
    initStat?.Start();
    ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND);
    initStat?.Stop();
  },
  GetLocalText: (o, t = undefined) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getLocalTextStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${"" + LOCAL_TEXT_STAT_PREFIX + o}, ${t})`);
    e?.Start();
    if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey) {
      i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(t);
      e?.Stop();
      getLocalTextStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return `${TABLE}|${o}|${i}`;
    }
    let n = langCache.get(o);
    if (!n) {
      n = new Map();
      langCache.set(o, n);
    }
    var i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(t);
    let a = n.get(i);
    if (a) {
      e?.Stop();
      getLocalTextStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return a;
    }
    var g = ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND, i);
    if (m = ConfigCommon_1.ConfigCommon.CheckStatement(g) && ConfigCommon_1.ConfigCommon.BindInt(g, 1, o, ...logPair, ["Id", o]) && ConfigCommon_1.ConfigCommon.Step(g, true, ...logPair, ["传入语言", t], ["查询语言", i], ["文本Id", o]) > 0) {
      var C = undefined;
      [m, C] = ConfigCommon_1.ConfigCommon.GetValue(g, 0, ...logPair, ["传入语言", t], ["查询语言", i], ["文本Id", o]);
      if (m) {
        var m = DeserializeConfig_1.DeserializeConfig.ParseStringRange(C, 0, C.byteLength, ...logPair, ["传入语言", t], ["查询语言", i], ["文本Id", o]);
        if (m.Success) {
          a = m.Value;
          ConfigCommon_1.ConfigCommon.Reset(g);
          e?.Stop();
          getLocalTextStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          if (StringUtils_1.StringUtils.IsEmpty(a) && t !== CommonDefine_1.CHS) {
            C = exports.configMonsterDisplayLang.GetLocalText(o, CommonDefine_1.CHS);
            if (!StringUtils_1.StringUtils.IsEmpty(C)) {
              m = t === undefined ? "" : "|" + t;
              a = TEXTNOTFOUNT + "|" + o + m;
            }
          }
          n.set(i, a);
          return a;
        }
      }
    }
    ConfigCommon_1.ConfigCommon.Reset(g);
    e?.Stop();
    getLocalTextStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
//# sourceMappingURL=MonsterDisplayLang.js.map