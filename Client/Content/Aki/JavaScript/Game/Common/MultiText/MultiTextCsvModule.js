"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiTextCsvModule = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const LanguageSystem_1 = require("../../../Core/Common/LanguageSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const MultiTextDefine_1 = require("./MultiTextDefine");
class MultiTextCsvModule {
  constructor() {
    this.Ude = new Set();
    this.Ade = new Map();
  }
  Pde(t) {
    var e = StringUtils_1.StringUtils.ParseCsvContent(t);
    const i = e[MultiTextDefine_1.CSV_LANG_INDEX];
    for (let t = MultiTextDefine_1.CVS_START_INDEX; t < e.length; t++) {
      var r = e[t];
      if (!(r.length < 2)) {
        var s = r[1];
        if (!StringUtils_1.StringUtils.IsBlank(s)) {
          const o = new Map();
          r.forEach((t, e) => {
            if (e > 1) {
              t = t.replace(/\\n/g, "\n");
              o.set(i[e], t ?? "test/NoLocalTextNoLocalTextNoLocalText");
            }
          });
          this.Ade.set(s, o);
        }
      }
    }
  }
  Jvd(t, e, i, r) {
    var s = StringUtils_1.StringUtils.ParseCsvContent(t);
    const o = s[e];
    for (let t = i; t < s.length; t++) {
      var a = s[t];
      if (!(a.length < 2)) {
        var n = a[r];
        if (!StringUtils_1.StringUtils.IsBlank(n)) {
          const l = new Map();
          a.forEach((t, e) => {
            if (r < e) {
              t = t.replace(/\\n/g, "\n");
              l.set(o[e], t ?? "test/NoLocalTextNoLocalTextNoLocalText");
            }
          });
          this.Ade.set(n, l);
        }
      }
    }
  }
  RegisterTextLocalConfig(t, e = false) {
    var i;
    if (!!e || !this.Ude.has(t)) {
      this.Ude.add(t);
      i = (e = undefined, puerts_1.$ref)(undefined);
      UE.KuroStaticLibrary.LoadFileToString(i, t);
      e = (0, puerts_1.$unref)(i);
      this.Pde(e);
    }
  }
  RegisterTextLocalConfigWithParam(t, e = false, i = 1, r = 8, s = 2) {
    var o;
    if (!!e || !this.Ude.has(t)) {
      this.Ude.add(t);
      o = (e = undefined, puerts_1.$ref)(undefined);
      UE.KuroStaticLibrary.LoadFileToString(o, t);
      e = (0, puerts_1.$unref)(o);
      this.Jvd(e, i, r, s);
    }
  }
  GetLocalText(t) {
    var e = LanguageSystem_1.LanguageSystem.PackageLanguage;
    var i = this.Ade.get(t);
    if (i && i.size > 0) {
      return i.get(e);
    } else {
      return t;
    }
  }
}
exports.MultiTextCsvModule = MultiTextCsvModule;
//# sourceMappingURL=MultiTextCsvModule.js.map