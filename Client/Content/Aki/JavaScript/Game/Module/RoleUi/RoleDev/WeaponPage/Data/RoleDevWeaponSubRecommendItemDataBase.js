"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevWeaponSubRecommendItemDataBase = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
class RoleDevWeaponSubRecommendItemDataBase {
  constructor() {
    this.RoleIdInternal = 0;
    this.WeaponIdInternal = 0;
    this.HasRoleInternal = false;
  }
  InitByWeaponId(e, t, r = true) {
    this.RoleIdInternal = t;
    this.WeaponIdInternal = e;
    this.HasRoleInternal = r;
    this.InitByWeaponType(e, t, r);
  }
  get RoleId() {
    return this.RoleIdInternal;
  }
  get WeaponId() {
    return this.WeaponIdInternal;
  }
  get HasRole() {
    return this.HasRoleInternal;
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
      return RoleDevUtils_1.RoleDevUtils.GetRoleGachaIds(this.WeaponIdInternal)[0] ?? 0;
    } else {
      return 0;
    }
  }
  get IsEquipped() {
    return this.GetIsEquipped();
  }
  get NotObtained() {
    return this.GetNotObtained();
  }
}
exports.RoleDevWeaponSubRecommendItemDataBase = RoleDevWeaponSubRecommendItemDataBase;
//# sourceMappingURL=RoleDevWeaponSubRecommendItemDataBase.js.map