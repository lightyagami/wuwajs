"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configCommonParamLang = undefined;
const LanguageSystem_1 = require("../../Common/LanguageSystem");
const Stats_1 = require("../../Common/Stats");
const ConfigCommon_1 = require("../../Config/ConfigCommon");
const DeserializeConfig_1 = require("../../Config/DeserializeConfig");
const DB = "lang_common_param.db";
const TABLE = "CommonParam";
const COMMAND = "select content from `CommonParam` where id = ?";
const logPair = [["数据库", DB], ["表名", TABLE], ["语句", COMMAND]];
const langCache = new Map();
const initStat = Stats_1.Stat.CreateNoFlameGraph("configCommonParamLang.Init");
const getLocalTextStat = Stats_1.Stat.CreateNoFlameGraph("configCommonParamLang.GetLocalText");
const LOCAL_TEXT_STAT_PREFIX = "configCommonParamLang.GetLocalText(";
exports.configCommonParamLang = {
  Init: () => {
    initStat?.Start();
    ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND);
    initStat?.Stop();
  },
  GetLocalText: (o, a = undefined) => {
    var t = Stats_1.Stat.CreateNoFlameGraph(`${"" + LOCAL_TEXT_STAT_PREFIX + o}, ${a})`);
    getLocalTextStat?.Start();
    t?.Start();
    if (LanguageSystem_1.LanguageSystem.GmShowLanguageKey) {
      n = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(a);
      t?.Stop();
      getLocalTextStat?.Stop();
      return `CommonParam|${o}|${n}`;
    }
    let e = langCache.get(o);
    if (!e) {
      e = new Map();
      langCache.set(o, e);
    }
    var n = LanguageSystem_1.LanguageSystem.GetCultureOrDefault(a);
    var i = e.get(n);
    if (i) {
      t?.Stop();
      getLocalTextStat?.Stop();
      return i;
    }
    var m = ConfigCommon_1.ConfigCommon.GetLangStatementId(TABLE, DB, COMMAND, a);
    if (C = ConfigCommon_1.ConfigCommon.CheckStatement(m)) {
      if (C = (C = ConfigCommon_1.ConfigCommon.BindInt(m, 1, o, ...logPair, ["Id", o])) && ConfigCommon_1.ConfigCommon.Step(m, true, ...logPair, ["传入语言", a], ["查询语言", n], ["文本Id", o]) > 0) {
        var g = undefined;
        [C, g] = ConfigCommon_1.ConfigCommon.GetValue(m, 0, ...logPair, ["传入语言", a], ["查询语言", n], ["文本Id", o]);
        if (C) {
          var C = DeserializeConfig_1.DeserializeConfig.ParseString(g, 0, ...logPair, ["传入语言", a], ["查询语言", n], ["文本Id", o]);
          if (C.Success) {
            i = C.Value;
            e.set(n, i);
            ConfigCommon_1.ConfigCommon.Reset(m);
            t?.Stop();
            getLocalTextStat?.Stop();
            return i;
          }
        }
      }
      ConfigCommon_1.ConfigCommon.Reset(m);
    }
    t?.Stop();
    getLocalTextStat?.Stop();
  }
};
//# sourceMappingURL=CommonParamLang.js.map