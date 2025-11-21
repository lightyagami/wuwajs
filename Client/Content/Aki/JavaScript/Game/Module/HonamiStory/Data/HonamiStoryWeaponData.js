"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryWeaponData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class HonamiStoryWeaponData {
  constructor(t) {
    this.xe = 0;
    this.kja = false;
    this.PluginTags = [];
    this.SuitId = [];
    this.ExtraSuitAddEnhanceLevel = new Map();
    this.IsShowReward = false;
    this.Desc = "";
    this.DescArgs = [];
    this.DescSimple = "";
    this.DescSimpleArgs = [];
    this.xe = t;
    this.kja = false;
    t = this.Config;
    this.PluginTags = t.PluginTags;
    this.SuitId = t.SuitId;
    this.ExtraSuitAddEnhanceLevel = t.ExtraSuitAddEnhanceLevel;
    this.IsShowReward = t.IsShowReward;
    this.Desc = t.AttributesDescription;
    this.DescArgs = t.AttributesDescriptionArgs;
    this.DescSimple = t.AttributesDescriptionSimple;
    this.DescSimpleArgs = t.AttributesDescriptionSimpleArgs;
  }
  get WeaponId() {
    return this.xe;
  }
  get IsUnlock() {
    return this.kja;
  }
  SetUnlock(t) {
    this.kja = t;
  }
  get Config() {
    return ConfigManager_1.ConfigManager.HonamiStoryConfig.GetWeaponConfig(this.xe);
  }
  get WeaponType() {
    return this.Config.Type;
  }
}
exports.HonamiStoryWeaponData = HonamiStoryWeaponData;
//# sourceMappingURL=HonamiStoryWeaponData.js.map