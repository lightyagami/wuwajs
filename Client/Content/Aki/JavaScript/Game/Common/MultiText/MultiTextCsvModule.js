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
  Pde(e) {
    var t = StringUtils_1.StringUtils.ParseCsvContent(e);
    const i = t[MultiTextDefine_1.CSV_LANG_INDEX];
    for (let e = MultiTextDefine_1.CVS_START_INDEX; e < t.length; e++) {
      var r = t[e];
      if (!(r.length < 2)) {
        var s = r[1];
        if (!StringUtils_1.StringUtils.IsBlank(s)) {
          const o = new Map();
          r.forEach((e, t) => {
            if (t > 1) {
              e = e.replace(/\\n/g, "\n");
              o.set(i[t], e ?? "test/NoLocalTextNoLocalTextNoLocalText");
            }
          });
          this.Ade.set(s, o);
        }
      }
    }
  }
  RegisterTextLocalConfig(e, t = false) {
    var i;
    if (!!t || !this.Ude.has(e)) {
      this.Ude.add(e);
      i = (t = undefined, puerts_1.$ref)(undefined);
      UE.KuroStaticLibrary.LoadFileToString(i, e);
      t = (0, puerts_1.$unref)(i);
      this.Pde(t);
    }
  }
  GetLocalText(e) {
    var t = LanguageSystem_1.LanguageSystem.PackageLanguage;
    var i = this.Ade.get(e);
    if (i && i.size > 0) {
      return i.get(t);
    } else {
      return e;
    }
  }
}
exports.MultiTextCsvModule = MultiTextCsvModule;
//# sourceMappingURL=MultiTextCsvModule.js.map