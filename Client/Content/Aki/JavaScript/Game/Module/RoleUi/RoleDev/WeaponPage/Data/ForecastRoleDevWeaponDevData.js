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
    this.kpd = 0;
    this.kNd = new ForecastRoleDevWeaponDetailItemData_1.ForecastRoleDevWeaponDetailItemData();
  }
  InitByRoleType(e) {
    e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(e);
    this.kpd = e.WeaponType;
    this.ONd();
  }
  ONd() {
    this.kNd.InitByWeaponType(this.RoleId, this.kpd);
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
    return this.kNd.DetailItems;
  }
  GetWeaponName() {
    return ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevWeaponItemConfig(this.kpd).WeaponTypeDescribe;
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