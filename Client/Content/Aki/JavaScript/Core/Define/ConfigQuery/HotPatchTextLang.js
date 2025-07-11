"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configHotPatchTextLang = undefined;
const LanguageSystem_1 = require("../../Common/LanguageSystem");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DeserializeConfig_1 = require("../../Config/DeserializeConfig");
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
  GetLocalText: (t, o = 0) => {},
  GetLocalTextNew: (t, o = undefined) => {
    ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Start();
    getLocalTextStat?.Start();
    var e = Stats_1.Stat.CreateNoFlameGraph(`${"" + LOCAL_TEXT_STAT_PREFIX + t}, ${o})`);
    e?.Start();
    if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey) {
      i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o);
      e?.Stop();
      getLocalTextStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return `${TABLE}|${t}|${i}`;
    }
    let n = langCache.get(t);
    if (!n) {
      n = new Map();
      langCache.set(t, n);
    }
    var i = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(o);
    let a = n.get(i);
    if (a) {
      e?.Stop();
      getLocalTextStat?.Stop();
      ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
      return a;
    }
    var g = ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND, i);
    if (m = ConfigCommon_1.ConfigCommon.CheckStatement(g) && ConfigCommon_1.ConfigCommon.BindString(g, 1, t, ...logPair, ["Id", t]) && ConfigCommon_1.ConfigCommon.Step(g, true, ...logPair, ["传入语言", o], ["查询语言", i], ["文本Id", t]) > 0) {
      var C = undefined;
      [m, C] = ConfigCommon_1.ConfigCommon.GetValue(g, 0, ...logPair, ["传入语言", o], ["查询语言", i], ["文本Id", t]);
      if (m) {
        var m = DeserializeConfig_1.DeserializeConfig.ParseStringRange(C, 0, C.byteLength, ...logPair, ["传入语言", o], ["查询语言", i], ["文本Id", t]);
        if (m.Success) {
          a = m.Value;
          ConfigCommon_1.ConfigCommon.Reset(g);
          e?.Stop();
          getLocalTextStat?.Stop();
          ConfigCommon_1.ConfigCommon.AllConfigStatementStat.Stop();
          if (StringUtils_1.StringUtils.IsEmpty(a) && o !== CommonDefine_1.CHS) {
            C = exports.configHotPatchTextLang.GetLocalTextNew(t, CommonDefine_1.CHS);
            if (!StringUtils_1.StringUtils.IsEmpty(C)) {
              m = o === undefined ? "" : "|" + o;
              a = TEXTNOTFOUNT + "|" + t + m;
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