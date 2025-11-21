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
    this.rSd = 0;
    this.F7d = new NotObtainedRoleDevWeaponDetailItemData_1.NotObtainedRoleDevWeaponDetailItemData();
  }
  InitByRoleType(e) {
    e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProjectConfig(e);
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
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId).WeaponLevel;
  }
  GetWeaponGoalBreakLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId).WeaponBreachLevel;
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
    return this.F7d;
  }
}
exports.NotObtainedRoleDevWeaponDevData = NotObtainedRoleDevWeaponDevData;
//# sourceMappingURL=NotObtainedRoleDevWeaponDevData.js.map