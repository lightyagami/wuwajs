"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponSkeletalObserverHandles = exports.ResonanceConditionData = exports.LevelUpConditionData = exports.BreachConditionData = exports.ConsumeData = exports.MaterialData = exports.WEAPON_EQUIPTYPE = exports.WEAPON_CURVE_RATION = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
exports.WEAPON_CURVE_RATION = 10000;
exports.WEAPON_EQUIPTYPE = 0;
class MaterialData {
  constructor(t, e = 1) {
    this.ItemData = t;
    this.UseCount = e;
  }
  AddCount() {
    this.UseCount += 1;
  }
  ReduceCount() {
    --this.UseCount;
  }
  CheckEmpty() {
    return this.UseCount === 0;
  }
}
exports.MaterialData = MaterialData;
class ConsumeData {
  constructor() {
    this.Exp = 0;
    this.Coin = 0;
  }
}
exports.ConsumeData = ConsumeData;
class BreachConditionData {
  constructor() {
    this.CanBreach = true;
    this.Tips = "";
  }
}
exports.BreachConditionData = BreachConditionData;
class LevelUpConditionData {
  constructor() {
    this.HasHighQuality = false;
    this.HasBeStrength = false;
    this.HasResonance = false;
  }
  CheckAllCondition() {
    return this.HasHighQuality && this.HasBeStrength && this.HasResonance;
  }
  GetConditionTextList() {
    var t;
    var e = [];
    if (this.HasHighQuality) {
      t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponHighQuality");
      e.push(t);
    }
    if (this.HasBeStrength) {
      t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponHasLevelUp");
      e.push(t);
    }
    if (this.HasResonance) {
      t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("WeaponHasResonance");
      e.push(t);
    }
    return e;
  }
}
exports.LevelUpConditionData = LevelUpConditionData;
class ResonanceConditionData {
  constructor() {
    this.HasBeStrength = false;
    this.HasResonance = false;
  }
}
exports.ResonanceConditionData = ResonanceConditionData;
class WeaponSkeletalObserverHandles {
  constructor(t, e) {
    this.WeaponObserver = t;
    this.WeaponScabbardObserver = e;
  }
}
exports.WeaponSkeletalObserverHandles = WeaponSkeletalObserverHandles;
//# sourceMappingURL=WeaponDefine.js.map