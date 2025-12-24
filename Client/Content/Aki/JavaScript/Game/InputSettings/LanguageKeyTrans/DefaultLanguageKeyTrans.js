"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultLanguageKeyTrans = undefined;
const LanguageKeyTransBase_1 = require("./LanguageKeyTransBase");
class DefaultLanguageKeyTrans extends LanguageKeyTransBase_1.LanguageKeyTransBase {
  GetOtherPcKey(e) {
    return e.KeyName;
  }
  GetActionPcKeys(e) {
    return e.PcKeys;
  }
  GetAxisPcKeys(e) {
    return e.PcKeys;
  }
  GetCombinationActionPcKeys(e) {
    return e.PcKeys;
  }
  GetPcKeyIconPath(e) {
    return e.KeyIconPath;
  }
}
exports.DefaultLanguageKeyTrans = DefaultLanguageKeyTrans;
//# sourceMappingURL=DefaultLanguageKeyTrans.js.map