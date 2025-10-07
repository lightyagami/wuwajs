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
    this.S3d = undefined;
    this.kNd = new ObtainedRoleDevWeaponDetailItemData_1.ObtainedRoleDevWeaponDetailItemData();
  }
  InitByRoleType(e) {
    this.S3d = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(e);
    this.ONd();
  }
  ONd() {
    this.kNd.InitByWeaponInstance(this.RoleId, this.S3d);
  }
  GetWeaponLevel() {
    return this.S3d.GetLevel();
  }
  GetWeaponBreachLevel() {
    return this.S3d.GetBreachLevel();
  }
  GetWeaponGoalUpgradeLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId).WeaponLevel;
  }
  GetWeaponGoalBreakLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId).WeaponBreachLevel;
  }
  GetMaxLevel() {
    return this.S3d.GetMaxLevel();
  }
  GetDetailItems() {
    return this.kNd.DetailItems;
  }
  GetWeaponName() {
    return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(this.S3d.GetItemId()).WeaponName;
  }
  GetIsCanUpgrade() {
    return this.IsCanShowUpgradeItem && this.S3d.GetLevel() < this.S3d.GetCurrentMaxLevel();
  }
  GetIsCanBreach() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachState(this.S3d.GetIncId());
    return this.IsCanShowBreachItem && e === 2;
  }
  GetIsCall() {
    var e;
    return !!RoleDevUtils_1.RoleDevUtils.IsHotRole(this.RoleId) && (e = ModelManager_1.ModelManager.WeaponModel.GetWeaponIdByRoleDataId(this.RoleId) ?? 0, RoleDevUtils_1.RoleDevUtils.GetRoleGachaIds(e).length > 0);
  }
  GetGachaId() {
    var e;
    return RoleDevUtils_1.RoleDevUtils.IsHotRole(this.RoleId) && (e = ModelManager_1.ModelManager.WeaponModel.GetWeaponIdByRoleDataId(this.RoleId) ?? 0, RoleDevUtils_1.RoleDevUtils.GetRoleGachaIds(e)[0]) || 0;
  }
  GetWeaponConfigId() {
    return ModelManager_1.ModelManager.WeaponModel.GetWeaponIdByRoleDataId(this.RoleId) ?? 0;
  }
  GetIsHighQuality() {
    return ModelManager_1.ModelManager.WeaponModel.IsWeaponHighQuality(this.S3d);
  }
  get DetailItemData() {
    return this.kNd;
  }
}
exports.ObtainedRoleDevWeaponDevData = ObtainedRoleDevWeaponDevData;
//# sourceMappingURL=ObtainedRoleDevWeaponDevData.js.map