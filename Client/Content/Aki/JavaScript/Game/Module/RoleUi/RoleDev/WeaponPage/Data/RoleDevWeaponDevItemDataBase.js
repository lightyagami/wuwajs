"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponDevItemDataBase = undefined;
const RoleDevUtils_1 = require("../../RoleDevUtils");
class RoleDevWeaponDevItemDataBase {
  constructor() {
    this.RoleIdInternal = 0;
    this.RoleTypeInternal = 0;
  }
  InitByRoleId(e, t) {
    this.RoleIdInternal = e;
    this.RoleTypeInternal = t;
    this.InitByRoleType(e);
  }
  get RoleId() {
    return this.RoleIdInternal;
  }
  get RoleType() {
    return this.RoleTypeInternal;
  }
  get WeaponLevel() {
    return this.GetWeaponLevel();
  }
  get WeaponBreachLevel() {
    return this.GetWeaponBreachLevel();
  }
  get WeaponGoalUpgradeLevel() {
    return this.GetWeaponGoalUpgradeLevel();
  }
  get WeaponGoalBreakLevel() {
    return this.GetWeaponGoalBreakLevel();
  }
  get DetailItems() {
    return this.GetDetailItems();
  }
  get WeaponName() {
    return this.GetWeaponName();
  }
  get IsCanUpgrade() {
    return this.GetIsCanUpgrade();
  }
  get IsCanBreach() {
    return this.GetIsCanBreach();
  }
  get IsCall() {
    return this.GetIsCall();
  }
  get GachaId() {
    return this.GetGachaId();
  }
  get WeaponConfigId() {
    return this.GetWeaponConfigId();
  }
  get IsHighQuality() {
    return this.GetIsHighQuality();
  }
  get IsCanShowUpgradeItem() {
    return this.WeaponLevel < this.WeaponGoalUpgradeLevel;
  }
  get IsCanShowBreachItem() {
    return this.WeaponBreachLevel < this.WeaponGoalBreakLevel;
  }
  get IsFinish() {
    return !this.IsCanShowUpgradeItem && !this.IsCanShowBreachItem;
  }
  get IsAllMaterialEnough() {
    return RoleDevUtils_1.RoleDevUtils.CheckAllItemsUp(this.DetailItems);
  }
  get IsRoleObtained() {
    return this.RoleType === 0;
  }
  get WeaponIsMaxLevel() {
    return this.WeaponLevel >= this.GetMaxLevel();
  }
}
exports.RoleDevWeaponDevItemDataBase = RoleDevWeaponDevItemDataBase;
//# sourceMappingURL=RoleDevWeaponDevItemDataBase.js.map