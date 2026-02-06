"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageKeyTransBase = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
class LanguageKeyTransBase {
  constructor() {
    this.Efg = new Map();
    this.Ifg = new Map();
  }
  InitPcKeysByConfig(t) {
    var e = this.GetOtherPcKey(t);
    if (!StringUtils_1.StringUtils.IsBlank(e)) {
      this.Efg.set(t.KeyName, e);
      this.Ifg.set(e, t.KeyName);
    }
  }
  GetNormalToOtherPcKeysMap(t) {
    var e = this.Efg.get(t);
    return e || t;
  }
  GetOtherToNormalPcKeysMap(t) {
    var e = this.Ifg.get(t);
    return e || t;
  }
}
exports.LanguageKeyTransBase = LanguageKeyTransBase;
//# sourceMappingURL=LanguageKeyTransBase.js.map