"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObtainedRoleDevWeaponDevData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
const ObtainedRoleDevWeaponDetailItemData_1 = require("./ObtainedRoleDevWeaponDetailItemData");
const RoleDevWeaponDevItemDataBase_1 = require("./RoleDevWeaponDevItemDataBase");
class ObtainedRoleDevWeaponDevData extends RoleDevWeaponDevItemDataBase_1.RoleDevWeaponDevItemDataBase {
  constructor() {
    super(...arguments);
    this.T9d = undefined;
    this.F7d = new ObtainedRoleDevWeaponDetailItemData_1.ObtainedRoleDevWeaponDetailItemData();
  }
  InitByRoleType(e) {
    this.T9d = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(e);
    this.N7d();
  }
  N7d() {
    this.F7d.InitByWeaponInstance(this.RoleId, this.T9d);
  }
  GetWeaponLevel() {
    return this.T9d.GetLevel();
  }
  GetWeaponBreachLevel() {
    return this.T9d.GetBreachLevel();
  }
  GetWeaponGoalUpgradeLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId).WeaponLevel;
  }
  GetWeaponGoalBreakLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId).WeaponBreachLevel;
  }
  GetMaxLevel() {
    return this.T9d.GetMaxLevel();
  }
  GetDetailItems() {
    return this.F7d.DetailItems;
  }
  GetWeaponName() {
    return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(this.T9d.GetItemId()).WeaponName;
  }
  GetIsCanUpgrade() {
    return this.IsCanShowUpgradeItem && this.T9d.GetLevel() < this.T9d.GetCurrentMaxLevel();
  }
  GetIsCanBreach() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachState(this.T9d.GetIncId());
    return this.IsCanShowBreachItem && e === 2;
  }
  GetIsCall() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponIdByRoleDataId(this.RoleId) ?? 0;
    return RoleDevUtils_1.RoleDevUtils.GetRoleGachaIds(e).length > 0;
  }
  GetGachaId() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponIdByRoleDataId(this.RoleId) ?? 0;
    var e = RoleDevUtils_1.RoleDevUtils.GetRoleGachaIds(e);
    if (e.length > 0) {
      return e[0];
    } else {
      return 0;
    }
  }
  GetWeaponConfigId() {
    return ModelManager_1.ModelManager.WeaponModel.GetWeaponIdByRoleDataId(this.RoleId) ?? 0;
  }
  GetIsHighQuality() {
    return ModelManager_1.ModelManager.WeaponModel.IsWeaponHighQuality(this.T9d);
  }
  get DetailItemData() {
    return this.F7d;
  }
}
exports.ObtainedRoleDevWeaponDevData = ObtainedRoleDevWeaponDevData;
//# sourceMappingURL=ObtainedRoleDevWeaponDevData.js.map