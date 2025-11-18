"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClearHotPatchTextLangStatementIdsAndCache = exports.configHotPatchTextLang = undefined;
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
function ClearHotPatchTextLangStatementIdsAndCache() {
  ConfigCommon_1.ConfigCommon.ClearLangAllStatementId(TABLE, DB);
  langCache.clear();
}
exports.configHotPatchTextLang = {
  Init: () => {
    initStat?.Start();
    ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND);
    initStat?.Stop();
  },
  GetLocalText: (t, o = 0) => {},
  GetLocalTextNew: (t, o = undefined) => {
    if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey) {
      e = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o);
      return `${TABLE}|${t}|${e}`;
    }
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getLocalTextStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${"" + LOCAL_TEXT_STAT_PREFIX + t}, ${o})`);
    e?.Start();
    let n = langCache.get(t);
    if (!n) {
      n = new Map();
      langCache.set(t, n);
    }
    var a = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o);
    let i = n.get(a);
    if (i) {
      e?.Stop();
      getLocalTextStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return i;
    }
    var g = ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND, a);
    if (r = ConfigCommon_1.ConfigCommon.CheckStatement(g) && ConfigCommon_1.ConfigCommon.BindString(g, 1, t, ...logPair, ["Id", t]) && ConfigCommon_1.ConfigCommon.Step(g, true, ...logPair, ["传入语言", o], ["查询语言", a], ["文本Id", t]) > 0) {
      var C = undefined;
      [r, C] = ConfigCommon_1.ConfigCommon.GetValue(g, 0, ...logPair, ["传入语言", o], ["查询语言", a], ["文本Id", t]);
      if (r) {
        var r = DeserializeConfig_1.DeserializeConfig.ParseStringRange(C, 0, C.byteLength, ...logPair, ["传入语言", o], ["查询语言", a], ["文本Id", t]);
        if (r.Success) {
          i = r.Value;
          ConfigCommon_1.ConfigCommon.Reset(g);
          e?.Stop();
          getLocalTextStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          if (StringUtils_1.StringUtils.IsEmpty(i) && o !== CommonDefine_1.CHS) {
            C = exports.configHotPatchTextLang.GetLocalTextNew(t, CommonDefine_1.CHS);
            if (!StringUtils_1.StringUtils.IsEmpty(C)) {
              r = o === undefined ? "" : "|" + o;
              i = TEXTNOTFOUNT + "|" + t + r;
            }
          }
          n.set(a, i);
          return i;
        }
      }
    }
    ConfigCommon_1.ConfigCommon.Reset(g);
    e?.Stop();
    getLocalTextStat?.Stop();
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
  }
};
exports.ClearHotPatchTextLangStatementIdsAndCache = ClearHotPatchTextLangStatementIdsAndCache; //# sourceMappingURL=HotPatchTextLang.js.map