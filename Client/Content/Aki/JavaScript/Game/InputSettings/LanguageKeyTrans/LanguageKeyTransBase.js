"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageKeyTransBase = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
class LanguageKeyTransBase {
  constructor() {
    this.$Yf = new Map();
    this.WYf = new Map();
  }
  InitPcKeysByConfig(t) {
    var e = this.GetOtherPcKey(t);
    if (!StringUtils_1.StringUtils.IsBlank(e)) {
      this.$Yf.set(t.KeyName, e);
      this.WYf.set(e, t.KeyName);
    }
  }
  GetNormalToOtherPcKeysMap(t) {
    var e = this.$Yf.get(t);
    return e || t;
  }
  GetOtherToNormalPcKeysMap(t) {
    var e = this.WYf.get(t);
    return e || t;
  }
}
exports.LanguageKeyTransBase = LanguageKeyTransBase;
//# sourceMappingURL=LanguageKeyTransBase.js.map