"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configOccupationConfigLang = undefined;
const LanguageSystem_1 = require("../../Common/LanguageSystem");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DeserializeConfig_1 = require("../../Config/DeserializeConfig");
const StringUtils_1 = require("../../Utils/StringUtils");
const CommonDefine_1 = require("../CommonDefine");
const TEXTNOTFOUNT = "text not found";
const DB = "lang_occupation.db";
const TABLE = "OccupationConfig";
const COMMAND = "select content from `OccupationConfig` where id = ?";
const logPair = [["数据库", DB], ["表名", TABLE], ["语句", COMMAND]];
const langCache = new Map();
const initStat = Stats_1.Stat.CreateNoFlameGraph("configOccupationConfigLang.Init");
const getLocalTextStat = Stats_1.Stat.CreateNoFlameGraph("configOccupationConfigLang.GetLocalText");
const LOCAL_TEXT_STAT_PREFIX = "configOccupationConfigLang.GetLocalText(";
exports.configOccupationConfigLang = {
  Init: () => {
    initStat?.Start();
    ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND);
    initStat?.Stop();
  },
  GetLocalText: (o, n = undefined) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getLocalTextStat?.Start();
    var t = Stats_1.Stat.CreateNoFlameGraph(`${"" + LOCAL_TEXT_STAT_PREFIX + o}, ${n})`);
    t?.Start();
    if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey) {
      e = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(n);
      t?.Stop();
      getLocalTextStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return `${TABLE}|${o}|${e}`;
    }
    let i = langCache.get(o);
    if (!i) {
      i = new Map();
      langCache.set(o, i);
    }
    var e = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(n);
    let a = i.get(e);
    if (a) {
      t?.Stop();
      getLocalTextStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return a;
    }
    var g = ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND, e);
    if (m = ConfigCommon_1.ConfigCommon.CheckStatement(g) && ConfigCommon_1.ConfigCommon.BindInt(g, 1, o, ...logPair, ["Id", o]) && ConfigCommon_1.ConfigCommon.Step(g, true, ...logPair, ["传入语言", n], ["查询语言", e], ["文本Id", o]) > 0) {
      var C = undefined;
      [m, C] = ConfigCommon_1.ConfigCommon.GetValue(g, 0, ...logPair, ["传入语言", n], ["查询语言", e], ["文本Id", o]);
      if (m) {
        var m = DeserializeConfig_1.DeserializeConfig.ParseStringRange(C, 0, C.byteLength, ...logPair, ["传入语言", n], ["查询语言", e], ["文本Id", o]);
        if (m.Success) {
          a = m.Value;
          ConfigCommon_1.ConfigCommon.Reset(g);
          t?.Stop();
          getLocalTextStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          if (StringUtils_1.StringUtils.IsEmpty(a) && n !== CommonDefine_1.CHS) {
            C = exports.configOccupationConfigLang.GetLocalText(o, CommonDefine_1.CHS);
            if (!StringUtils_1.StringUtils.IsEmpty(C)) {
              m = n === undefined ? "" : "|" + n;
              a = TEXTNOTFOUNT + "|" + o + m;
            }
          }
          i.set(e, a);
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
//# sourceMappingURL=OccupationConfigLang.js.map