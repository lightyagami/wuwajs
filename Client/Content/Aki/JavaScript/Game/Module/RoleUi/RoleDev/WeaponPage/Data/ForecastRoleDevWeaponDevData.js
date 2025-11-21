"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForecastRoleDevWeaponDevData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ForecastRoleDevWeaponDetailItemData_1 = require("./ForecastRoleDevWeaponDetailItemData");
const RoleDevWeaponDevItemDataBase_1 = require("./RoleDevWeaponDevItemDataBase");
class ForecastRoleDevWeaponDevData extends RoleDevWeaponDevItemDataBase_1.RoleDevWeaponDevItemDataBase {
  constructor() {
    super(...arguments);
    this.rSd = 0;
    this.F7d = new ForecastRoleDevWeaponDetailItemData_1.ForecastRoleDevWeaponDetailItemData();
  }
  InitByRoleType(e) {
    e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(e);
    this.rSd = e.WeaponType;
    this.N7d();
  }
  N7d() {
    this.F7d.InitByWeaponType(this.RoleId, this.rSd);
  }
  GetWeaponLevel() {
    return 1;
  }
  GetWeaponBreachLevel() {
    return 0;
  }
  GetWeaponGoalUpgradeLevel() {
    return 90;
  }
  GetWeaponGoalBreakLevel() {
    return 0;
  }
  GetMaxLevel() {
    return 0;
  }
  GetDetailItems() {
    return this.F7d.DetailItems;
  }
  GetWeaponName() {
    return ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevWeaponItemConfig(this.rSd).WeaponTypeDescribe;
  }
  GetIsCanUpgrade() {
    return this.IsCanShowUpgradeItem;
  }
  GetIsCanBreach() {
    return false;
  }
  GetIsCall() {
    return false;
  }
  GetGachaId() {
    return 0;
  }
  GetWeaponConfigId() {
    return 0;
  }
  GetIsHighQuality() {
    return false;
  }
}
exports.ForecastRoleDevWeaponDevData = ForecastRoleDevWeaponDevData;
//# sourceMappingURL=ForecastRoleDevWeaponDevData.js.map