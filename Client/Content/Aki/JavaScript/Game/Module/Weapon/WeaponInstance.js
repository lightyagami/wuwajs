"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponInstance = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const WeaponDataBase_1 = require("./Data/WeaponDataBase");
class WeaponInstance extends WeaponDataBase_1.WeaponDataBase {
  constructor() {
    super(...arguments);
    this.WeaponItem = undefined;
  }
  SetWeaponItem(e) {
    this.WeaponItem = e;
  }
  SetLevel(e) {
    this.WeaponItem.Cjn = e;
  }
  GetLevel() {
    return this.WeaponItem.Cjn;
  }
  SetExp(e) {
    this.WeaponItem.gjn = e;
  }
  GetExp() {
    return this.WeaponItem.gjn;
  }
  SetResonanceLevel(e) {
    this.WeaponItem.fjn = e;
  }
  GetResonanceLevel() {
    return this.WeaponItem.fjn;
  }
  SetBreachLevel(e) {
    this.WeaponItem.ujn = e;
  }
  GetBreachLevel() {
    return this.WeaponItem.ujn;
  }
  GetIncId() {
    return this.WeaponItem.b9n;
  }
  GetItemId() {
    var e = this.GetIncId();
    return ModelManager_1.ModelManager.InventoryModel.GetWeaponItemData(e).GetConfigId();
  }
  IsLock() {
    var e = this.GetIncId();
    return ModelManager_1.ModelManager.InventoryModel.GetWeaponItemData(e).GetIsLock();
  }
  IsTrial() {
    return false;
  }
  HasRole() {
    return this.GetRoleId() > 0;
  }
  SetRoleId(e) {
    this.WeaponItem.Q6n = e;
  }
  GetRoleId() {
    return this.WeaponItem.Q6n;
  }
  GetMaterialExp() {
    var e = this.GetItemConfig().QualityId;
    var e = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponQualityInfo(e);
    var t = this.GetExp();
    var a = this.GetLevel();
    if (t <= 0 && a === 1) {
      return e.BasicExp;
    } else {
      a = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponExpCoefficient();
      return Math.floor(e.BasicExp + (this.GetLastLevelMaxExp() + t) * a);
    }
  }
  HasWeaponCultivated() {
    var e = this.GetResonanceLevel() > 1;
    var t = this.GetLevel() > 1;
    var a = this.GetExp() > 0;
    return e || t || a;
  }
}
exports.WeaponInstance = WeaponInstance;
//# sourceMappingURL=WeaponInstance.js.map