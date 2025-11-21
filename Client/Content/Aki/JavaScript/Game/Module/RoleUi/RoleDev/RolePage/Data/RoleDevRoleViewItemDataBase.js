"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevRoleViewItemDataBase = undefined;
const RoleDevUtils_1 = require("../../RoleDevUtils");
class RoleDevRoleViewItemDataBase {
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
  get RoleLevel() {
    return this.GetRoleLevel();
  }
  get RoleBreachLevel() {
    return this.GetRoleBreachLevel();
  }
  get RoleGoalUpgradeLevel() {
    return this.GetRoleGoalUpgradeLevel();
  }
  get RoleGoalBreakLevel() {
    return this.GetRoleGoalBreakLevel();
  }
  get DetailItems() {
    return this.GetDetailItems();
  }
  get RoleName() {
    return this.GetRoleName();
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
  get IsForecast() {
    return this.GetIsForecast();
  }
  get IsCanShowUpgradeItem() {
    return this.RoleLevel < this.RoleGoalUpgradeLevel;
  }
  get IsCanShowBreachItem() {
    return this.RoleBreachLevel < this.RoleGoalBreakLevel;
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
  get RoleLevelIsMax() {
    return this.RoleLevel >= this.GetMaxLevel();
  }
}
exports.RoleDevRoleViewItemDataBase = RoleDevRoleViewItemDataBase;
//# sourceMappingURL=RoleDevRoleViewItemDataBase.js.map