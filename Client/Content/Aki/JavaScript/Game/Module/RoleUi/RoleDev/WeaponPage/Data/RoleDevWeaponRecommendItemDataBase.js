"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponRecommendItemDataBase = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevWeaponSubRecommendItemDataBase_1 = require("./RoleDevWeaponSubRecommendItemDataBase");
class RoleDevWeaponRecommendItemDataBase {
  constructor() {
    this.RoleIdInternal = 0;
    this.SubRecommendItemsInternal = [];
  }
  InitByRoleId(e) {
    this.RoleIdInternal = e;
    this.InitByRoleType(e);
  }
  get RoleId() {
    return this.RoleIdInternal;
  }
  get IsRoleObtained() {
    return ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.RoleId) !== undefined;
  }
  get SubRecommendItems() {
    return this.SubRecommendItemsInternal;
  }
  get WeaponConfigId() {
    return this.GetWeaponConfigId();
  }
  get WeaponName() {
    return this.GetWeaponName();
  }
  get WeaponLevel() {
    return this.GetWeaponLevel();
  }
  get WeaponGoalUpgradeLevel() {
    return this.GetWeaponGoalUpgradeLevel();
  }
  get IsCall() {
    return this.GetIsCall();
  }
  get GachaId() {
    return this.GetGachaId();
  }
  get IsWeaponHighQuality() {
    return this.GetIsWeaponHighQuality();
  }
  get IsObtained() {
    return this.GetIsObtained();
  }
  get IsForecast() {
    return this.GetIsForecast();
  }
  InitSubRecommendItems(e) {
    this.SubRecommendItemsInternal.length = 0;
    var t = ConfigManager_1.ConfigManager.RoleDevConfig?.GetWeaponRecommendListConfig(e);
    if (t) {
      for (const r of t) {
        var a = new RoleDevWeaponSubRecommendItemDataBase_1.RoleDevWeaponSubRecommendItemDataBase();
        a.InitByWeaponId(r, e);
        this.SubRecommendItemsInternal.push(a);
      }
    }
  }
  IsEquipRecommendWeapon() {
    var e = this.GetWeaponConfigId();
    if (!(e <= 0)) {
      for (const t of this.SubRecommendItemsInternal) {
        if (t.WeaponId === e) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.RoleDevWeaponRecommendItemDataBase = RoleDevWeaponRecommendItemDataBase;
//# sourceMappingURL=RoleDevWeaponRecommendItemDataBase.js.map