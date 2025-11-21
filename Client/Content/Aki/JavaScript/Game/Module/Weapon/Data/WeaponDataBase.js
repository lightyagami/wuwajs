"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponDataBase = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const WeaponSkinDefine_1 = require("../../Skin/Tab/Weapon/WeaponSkinDefine");
class WeaponDataBase {
  GetModelId(e) {
    return (e === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID ? this.GetItemConfig() : ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(e)).ModelId;
  }
  GetModels(e) {
    return (e === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID ? this.GetItemConfig() : ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(e)).Models;
  }
  GetModelsIndex(e) {
    return (e === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID ? this.GetItemConfig() : ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(e)).ModelsIndex;
  }
  GetTransformId(e) {
    return (e === WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID ? this.GetItemConfig() : ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(e)).TransformId;
  }
  GetWeaponConfig() {
    return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(this.GetItemId());
  }
  GetBreachConfig() {
    var e;
    var n = this.GetWeaponConfig();
    if (n) {
      e = this.GetBreachLevel();
      return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(n.BreachId, e);
    }
  }
  GetBreachConfigList() {
    var e = this.GetWeaponConfig();
    if (e) {
      return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreachList(e.BreachId);
    }
  }
  GetResonanceConfig() {
    var e;
    var n = this.GetWeaponConfig();
    if (n) {
      e = this.GetResonanceLevel();
      return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(n.ResonId, e);
    }
  }
  CanGoBreach() {
    var e;
    var n = this.GetLevel();
    return !(this.GetLastBreachConfig().LevelLimit <= n) && !!(e = this.GetBreachConfig()) && n >= e.LevelLimit;
  }
  GetLastBreachConfig() {
    var e = this.GetWeaponConfig().BreachId;
    var e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreachList(e);
    return e[e.length - 1];
  }
  GetBreachConsume() {
    var e = this.GetWeaponConfig();
    var n = this.GetBreachLevel();
    return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(e.BreachId, n).Consume;
  }
  GetMaxLevel() {
    var e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponLevelLimit(this.GetItemConfig().QualityId);
    var n = this.GetLastBreachConfig();
    return Math.min(e, n.LevelLimit);
  }
  IsLevelMax() {
    return this.GetMaxLevel() <= this.GetLevel();
  }
  GetMaterialCost() {
    var e = this.GetItemConfig().QualityId;
    return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponQualityInfo(e).Cost;
  }
  GetMaxExp(e) {
    let n = 0;
    for (const r of ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponLevelList(this.GetWeaponConfig().LevelId)) {
      if (!(r.Level <= e)) {
        return n;
      }
      n += r.Exp;
    }
    return n;
  }
  GetLevelLimitMaxExp() {
    var e = this.GetBreachLevel();
    var e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(this.GetWeaponConfig().BreachId, e);
    return this.GetMaxExp(e.LevelLimit - 1);
  }
  GetLevelExp(e) {
    let n = 0;
    if (e <= 0) {
      return 0;
    } else {
      e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponLevelConfig(this.GetWeaponConfig().LevelId, e);
      return n = e ? e.Exp : n;
    }
  }
  GetCurrentMaxLevel() {
    var e;
    var n = this.GetWeaponConfig();
    if (n) {
      e = this.GetBreachLevel();
      return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(n.BreachId, e).LevelLimit;
    } else {
      return 0;
    }
  }
  GetLastLevelMaxExp() {
    return this.GetMaxExp(this.GetLevel() - 1);
  }
  GetItemConfig() {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(this.GetItemId());
  }
}
exports.WeaponDataBase = WeaponDataBase;
//# sourceMappingURL=WeaponDataBase.js.map