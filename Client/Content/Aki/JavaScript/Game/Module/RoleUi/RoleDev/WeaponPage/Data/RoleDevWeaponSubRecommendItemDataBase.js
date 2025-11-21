"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponSubRecommendItemDataBase = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
class RoleDevWeaponSubRecommendItemDataBase {
  constructor() {
    this.RoleIdInternal = 0;
    this.WeaponIdInternal = 0;
  }
  InitByWeaponId(e, t) {
    this.RoleIdInternal = t;
    this.WeaponIdInternal = e;
  }
  get RoleId() {
    return this.RoleIdInternal;
  }
  get WeaponId() {
    return this.WeaponIdInternal;
  }
  get HasRole() {
    return ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.RoleId) !== undefined;
  }
  get WeaponName() {
    return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(this.WeaponIdInternal).WeaponName;
  }
  get WeaponQuality() {
    return ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(this.WeaponIdInternal).QualityId;
  }
  get WeaponJumpGroupConfig() {
    return ConfigManager_1.ConfigManager.RoleDevConfig?.GetWeaponJumpGroupConfigByWeaponId(this.WeaponIdInternal);
  }
  get IsCall() {
    var e = this.WeaponJumpGroupConfig;
    return (e?.JumpType === 1 || e?.JumpType === 2) && RoleDevUtils_1.RoleDevUtils.GetRoleGachaIds(this.WeaponIdInternal).length > 0;
  }
  get GachaId() {
    var e = this.WeaponJumpGroupConfig;
    if (e?.JumpType === 1 || e?.JumpType === 2) {
      e = RoleDevUtils_1.RoleDevUtils.GetRoleGachaIds(this.WeaponIdInternal);
      if (e.length > 0) {
        return e[0];
      }
    }
    return 0;
  }
  get IsEquipped() {
    return !!this.HasRole && ModelManager_1.ModelManager.WeaponModel?.GetWeaponIdByRoleDataId(this.RoleId) === this.WeaponId;
  }
  get IsObtained() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.WeaponId) > 0;
  }
}
exports.RoleDevWeaponSubRecommendItemDataBase = RoleDevWeaponSubRecommendItemDataBase;
//# sourceMappingURL=RoleDevWeaponSubRecommendItemDataBase.js.map