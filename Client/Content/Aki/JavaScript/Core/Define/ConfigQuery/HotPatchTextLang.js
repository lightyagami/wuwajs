"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHotPatchTextLang = undefined;
const LanguageSystem_1 = require("../../Common/LanguageSystem");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DeserializeConfig_1 = require("../../Config/DeserializeConfig");
const Macro_1 = require("../../Preprocessor/Macro");
const StringUtils_1 = require("../../Utils/StringUtils");
const CommonDefine_1 = require("../CommonDefine");
const TEXTNOTFOUNT = "text not found";
const DB = "lang_hot_patch.db";
const TABLE = "HotPatchText";
const COMMAND = "select content from `HotPatchText` where id = ?";
const logPair = [["数据库", DB], ["表名", TABLE], ["语句", COMMAND]];
const langCache = new Map();
const initStat = Stats_1.Stat.CreateNoFlameGraph("configHotPatchTextLang.Init");
const getLocalTextStat = Stats_1.Stat.CreateNoFlameGraph("configHotPatchTextLang.GetLocalTextNew");
const LOCAL_TEXT_STAT_PREFIX = "configHotPatchTextLang.GetLocalTextNew(";
exports.configHotPatchTextLang = {
  Init: () => {
    initStat?.Start();
    ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND);
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
    var g = ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND, i);
    if (C = ConfigCommon_1.ConfigCommon.CheckStatement(g) && ConfigCommon_1.ConfigCommon.BindString(g, 1, o, ...logPair, ["Id", o]) && ConfigCommon_1.ConfigCommon.Step(g, true, ...logPair, ["传入语言", t], ["查询语言", i], ["文本Id", o]) > 0) {
      var r = undefined;
      [C, r] = ConfigCommon_1.ConfigCommon.GetValue(g, 0, ...logPair, ["传入语言", t], ["查询语言", i], ["文本Id", o]);
      if (C) {
        var C = DeserializeConfig_1.DeserializeConfig.ParseStringRange(r, 0, r.byteLength, ...logPair, ["传入语言", t], ["查询语言", i], ["文本Id", o]);
        if (C.Success) {
          a = C.Value;
          ConfigCommon_1.ConfigCommon.Reset(g);
          e?.Stop();
          getLocalTextStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          if (StringUtils_1.StringUtils.IsEmpty(a) && t !== CommonDefine_1.CHS) {
            r = exports.configHotPatchTextLang.GetLocalTextNew(o, CommonDefine_1.CHS);
            if (!StringUtils_1.StringUtils.IsEmpty(r)) {
              C = t === undefined ? "" : "|" + t;
              a = TEXTNOTFOUNT + "|" + o + C;
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
//# sourceMappingURL=HotPatchTextLang.js.map