"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotObtainedRoleDevWeaponDevData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
const NotObtainedRoleDevWeaponDetailItemData_1 = require("./NotObtainedRoleDevWeaponDetailItemData");
const RoleDevWeaponDevItemDataBase_1 = require("./RoleDevWeaponDevItemDataBase");
class NotObtainedRoleDevWeaponDevData extends RoleDevWeaponDevItemDataBase_1.RoleDevWeaponDevItemDataBase {
  constructor() {
    super(...arguments);
    this.kpd = 0;
    this.kNd = new NotObtainedRoleDevWeaponDetailItemData_1.NotObtainedRoleDevWeaponDetailItemData();
  }
  InitByRoleType(e) {
    e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProjectConfig(e);
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
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId).WeaponLevel;
  }
  GetWeaponGoalBreakLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId).WeaponBreachLevel;
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
    return this.IsCanShowBreachItem;
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
  get DetailItemData() {
    return this.kNd;
  }
}
exports.NotObtainedRoleDevWeaponDevData = NotObtainedRoleDevWeaponDevData;
//# sourceMappingURL=NotObtainedRoleDevWeaponDevData.js.map