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
  static Tfg() {
    this.bfg.set("Default", new DefaultLanguageKeyTrans_1.DefaultLanguageKeyTrans());
    this.bfg.set("French", new FrenchLanguageKeyTrans_1.FrenchLanguageKeyTrans());
    this.bfg.set("Thai", new ThaiLanguageKeyTrans_1.ThaiLanguageKeyTrans());
  }
  static Rfg() {
    for (const e of ConfigManager_1.ConfigManager.InputSettingsConfig.GetPcKeyConfigList()) {
      for (const a of this.bfg.values()) {
        a.InitPcKeysByConfig(e);
      }
    }
  }
  static Initialize() {
    this.Tfg();
    this.Rfg();
  }
  static GetKeyTrans(e) {
    e = this.bfg.get(e);
    return e || this.bfg.get("Default");
  }
}
(exports.LanguageKeyTransUtils = LanguageKeyTransUtils).bfg = new Map();
//# sourceMappingURL=LanguageKeyTransUtils.js.map