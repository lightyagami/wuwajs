"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClearMultiTextLangStatementIdsAndCache = exports.configMultiTextLang = undefined;
const LanguageSystem_1 = require("../../Common/LanguageSystem");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DeserializeConfig_1 = require("../../Config/DeserializeConfig");
const Macro_1 = require("../../Preprocessor/Macro");
const StringUtils_1 = require("../../Utils/StringUtils");
const CommonDefine_1 = require("../CommonDefine");
const TEXTNOTFOUNT = "text not found";
const DB = "lang_multi_text.db";
const TABLE = "MultiText";
const COMMAND = "select content from `MultiText` where id = ?";
const SUB_DB_NAMES = ["lang_multi_text_1sthalf.db", "lang_multi_text_2ndhalf.db"];
const COMMAND_WITH_REDIRECT_DB = "select content,redirectdbindex from `MultiText` where id = ?";
const logPair = [["数据库", DB], ["表名", TABLE], ["语句", COMMAND]];
const langCache = new Map();
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMultiTextLang.Init");
const getLocalTextStat = Stats_1.Stat.CreateNoFlameGraph("configMultiTextLang.GetLocalTextNew");
const LOCAL_TEXT_STAT_PREFIX = "configMultiTextLang.GetLocalTextNew(";
function ClearMultiTextLangStatementIdsAndCache() {
  ConfigCommon_1.ConfigCommon.ClearLangAllStatementId(TABLE, DB);
  for (const o of SUB_DB_NAMES) {
    ConfigCommon_1.ConfigCommon.ClearLangAllStatementId(TABLE, o);
  }
  langCache.clear();
}
exports.configMultiTextLang = {
  Init: () => {
    initStat?.Start();
    ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND_WITH_REDIRECT_DB);
    initStat?.Stop();
  },
  GetLocalText: (o, t = 0) => {},
  GetLocalTextNew: (o, t = undefined) => {
    if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey) {
      e = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(t);
      return `${TABLE}|${o}|${e}`;
    }
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getLocalTextStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${"" + LOCAL_TEXT_STAT_PREFIX + o}, ${t})`);
    e?.Start();
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
    let C = ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND_WITH_REDIRECT_DB, i);
    let _ = ConfigCommon_1.ConfigCommon.CheckStatement(C) && ConfigCommon_1.ConfigCommon.BindString(C, 1, o, ...logPair, ["Id", o]) && ConfigCommon_1.ConfigCommon.Step(C, true, ...logPair, ["传入语言", t], ["查询语言", i], ["文本Id", o]) > 0;
    if (_) {
      var [g, m] = ConfigCommon_1.ConfigCommon.GetValueInt(C, 1, ...logPair, ["传入语言", t], ["查询语言", i], ["文本Id", o]);
      if (g) {
        if (m > 0) {
          g = ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, SUB_DB_NAMES[m - 1], COMMAND, i);
          if (_ = ConfigCommon_1.ConfigCommon.CheckStatement(g) && ConfigCommon_1.ConfigCommon.BindString(g, 1, o, ...logPair, ["Id", o]) && ConfigCommon_1.ConfigCommon.Step(g, true, ...logPair, ["子数据库", SUB_DB_NAMES[m - 1]], ["传入语言", t], ["查询语言", i], ["文本Id", o]) > 0) {
            ConfigCommon_1.ConfigCommon.Reset(C);
            C = g;
          } else {
            ConfigCommon_1.ConfigCommon.Reset(g);
          }
        }
        m = undefined;
        [_, m] = ConfigCommon_1.ConfigCommon.GetValue(C, 0, ...logPair, ["传入语言", t], ["查询语言", i], ["文本Id", o]);
        if (_) {
          var g = DeserializeConfig_1.DeserializeConfig.ParseStringRange(m, 0, m.byteLength, ...logPair, ["传入语言", t], ["查询语言", i], ["文本Id", o]);
          if (g.Success) {
            a = g.Value;
            ConfigCommon_1.ConfigCommon.Reset(C);
            e?.Stop();
            getLocalTextStat?.Stop();
            ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
            if (StringUtils_1.StringUtils.IsEmpty(a) && t !== CommonDefine_1.CHS) {
              m = exports.configMultiTextLang.GetLocalTextNew(o, CommonDefine_1.CHS);
              if (!StringUtils_1.StringUtils.IsEmpty(m)) {
                g = t === undefined ? "" : "|" + t;
                a = TEXTNOTFOUNT + "|" + o + g;
              }
            }
            n.set(i, a);
            return a;
          }
        }
      }
    }
    ConfigCommon_1.ConfigCommon.Reset(C);
    e?.Stop();
    getLocalTextStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
exports.ClearMultiTextLangStatementIdsAndCache = ClearMultiTextLangStatementIdsAndCache; //# sourceMappingURL=MultiTextLang.js.map