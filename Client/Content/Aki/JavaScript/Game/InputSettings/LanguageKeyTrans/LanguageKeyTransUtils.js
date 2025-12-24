"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageKeyTransUtils = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const DefaultLanguageKeyTrans_1 = require("./DefaultLanguageKeyTrans");
const FrenchLanguageKeyTrans_1 = require("./FrenchLanguageKeyTrans");
const ThaiLanguageKeyTrans_1 = require("./ThaiLanguageKeyTrans");
class LanguageKeyTransUtils {
  static QYf() {
    this.KYf.set("Default", new DefaultLanguageKeyTrans_1.DefaultLanguageKeyTrans());
    this.KYf.set("French", new FrenchLanguageKeyTrans_1.FrenchLanguageKeyTrans());
    this.KYf.set("Thai", new ThaiLanguageKeyTrans_1.ThaiLanguageKeyTrans());
  }
  static XYf() {
    for (const e of ConfigManager_1.ConfigManager.InputSettingsConfig.GetPcKeyConfigList()) {
      for (const a of this.KYf.values()) {
        a.InitPcKeysByConfig(e);
      }
    }
  }
  static Initialize() {
    this.QYf();
    this.XYf();
  }
  static GetKeyTrans(e) {
    e = this.KYf.get(e);
    return e || this.KYf.get("Default");
  }
}
(exports.LanguageKeyTransUtils = LanguageKeyTransUtils).KYf = new Map();
//# sourceMappingURL=LanguageKeyTransUtils.js.map