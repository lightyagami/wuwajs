"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotObtainedRoleDevWeaponRecommendItemData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const RoleDevUtils_1 = require("../../RoleDevUtils");
const RoleDevWeaponRecommendItemDataBase_1 = require("./RoleDevWeaponRecommendItemDataBase");
class NotObtainedRoleDevWeaponRecommendItemData extends RoleDevWeaponRecommendItemDataBase_1.RoleDevWeaponRecommendItemDataBase {
  InitByRoleType(e) {
    this.InitSubRecommendItems(e);
  }
  GetWeaponConfigId() {
    return 0;
  }
  GetWeaponName() {
    var e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProjectConfig(this.RoleId);
    if (e) {
      return ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevWeaponItemConfig(e.WeaponType)?.WeaponTypeDescribe ?? "";
    } else {
      return "";
    }
  }
  GetWeaponLevel() {
    return 1;
  }
  GetWeaponGoalUpgradeLevel() {
    return RoleDevUtils_1.RoleDevUtils.GetCultivateProject(this.RoleId)?.WeaponLevel ?? 0;
  }
  GetIsCall() {
    return false;
  }
  GetGachaId() {
    return 0;
  }
  GetIsWeaponHighQuality() {
    return true;
  }
  GetIsObtained() {
    return false;
  }
  GetIsForecast() {
    return false;
  }
}
exports.NotObtainedRoleDevWeaponRecommendItemData = NotObtainedRoleDevWeaponRecommendItemData;
//# sourceMappingURL=NotObtainedRoleDevWeaponRecommendItemData.js.map