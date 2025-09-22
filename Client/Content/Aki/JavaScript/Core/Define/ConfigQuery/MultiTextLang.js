"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configMultiTextLang = undefined;
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
const logPair = [["数据库", DB], ["表名", TABLE], ["语句", COMMAND]];
const langCache = new Map();
const initStat = Stats_1.Stat.CreateNoFlameGraph("configMultiTextLang.Init");
const getLocalTextStat = Stats_1.Stat.CreateNoFlameGraph("configMultiTextLang.GetLocalTextNew");
const LOCAL_TEXT_STAT_PREFIX = "configMultiTextLang.GetLocalTextNew(";
exports.configMultiTextLang = {
  Init: () => {
    initStat?.Start();
    ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND);
    initStat?.Stop();
  },
  GetLocalText: (e, t = 0) => {},
  GetLocalTextNew: (e, t = undefined) => {
    if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey) {
      o = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(t);
      return `${TABLE}|${e}|${o}`;
    }
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getLocalTextStat?.Start();
    var o = Stats_1.Stat.CreateNoFlameGraph(`${"" + LOCAL_TEXT_STAT_PREFIX + e}, ${t})`);
    o?.Start();
    let i = langCache.get(e);
    if (!i) {
      i = new Map();
      langCache.set(e, i);
    }
    var n = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(t);
    let a = i.get(n);
    if (a) {
      o?.Stop();
      getLocalTextStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return a;
    }
    var g = ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND, n);
    if (C = ConfigCommon_1.ConfigCommon.CheckStatement(g) && ConfigCommon_1.ConfigCommon.BindString(g, 1, e, ...logPair, ["Id", e]) && ConfigCommon_1.ConfigCommon.Step(g, true, ...logPair, ["传入语言", t], ["查询语言", n], ["文本Id", e]) > 0) {
      var r = undefined;
      [C, r] = ConfigCommon_1.ConfigCommon.GetValue(g, 0, ...logPair, ["传入语言", t], ["查询语言", n], ["文本Id", e]);
      if (C) {
        var C = DeserializeConfig_1.DeserializeConfig.ParseStringRange(r, 0, r.byteLength, ...logPair, ["传入语言", t], ["查询语言", n], ["文本Id", e]);
        if (C.Success) {
          a = C.Value;
          ConfigCommon_1.ConfigCommon.Reset(g);
          o?.Stop();
          getLocalTextStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          if (StringUtils_1.StringUtils.IsEmpty(a) && t !== CommonDefine_1.CHS) {
            r = exports.configMultiTextLang.GetLocalTextNew(e, CommonDefine_1.CHS);
            if (!StringUtils_1.StringUtils.IsEmpty(r)) {
              C = t === undefined ? "" : "|" + t;
              a = TEXTNOTFOUNT + "|" + e + C;
            }
          }
          i.set(n, a);
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
//# sourceMappingURL=MultiTextLang.js.map