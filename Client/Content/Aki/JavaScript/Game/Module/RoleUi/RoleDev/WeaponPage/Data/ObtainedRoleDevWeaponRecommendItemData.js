"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObtainedRoleDevWeaponRecommendItemData = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
const RoleDevWeaponRecommendItemDataBase_1 = require("./RoleDevWeaponRecommendItemDataBase");
class ObtainedRoleDevWeaponRecommendItemData extends RoleDevWeaponRecommendItemDataBase_1.RoleDevWeaponRecommendItemDataBase {
  InitByRoleType(e) {
    this.InitSubRecommendItems(e);
  }
  GetWeaponConfigId() {
    return ModelManager_1.ModelManager.WeaponModel.GetWeaponIdByRoleDataId(this.RoleId) ?? 0;
  }
  GetWeaponName() {
    return ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(this.RoleId)?.GetWeaponConfig()?.WeaponName ?? "";
  }
  GetWeaponLevel() {
    return ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(this.RoleId)?.GetLevel() ?? 0;
  }
  GetWeaponGoalUpgradeLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId)?.WeaponLevel ?? 0;
  }
  GetIsCall() {
    return RoleDevUtils_1.RoleDevUtils.GetRoleGachaIds(this.WeaponConfigId).length > 0;
  }
  GetGachaId() {
    var e = RoleDevUtils_1.RoleDevUtils.GetRoleGachaIds(this.WeaponConfigId);
    if (e.length > 0) {
      return e[0];
    } else {
      return 0;
    }
  }
  GetIsWeaponHighQuality() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponInstanceByRoleId(this.RoleId);
    return !e || ModelManager_1.ModelManager.WeaponModel.IsWeaponHighQuality(e);
  }
  GetIsObtained() {
    return this.GetWeaponConfigId() > 0;
  }
  GetIsForecast() {
    return false;
  }
}
exports.ObtainedRoleDevWeaponRecommendItemData = ObtainedRoleDevWeaponRecommendItemData;
//# sourceMappingURL=ObtainedRoleDevWeaponRecommendItemData.js.map