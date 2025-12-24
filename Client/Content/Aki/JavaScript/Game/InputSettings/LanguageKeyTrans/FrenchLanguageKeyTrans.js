"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrenchLanguageKeyTrans = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const LanguageKeyTransBase_1 = require("./LanguageKeyTransBase");
class FrenchLanguageKeyTrans extends LanguageKeyTransBase_1.LanguageKeyTransBase {
  GetOtherPcKey(e) {
    return e.FrenchKeyName;
  }
  GetActionPcKeys(e) {
    return e.FrancePcKeys;
  }
  GetAxisPcKeys(e) {
    return e.FrancePcKeys;
  }
  GetCombinationActionPcKeys(e) {
    return e.FrancePcKeys;
  }
  GetPcKeyIconPath(e) {
    if (StringUtils_1.StringUtils.IsBlank(e.FrenchKeyIconPath)) {
      return e.KeyIconPath;
    } else {
      return e.FrenchKeyIconPath;
    }
  }
}
exports.FrenchLanguageKeyTrans = FrenchLanguageKeyTrans;
//# sourceMappingURL=FrenchLanguageKeyTrans.js.map