"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThaiLanguageKeyTrans = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const LanguageKeyTransBase_1 = require("./LanguageKeyTransBase");
class ThaiLanguageKeyTrans extends LanguageKeyTransBase_1.LanguageKeyTransBase {
  GetOtherPcKey(e) {
    return e.ThaiKeyName;
  }
  GetActionPcKeys(e) {
    return e.ThaiPcKeys;
  }
  GetAxisPcKeys(e) {
    return e.ThaiPcKeys;
  }
  GetCombinationActionPcKeys(e) {
    return e.ThaiPcKeys;
  }
  GetPcKeyIconPath(e) {
    if (StringUtils_1.StringUtils.IsBlank(e.ThaiKeyIconPath)) {
      return e.KeyIconPath;
    } else {
      return e.ThaiKeyIconPath;
    }
  }
}
exports.ThaiLanguageKeyTrans = ThaiLanguageKeyTrans;
//# sourceMappingURL=ThaiLanguageKeyTrans.js.map